function OfflineModule(interactiveMap){
	this.areaSelectionText = "Bewege die Karte, sodass das herunterzuladende Gebiet angezeigt wird und klicke rechts auf download.";
	this.interactiveMap = interactiveMap;
	this.areas = [];
	this.vectorSource = new ol.source.Vector();
	this.layer = new ol.layer.Vector({
		source: this.vectorSource
	})
	this.interactiveMap.map.addLayer(this.layer);
	this.initializeInterface();
	this.addListeners();
	this.status = "overview";
	this.downloadedStyle  = new ol.style.Style({
	            stroke: new ol.style.Stroke({
	                color: 'green',
	                width: 2
	            }),
	            fill: new ol.style.Fill({
	                color: 'rgba(0,255,0,.2)'
	            })
	        });
	this.selectedStyle  = new ol.style.Style({
	            stroke: new ol.style.Stroke({
	                color: 'rgb(255,128,0)',
	                width: 2
	            }),
	            fill: new ol.style.Fill({
	                color: 'rgba(255,128,0,.2)'
	            })
	        });
}

OfflineModule.prototype.loadDownloadedAreas = function(){
	this.vectorSource.clear();
	
	if(typeof android != "undefined" && typeof android.getDownloadedAreas == "function" ){
		// Show the user that we are now loading the areas
		var downloadedAreas = android.getDownloadedAreas();// JSON.parse(android.getDownloadedAreas());
		downloadedAreas = JSON.parse(downloadedAreas);
		if(Object.keys(downloadedAreas).length <= 0){
			$("#offline-addon .no-areas").show();
		}else{
			$("#offline-addon .auto-updates").show();
			$("#offline-addon .no-areas").hide();
		}
		$.each(downloadedAreas, $.proxy(function(index, value){
			var bbox = value["bbox"];
			var bboxPoints = [[bbox[0],bbox[1]],
								[bbox[2],bbox[1]],
								[bbox[2],bbox[3]],
								[bbox[0],bbox[3]]];
			var feature = this.addArea(bboxPoints, true);
			var size = value["size"];
			var unit = "B";
			if(size > 1024){
				size /= 1024;
				unit = "KB";
				if(size > 1024){
					size /= 1024;
					unit = "MB";
					if(size > 1024){
						size /= 1024;
						unit = "GB";
					}
				}
			}
			// Round the size to three digits
			size = Math.ceil(size);
			var date = new Date(value["last-modified"]);
			var month = date.getMonth();
			month += 1;
			month = month < 10 ? "0" + month : month;
			var day = date.getDate();
			day = day < 10 ? "0" + day : day;
			var lastModified = day + "." + month + "." + date.getFullYear();
			var newItem = $("\
				<div class=\"area\" style=\"display: flex;align-items: center;text-align: center;font-weight: bold;font-size: 12px; border-bottom: 1px solid #dfdfdf\">\
                         <div id=\"\" style=\"padding: 0 10px;\">\
                            <div class=\"size\">" + size + " " + unit + "</div>\
                            <div class=\"last-modified\">" + lastModified + "</div>\
                        </div>\
                        <div class=\"text\" style=\"flex-grow: 1;\">" + index + "</div>\
                        <div class=\"inspect-item\" data-name=\"" + index + "\" style=\"padding: 0 20px;/* color: green; */font-size: 20px;\">\
                            <span class=\"glyphicon glyphicon-search\" style=\"display: inline-block;\"></span>\
                            <img src=\"/img/ajax-loader.gif\" alt=\"loading\" style=\"display: none;\">\
                        </div>\
                        <div class=\"rename\" data-name=\"" + index + "\" style=\"display: none; padding: 0 20px;/* color: green; */font-size: 20px;\">\
                            <span class=\"glyphicon glyphicon-pencil\" style=\"display: inline-block;\"></span>\
                            <img src=\"/img/ajax-loader.gif\" alt=\"loading\" style=\"display: none;\">\
                        </div>\
                        <div class=\"remove-download\" data-name=\"" + index + "\" style=\"display: none; padding: 0 20px;/* color: green; */font-size: 20px;\">\
                            <span class=\"glyphicon glyphicon-trash\" style=\"display: inline-block;\"></span>\
                            <img src=\"/img/ajax-loader.gif\" alt=\"loading\" style=\"display: none;\">\
                        </div>\
                    </div>");
			var caller = this;
			$(newItem).click($.proxy(function(){
				this.focusDownloadedArea(feature, $(newItem));
			}, this));
			$(newItem).find(".rename").click(function(){
				var newName = prompt("Geben Sie einen neuen Namen für dieses Gebiet ein:");
				var oldName = $(newItem).find(".text").text();
				if(newName != null && android.renameArea(oldName, newName)){
					$("#offline-addon .exit").off();
					$("#offline-addon .exit").click(function(){
						caller.interactiveMap.switchModule("search");
					});
					$("#offline-addon .add-area").show("slow");
					$(".downloaded-areas > .area").remove();
					caller.loadDownloadedAreas();
				}
			});
			$(newItem).find(".remove-download").click(function(){
				var name = $(newItem).find(".text").text();
				if(confirm("Soll das ausgewählte Gebiet wirklich gelöscht werden?") && android.removeArea(name)){
					$("#offline-addon .exit").off();
					$("#offline-addon .exit").click(function(){
						caller.interactiveMap.switchModule("search");
					});
					$("#offline-addon .add-area").show("slow");
					$(".downloaded-areas > .area").remove();
					caller.loadDownloadedAreas();
				}
			});
			$(".downloaded-areas").append(newItem);
		}, this));
	}else{
		$("#offline-addon .no-areas").show();
	}
	$("#offline-addon .loading-areas").hide();
}

