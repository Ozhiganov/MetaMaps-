function OfflineModule(interactiveMap){
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
	// Recenter the view to get an overview of germany
	this.interactiveMap.map.getView().animate({center: [1139922.2705121872, 6865247.913390023], zoom: 6, duration: 500}, $.proxy(function(){
		// If the user is not in Wireless Lan we won't open this Module
		// because we consume too much data here
		if(typeof android != "undefined" && !android.isWireless()){
			console.log("Kein WLan");
			alert("Dieses Feature läd große Datenmengen herunter. Bitte stellen Sie sicher, dass sie sich in einer nicht getakteten Netzwerkverbindung befinden um fortzufahren.");
			interactiveMap.switchModule("search");
			return;
		}else{
			console.log("WLan");
		}
		// We donwload all available Shapefiles from the server
		// Those show which areas can be downloaded
		this.downloadPolygons();
	}, this));
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
}

OfflineModule.prototype.downloadPolygons = function(){
	var mapFileUrl = "https://maps.metager.de/map_files/";
	var polygons = [];
	var caller = this;
	$.get(mapFileUrl, function(data){
		var regex = /<a.*?>([\w-]+?\.poly)<\/a>/gi;
		var match = regex.exec(data);
		var areas = [];
		var id = 0;
		while(match != null){
			var area = {
				id: id,
				polygonfile: mapFileUrl + match[1],
				mapFile: match[1].substring(0, match[1].indexOf(".poly")) + ".map",
				mapFileUrl: mapFileUrl + match[1].substring(0, match[1].indexOf(".poly")) + ".map"
			}
			$.get(area.polygonfile, $.proxy(function(data){
				var coordinates = [];
				var area = this;
				data.split("\n").forEach(function(line, index){
					if(index == 0){
						var infos = line.split(";");
						area.name = infos[0];
						area.filesize = infos[1];
						area.date = infos[2];
						return 1;
					}else if(line == "none" || line == "END")
						return 1;
					else if(line.match(/^\d+$/g)){
						coordinates.push([]);
					}else{
						var regex = /^\s*(\S+?)\s+(\S+)$/;
						var match = regex.exec(line);
						if(match){
							var point = [parseFloat(parseFloat(match[1]).toFixed(20)), parseFloat(parseFloat(match[2]).toFixed(20))];
							point = caller.interactiveMap.map.transformToMapCoordinates(point);
							coordinates[coordinates.length-1].push(point);
						}
					}

				});
				this.polygon = new ol.geom.Polygon(coordinates);
				caller.areas.push(this);
				caller.updateAreas();
			}, area));
			match = regex.exec(data);
			id++;
		}
	});
}

OfflineModule.prototype.updateAreas = function(){
	// This Function will submit changes in the areas array to the User Interface
	// Since the areas are getting loaded asynchronious we need to be aware of changes at any time
	// First remove everything from the User Interface 
	// 1. Remove all Area Polygons on the map:
	this.interactiveMap.map.removeLayer(this.layer);
	this.vectorSource = new ol.source.Vector();
	this.layer = new ol.layer.Vector({
		source: this.vectorSource
	});
	
	// 2. Remove all Area Elements in the List
	$("#offline-addon .downloaded-areas > div:not(.placeholder)").remove();
	$("#offline-addon .available-areas > div").remove();

	// Now add all areas in the array
	var caller = this;
	$.each(this.areas, function(index, area){
		area.id = index;
		caller.addArea(area);
	});
	switch(this.status){
		case "overview":
			$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
				$(this).show("slow");
			});
			$("#offline-addon .add-area").show('slow');
			break;
		case "area-selection":
			$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
				$(this).hide("slow");
			});
		case "detail":
			$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
				$(this).hide("slow");
			});
	}
}