OfflineModule.prototype.focusDownloadedArea = function(feature, element){
	var caller = this;
	var name = $(element).find(".remove-download").attr("data-name");
	$(element).off();
	$(".downloaded-areas > div.area").each(function(index, value){
		var tmpName = $(value).find(".remove-download").attr("data-name");
		if(tmpName != name){
			$(value).hide("slow");
			return true;
        }else{
			$(value).find(".inspect-item").hide("slow");
			$(value).find(".rename").show("slow");
			$(value).find(".remove-download").show("slow");
        }
		$("#offline-addon .exit").off();
		$("#offline-addon .exit").click(function(){
			$(".downloaded-areas > div.area").show("slow");
			$(".downloaded-areas > div.area .inspect-item").show("slow");
			$(".downloaded-areas > div.area .rename").hide("slow");
			$(".downloaded-areas > div.area .remove-download").hide("slow");
			$("#offline-addon .add-area").show("slow");
			$("#offline-addon .auto-updates").show();
			$("#offline-addon .exit").off();
			feature.setStyle(caller.downloadedStyle);
			$("#offline-addon .exit").click(function(){
				caller.interactiveMap.switchModule("search");
            });
            $(element).click($.proxy(function(){
				caller.focusDownloadedArea(feature, element);
			}, this));
        });
    });
    var item = $(element);
    $("#offline-addon .add-area, #offline-addon .auto-updates").hide("slow", function(){
    	caller.interactiveMap.map.getView().fit(feature.getGeometry(), {
    		duration: 500,
    		callback: function(){
    			feature.setStyle(caller.selectedStyle);
    		}
    	});
    });	    
}

OfflineModule.prototype.addListeners = function(){
	var caller = this;
	$("#offline-addon .exit").off();
	$("#offline-addon .exit").click(function(){
		caller.interactiveMap.switchModule("search")
	});
	$("#offline-addon .add-area").off();
	$("#offline-addon .add-area").click(function(){
		caller.startAreaSelection();
	});

	$("#offline-addon .auto-updates input").change(function(){
		var state = $(this).is(":checked");
		if(typeof android != "undefined"){
			var success = android.setProperty("auto-update", state);
			if(!success){
				$(this).prop("checked", !state);
			}
		}else{
			$(this).prop("checked", !state);
		}
	});

	$("#start-download").off();
	$("#start-download").click($.proxy(this.startDownload, this));
}

OfflineModule.prototype.addArea = function(area, downloaded){
	var style = null;
	if(downloaded){
		style = this.downloadedStyle;
	}else{
		style = this.selectedStyle;
	}

	var coordinates = [];
	$(area).each($.proxy(function(index, value){
		coordinates.push(this.interactiveMap.map.transformToMapCoordinates(value));
	}, this));
	coordinates.push(coordinates[0]);
	var feature = new ol.Feature({
		geometry: new ol.geom.Polygon([coordinates]),
		name: "Selected Area"
	});
	
	feature.setStyle(style);
	this.vectorSource.addFeature(feature);
	return feature;
}

OfflineModule.prototype.removeArea = function(feature){
	this.vectorSource.removeFeature(feature);
}

OfflineModule.prototype.startAreaSelection = function(){
	$("#offline-addon .downloaded-areas").hide("slow");
	$("#offline-addon .area-selection").show("slow");
	$("#offline-addon .exit").off();
	$("#offline-addon .exit").click($.proxy(function(){
		this.stopAreaSelection();
	}, this));

	this.interactiveMap.map.on("moveend",this.selectedAreaChanged, this);
    this.selectedAreaChanged();
	this.status = "area-selection";
}