OfflineModule.prototype.addArea = function(area){
	if( typeof area != "undefined" && typeof area.polygon != "undefined" ){
		var feature = new ol.Feature(area.polygon);
	    if(typeof android != "undefined" && android.hasArea(area.mapFile)){
	    	
		   area.style  = new ol.style.Style({
	            stroke: new ol.style.Stroke({
	                color: 'green',
	                width: 2
	            }),
	            fill: new ol.style.Fill({
	                color: 'rgba(0,255,0,.2)'
	            })
	        });
		   area.downloaded = true;
		   area.filesize = android.getMapFileSize(area.mapFile);
		   area.date = android.getMapFileDate(area.mapFile);
		   this.addToDownloadedInterface(area);
		}else{
			area.style  = new ol.style.Style({
	            stroke: new ol.style.Stroke({
	                color: 'red',
	                width: 2
	            }),
	            fill: new ol.style.Fill({
	                color: 'rgba(255,0,0,.2)'
	            })
	        });
	        // If this area is not downloaded yet, we'll add the Listener to download it now
	        area.downloaded = false;
	        this.addToAvailableInterface(area);
		}
	    feature.setProperties(area);
		feature.setStyle(area.style);
        
		this.vectorSource.addFeature(feature);
		this.select_interaction = new ol.interaction.Select();

		this.select_interaction.getFeatures().on("add", function (e) { 
		     var feature = e.element; //the feature selected
		     if(typeof feature.getProperties().mapFileUrl != "undefined"){
		     	this.areaSelected(feature);
		     //	android.downloadArea(feature.getProperties().mapFileUrl);
		     }
		}, this);
		this.select_interaction.getFeatures().on("remove", function (e) { 
		     var feature = e.element; //the feature selected
		     if(typeof feature.getProperties().mapFileUrl != "undefined"){
		     	this.areaDeSelected(feature);
		     //	android.downloadArea(feature.getProperties().mapFileUrl);
		     }
		}, this);

		this.interactiveMap.map.addInteraction(this.select_interaction);
	}
	
}

OfflineModule.prototype.startAreaSelection = function(){
	$("#offline-addon .add-area").hide("slow");
	$("#offline-addon").animate({margin: 0, width: '100%'}, 'slow');
	$("#offline-addon .downlaoded-areas > .area").hide("slow");
	$("#offline-addon .placeholder:not(.area-selection-info)").hide("slow");
	$("#offline-addon .area-selection-info").show("slow");
	$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
		$(this).hide("slow");
	});
	$("#offline-addon .exit").off();
	$("#offline-addon .exit").click($.proxy(function(){
		this.stopAreaSelection();
	}, this));
	this.interactiveMap.map.addLayer(this.layer);
	this.status = "area-selection";
}

OfflineModule.prototype.stopAreaSelection = function(){
	$("#offline-addon .add-area").show("slow");
	$("#offline-addon").animate({'margin-left': '15px', 'margin-top': '15px', 'margin-right':'15px'}, 'slow', function(){
		$(this).css("width", "calc(100% - 30px)");
	});
	$("#offline-addon .downlaoded-areas > .area").show("slow");
	$("#offline-addon .area-selection-info").hide("slow");
	$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
		$(this).show("slow");
	});
	if(this.countDownloadedAreas() == 0)
		$("#offline-addon .placeholder:not(.area-selection-info)").show("slow");
	this.addListeners();
	this.interactiveMap.map.removeLayer(this.layer);
	this.status = "overview";
}

OfflineModule.prototype.areaSelected = function(feature){
	$("#offline-addon .placeholder.area-selection-info").hide('slow');
	
	if(!feature.getProperties().downloaded){
		var areaStyle  = new ol.style.Style({
		    stroke: new ol.style.Stroke({
		    color: 'rgb(255,165,0)',
		         width: 2
		    }),
		    fill: new ol.style.Fill({
		        color: 'rgba(255,165,0,.2)'
		    })
		});
		feature.setStyle(areaStyle);
	}
	var caller = this;
	$("#offline-addon .area").each(function(index, value){
		if($(this).attr("id") != "area-" + feature.getProperties().id)
			$(this).hide('slow');
		else{
			
			$(this).show('slow', function(){
				$(this).css("display", 'flex');
				caller.interactiveMap.map.getView().fit(feature.getProperties().polygon, {
					duration: 500
				});
			});
		}
	});
	$("#offline-addon .exit").off();
	var caller = this;
	$("#offline-addon .exit").click(function(){
		caller.select_interaction.getFeatures().clear();
	});
	this.status = "detail";
}

OfflineModule.prototype.areaDeSelected = function(feature){
	$("#offline-addon .placeholder.area-selection-info").show('slow');
	feature.setStyle(feature.getProperties().style);
	$("#offline-addon .area").each(function(index, value){
		$(this).hide('slow');
	});
	$("#offline-addon .exit").off();
	var caller = this;
	$("#offline-addon .exit").click(function(){
		caller.stopAreaSelection();
	});
	this.status = "area-selection";
}