OfflineModule.prototype.selectedAreaChanged = function() {
	this.selectedArea = null;
	var bbox = this.interactiveMap.map.getView().calculateExtent();
	var min = this.interactiveMap.map.transformToWorldCoordinates([bbox[0],bbox[1]]);
	var max = this.interactiveMap.map.transformToWorldCoordinates([bbox[2],bbox[3]]);
	if(this.loadingFileList != null)
		this.loadingFileList.abort();
    http://localhost:8000/img/ajax-loader.gif
	$("#download-information > .last-modified").html("<img src=\"/img/ajax-loader.gif\" alt=\"loading\"></img>");
    $("#download-information > .size").html("");
	$("#start-download > span").hide();
	$("#start-download > img").show();
	this.loadingFileList = $.getJSON("/download/list-files/" + min[0] + "/" + min[1] + "/" + max[0] + "/" + max[1], $.proxy(function(data){
		var date = new Date(data["last-modified"]);
		var month = date.getMonth();
		month += 1;
		month = month < 10 ? "0" + month : month;
		var day = date.getDate();
		day = day < 10 ? "0" + day : day;
		$("#download-information > .last-modified").html(day + "." + month + "." + date.getFullYear());
		// We will decide which Unit of datasize to show
		var size = data["size"];
		var unit = "B";
		if(size > 1024){
			size /= 1024;
			unit = "KB";
			if(size > 1024){
				size /= 1024;
				unit = "MB";
				if(size > 1024){
					size /= 1024;
					unit = "GB";
				}
			}
		}
		// Round the size to three digits
		size = Math.ceil(size);
		$("#download-information > .size").html(size + " " + unit);
        $("#start-download > span").show();
        $("#start-download > img").hide();
        this.selectedArea = data;
	}, this));
}

OfflineModule.prototype.stopAreaSelection = function(){
	$("#offline-addon .downloaded-areas").show("slow");
	$("#offline-addon .area-selection").hide("slow");
	
	this.addListeners();
    this.interactiveMap.map.un("moveend", this.selectedAreaChanged, this);
	this.status = "overview";
}

OfflineModule.prototype.addToDownloadedInterface = function(area){
	var newElement = $('\
		<div class="area downloaded" style="display: none;" id="area-' + area.id + '">\
    		<div class="texts">\
        		<div class="name">' + area.name + '</div>\
        		<div class="info">\
            		<div class="size">' + area.filesize + '</div>\
    				<div class="seperator">·</div>\
            		<div class="date">' + area.date + '</div>\
        		</div>\
    		</div>\
    		<div class="remove"><span class="glyphicon glyphicon-trash"></span></div>\
		</div>');
	var caller = this;
	$(newElement).find(".remove").click($.proxy(function(){
			caller.removeArea(this);
	}, area));
	// Hide the placeholder
	$("#offline-addon .downloaded-areas > div.placeholder:not(.area-selection-info)").hide('slow');
	// Add this new Element to the Front of the List
	$("#offline-addon .downloaded-areas").prepend(newElement);
}

OfflineModule.prototype.addToAvailableInterface = function(area){
	var newElement = $('\
		<div class="area available" style="display: none;" id="area-' + area.id + '">\
    		<div class="texts">\
        		<div class="name">' + area.name + '</div>\
        		<div class="info">\
            		<div class="size">' + area.filesize + '</div>\
    				<div class="seperator">·</div>\
            		<div class="date">' + area.date + '</div>\
        		</div>\
    		</div>\
    		<div class="remove"><span class="glyphicon glyphicon-download-alt"></span></div>\
		</div>');
	var caller = this;
	$(newElement).find(".remove").click($.proxy(function(){
		caller.startDownload(this);
	}, area));
	// Add this new Element to the Front of the List
	$("#offline-addon .available-areas").prepend(newElement);
}

OfflineModule.prototype.startDownload = function(){
	if(this.selectedArea == null) return;

	// If the user is not connected to a wlan we will inform him of that fact
	if(typeof android != "undefined" && typeof android.isWireless == "function" && !android.isWireless()){
		var confirmed = confirm("Die Download Größe beträgt " + $("#download-information > .size").html() + ". Ohne WLan fortfahren?");
		if(!confirmed)
			return;
	}


	$("#start-download > span").hide("fast");
	$("#start-download > img").show("fast");
	$(".exit").hide("fast");
	$(".area-selection > div.text").html("Downloading...");
	this.interactiveMap.map.un("moveend", this.selectedAreaChanged, this);
	$(".download-progress").show("slow", $.proxy(function(){
		var data = this.selectedArea;
		var bboxPoints = [[data["bbox"][0],data["bbox"][1]],
								[data["bbox"][2],data["bbox"][1]],
								[data["bbox"][2],data["bbox"][3]],
								[data["bbox"][0],data["bbox"][3]]];
		this.selectedAreaFeature = this.addArea(bboxPoints, false);
		// Show the downloading area
		this.interactiveMap.map.getView().fit(this.selectedAreaFeature.getGeometry(), {
			padding: [$("#offline-addon").outerHeight(),0,0,0],
			duration: 900,
			callback: $.proxy(function(){
				// Now send the download command to the android app
				if(typeof android != "undefined"){
					var origBbox = data["original-bbox"];
					var downloadUrl = "/download/download-files/" + origBbox[0] + "/" + origBbox[1] + "/" + origBbox[2] + "/" + origBbox[3];
					var started = android.download(downloadUrl, JSON.stringify(data));
					if(started){
						$("#offline-addon .download-progress .abort").off();
						$("#offline-addon .download-progress .abort").click($.proxy(function(){
							$("#offline-addon .download-progress .abort").off();
							this.stopDownload();
						}, this));
						this.updateDownloadStatus();
					}
				}else{
					this.stopDownload();
				}
			}, this)
		});
	}, this));
}

OfflineModule.prototype.stopDownload = function(abort){
	if(typeof abort == "undefined")
		abort = true;
	if(typeof android != "undefined" && abort)
		android.stopDownload();
	$("#start-download > span").show("fast");
	$("#start-download > img").hide("fast");
	$(".exit").show("fast");
	$(".area-selection > div.text").html(this.areaSelectionText);
	this.interactiveMap.map.on("moveend", this.selectedAreaChanged, this);
	$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
	$("#offline-addon .progress-bar").css("width", "0%");
	$("#offline-addon .progress-bar").html("0%");
	$(".download-progress").hide("slow");
	this.selectedAreaFeature = this.removeArea(this.selectedAreaFeature);
	$(".exit").click();
}

OfflineModule.prototype.updateDownloadStatus = function(){
	var error;
	if((error = android.getError()) != ""){
		$("#offline-addon .download-progress").before($('\
			<div class="download-failed alert alert-danger">' + error + '</div>'));
		window.setTimeout($.proxy(function(){
			$("#offline-addon .download-failed").remove();
			this.stopDownload();
		}, this), 5000);
		this.downloading = null;
		return;
	}

	var total = android.getDownloadSize();
	var downloaded = android.getDownloadStatus();
	var caller = this;
	if(total != 0){
		var percent = Math.round((downloaded / total) * 100);
		$("#offline-addon .progress-bar").attr("aria-valuemax", total);
		$("#offline-addon .progress-bar").attr("aria-valuenow", downloaded);
		$("#offline-addon .progress-bar").css("width", percent + "%");
		$("#offline-addon .progress-bar").html(android.getDownloadStatusMessage());
		if(android.getStage() != android.getMaxStage() || downloaded != total || !android.isDownloadFinished()){
			window.setTimeout($.proxy(this.updateDownloadStatus, this), 100);
		}else{
			this.downloading = null;
			this.stopDownload(false);
			$(".downloaded-areas > .area").remove();
			this.loadDownloadedAreas();
			return;
		}
	}else{
		window.setTimeout($.proxy(this.updateDownloadStatus, this), 100);
	}
}

OfflineModule.prototype.initializeInterface = function(){
	// Hide everything from Map that is not needed:
	$(".ol-zoom, .ol-zoomslider").hide("slow");
	$("#offline-addon .no-areas").hide();
	$("#offline-addon .loading-areas").show();
	if(typeof android != "undefined" && typeof android.getProperty == "function"){
		var autoUpdates = android.getProperty("auto-update").toLowerCase() == "true" ? true : false;
		$("#offline-addon .auto-updates input").prop("checked", autoUpdates);
	}
	this.interactiveMap.reversePositionManager.setActive(false);
	$("#offline-addon").show("slow", $.proxy(function(){
		this.loadDownloadedAreas();
	}, this));
	this.vectorSource = new ol.source.Vector();
	this.layer = new ol.layer.Vector({
		source: this.vectorSource
	});
	this.interactiveMap.map.addLayer(this.layer);
}

OfflineModule.prototype.exit = function(){
	// Show everything again that got hidden on intialization
	$(".ol-zoom, .ol-zoomslider").show();
	$("#offline-addon .placeholder.area-selection-info").hide();
	this.interactiveMap.reversePositionManager.setActive(true);
	$("#offline-addon").hide("slow");
	this.interactiveMap.map.removeLayer(this.layer);
	this.layer = null;
	this.vectorSource = null;
	
	$("#offline-addon .exit").off();
	$("#start-download").off();
	$("#offline-addon .downloaded-areas > div:not(.placeholder)").remove();
	$(".downloaded-areas .placeholder").show();
}

OfflineModule.prototype.enableGps = function(){

}

OfflineModule.prototype.disableGps = function(){

}