OfflineModule.prototype.countDownloadedAreas = function(){
	var result = 0;
	$.each(this.areas, function(index, value){
		if(value.downloaded)
			result++;
	});
	return result;
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

OfflineModule.prototype.removeArea = function(area){
	if(window.confirm("Soll das Gebiet " + area.name + " wirklich von Ihrem Gerät gelöscht werden?")){
		android.removeArea(area.mapFile);
		this.select_interaction.getFeatures().clear();
		this.updateAreas();
		this.interactiveMap.map.addLayer(this.layer);
	}
}

OfflineModule.prototype.startDownload = function(area){
	if(this.downloading != null) return;
	var started = android.downloadArea(area.mapFileUrl);
	if(started){
		console.log("Download started");
		// Area download is started
		// Let's add a progress bar and wait for the download to finish
		$("#offline-addon .download-progress").show('slow', function(){
			$(this).css("display", "flex");
		});
		var caller = this;
		$("#offline-addon .download-progress .abort").off();
		$("#offline-addon .download-progress .abort").click(function(){
			$("#offline-addon .download-progress .abort").off();
			caller.stopDownload();
		});

		// Block the Back Button and repalace it with a Loading Gif until the downlaod is either finished or aborted
		$("#offline-addon .exit").before(
			$('<img id="downloading" src="/img/ajax-loader.gif" height="16px" width="16px" alt="downloading..." style="align-self: center;margin-left: 10px;" />')
		);
		$("#offline-addon .exit").hide('slow');

		this.downloading = area.id;
		this.updateDownloadStatus();
	}
}

OfflineModule.prototype.stopDownload = function(){
	if(window.confirm("Soll der Download wirklich abgebrochen werden?")){
		android.stopDownload();
		$("#offline-addon .download-progress").hide('slow');
		$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
		$("#offline-addon .progress-bar").css("width", "0%");
		$("#offline-addon .progress-bar").html("0%");
		$("#offline-addon .download-progress .abort").off();
		$("#offline-addon #downloading").hide('slow', function(){
			$(this).remove();
		});
		$("#offline-addon .exit").show('slow');
		this.downloading = null;
	}
}

OfflineModule.prototype.updateDownloadStatus = function(){
	var error;
	if((error = android.getError()) != ""){
		$("#offline-addon .download-progress").hide('slow');
		$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
		$("#offline-addon .progress-bar").css("width", "0%");
		$("#offline-addon .progress-bar").html("0%");
		$("#offline-addon .download-progress").before($('\
			<div class="download-failed alert alert-danger">' + error + '</div>'));
		window.setTimeout(function(){
			$("#offline-addon .download-failed").remove();
		}, 5000);
		$("#offline-addon #downloading").hide('slow', function(){
			$(this).remove();
		});
		$("#offline-addon .exit").show('slow');
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
		if(android.getStage() != android.getMaxStage() || downloaded != total){
			window.setTimeout($.proxy(this.updateDownloadStatus, this), 100);
		}else{
			this.areas[this.downloading].downloaded = true;
			$("#offline-addon .download-progress").hide('slow');
			$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
			$("#offline-addon .progress-bar").css("width", "0%");
			$("#offline-addon .progress-bar").html("0%");
			$("#offline-addon #downloading").hide('slow', function(){
				$(this).remove();
			});
			$("#offline-addon .exit").show('slow');
			this.downloading = null;
			this.select_interaction.getFeatures().clear();
			this.updateAreas();
			this.interactiveMap.map.addLayer(this.layer);
			return;
		}
	}else{
		window.setTimeout($.proxy(this.updateDownloadStatus, this), 100);
	}
}

OfflineModule.prototype.downloadFinished = function(area){
	$("#offline-addon .download-progress").hide('slow');
	$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
	$("#offline-addon .progress-bar").css("width", "0%");
	$("#offline-addon .progress-bar").html("0%");
	$("#offline-addon .download-progress .abort").off();
	area.downloaded = true;
	this.select_interaction.getFeatures().clear();
	this.updateAreas();
}

OfflineModule.prototype.initializeInterface = function(){
	// Hide everything from Map that is not needed:
	$(".ol-zoom, .ol-zoomslider").hide("slow");
	this.interactiveMap.reversePositionManager.setActive(false);
	$("#offline-addon").show("slow");
}

OfflineModule.prototype.exit = function(){
	// Show everything again that got hidden on intialization
	$(".ol-zoom, .ol-zoomslider").show("slow");
	$("#offline-addon .add-area").hide('slow');
	$("#offline-addon .placeholder:not(.area-selection-info)").show("slow");
	$("#offline-addon .placeholder.area-selection-info").hide("slow");
	this.interactiveMap.reversePositionManager.setActive(true);
	$("#offline-addon").hide("slow");
	this.interactiveMap.map.removeLayer(this.layer);
	$("#offline-addon .exit").off();
	$("#offline-addon .available-areas").html("");
	$("#offline-addon .downloaded-areas > div:not(.placeholder)").remove();
}

OfflineModule.prototype.enableGps = function(){

}

OfflineModule.prototype.disableGps = function(){

}