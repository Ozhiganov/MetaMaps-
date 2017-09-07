
function Results(map, data, query, moveMap, resultsHistory){
	this.interactiveMap = map;
	this.results = data;
	this.query = query;
	this.resultsHistory = resultsHistory;
	if(typeof moveMap == "boolean"){
		this.moveMap = moveMap;
	}else{
		this.moveMap = true;
	}
	this.markerOverlays = [];
	this.updateInterface();
}

Results.prototype.deleteSearch = function(animationSpeed){
	// Activate Reverse Geocoding
	this.interactiveMap.reversePositionManager.setActive(true);
	if(animationSpeed === null){
		animationSpeed = "slow";
	}
	$("#search-addon .results .results-container").hide(animationSpeed, function(){
		$("#search-addon .results .results-container").html("");
	});
	$("#search-addon #delete-search").remove();
	$("#search-addon #search input[name=q]").val("");
	
	if($(window).outerWidth() <= 767){
			$("#search-addon .results .mobiles-window").remove();
			$("#search-addon #show-list").remove();
			// The Search box got focussed on a mobile Let's get more Space
			$("#search-addon").animate({"margin": "15px 15px 0 15px"}, 'slow');
			$("#search-addon .results").css("border-radius", "0 0 15px 15px");
			$("#search-addon .results").css("max-height", "91vh");
			$("#search-addon .results").css("background-color", "white");
			// Show Zoombar on mobiles in results view
			$(".ol-zoom, .ol-zoomslider").show();
	}
	this.removeResultMarker();
}

Results.prototype.removeResultMarker = function(){
	var map = this.interactiveMap.map;
	$.each(this.markerOverlays, function(index, value){
		map.removeOverlay(value);
	});
	this.markerOverlays = [];
}

/**
 * Updates the User Interface if there are any Search results saved in this Module
 * It prints all Markers and geometries for the search results and updates the results list
**/
Results.prototype.updateInterface = function(){
	if(this.results.length > 0){
		this.deleteSearch(0);
		$("#search input[name=q]").val(this.query);
		// Disable Reverse Geocoding on click
		this.interactiveMap.reversePositionManager.setActive(false);
		// First add those Results to the Results List
		$("#search-addon .results .results-container").html("");
		$("#search-addon .results .mobiles-window").remove();
		var caller = this;
		$.each(this.results, function(index, value){
			var res = (new NominatimParser(value)).getHTMLResult().html();
			var resHtml = $('\
							<div class="container-fluid suggestion" data-resultNumber="'+index+'">\
	                            <div class="flex-container">\
	                                <div class="item history">\
	                                    <span class="marker" style="filter: hue-rotate(' + value["huerotate"] + 'deg); font-size: 16px;">' + (index+1) + '</span>\
	                                </div>\
	                                <div class="item result">\
	                                    ' + res + '\
	                                </div>\
	                            </div>\
	                        </div>\
							');
			$("#search-addon .results .results-container").append(resHtml);
			if(caller.results.length > 1){
				$(resHtml).click({caller: caller}, function(event){
					event.data.caller.focusResult($(this).attr("data-resultNumber"));
				});
			}
		});
		$("#search-addon .results .results-container .start-route-service").each($.proxy(function(index, value){
			$(value).click($.proxy(function(event){
				this.resultsHistory.addItem(this.results[index]);
			}, this));
		}, this));
		$("#search-addon .results .results-container .start-route-service").click({caller: caller}, function(){
			// We will add this result to the Local History 
			caller.interactiveMap.switchModule("route-finding", {waypoints: [[parseFloat($(this).attr("data-lon")), parseFloat($(this).attr("data-lat"))]]});
		});
		$("#search-addon .results .results-container").show('slow', function(){
			$("#search-addon .results .results-container").attr("data-status", "out");
			if($(window).outerWidth() <= 767){
				// On Mobiles we need a window to look through to the map
				$("#search-addon .results .results-container").before("<div class=\"mobiles-window\"></div>");
				$("#search-addon .results .mobiles-window").click({caller: caller}, function(event){
					event.data.caller.mobilesWindowClick();
				});
				// The Search box got focussed on a mobile Let's get more Space
				$("#search-addon").animate({"margin": 0}, 'slow', $.proxy(function(){
					$("#search-addon .results").css("border-radius", 0);
					$("#search-addon .results").css("max-height", "95vh");
					$("#search-addon .results").css("background-color", "transparent");

					// Hide Zoombar on mobiles in results view
					$(".ol-zoom, .ol-zoomslider").hide();

					var height = $(window).outerHeight() - $(".results").outerHeight() - $("#search").outerHeight();
					height = Math.max(height, 175);
					$(".results .mobiles-window").css("height", height + "px");
					this.updateResultMarker();
					this.updateMapExtent();
				}, caller));
			}else{
				caller.updateResultMarker();
					caller.updateMapExtent();
			}
			// Let's make a new input-group-addon to cancel the search if it takes too long
			var cancelSearch = $('\
			    <div class="input-group-addon" id="delete-search" title="Suche abbrechen">\
			        X\
			    </div> \
			');
			$("#search input[name=q]").after(cancelSearch);
			$(cancelSearch).click({caller: caller}, function(event){
				event.data.caller.deleteSearch();
				event.data.caller.interactiveMap.module.results = undefined;
				event.data.caller.interactiveMap.module.results = undefined;
				event.data.caller.interactiveMap.module.updateURL();
			});
		});
	}
}

Results.prototype.focusResult = function(index){
	var results = this.results;
	if(typeof results[index] !== "undefined"){
		var newResults = results[index];
		this.results = [newResults];
		this.updateInterface();
	}
}

Results.prototype.updateResultMarker = function(){
	var caller = this;
	if(this.markerOverlays.length > 0){
		$.each(this.markerOverlays, function(index, overlay){
			caller.interactiveMap.map.removeOverlay(overlay);
		});
		this.markerOverlays = [];
	}
	
	$.each(this.results, function(index, value){
		var el = $('<span id="index" class="marker" data-resultNumber="'+index+'" style="filter: hue-rotate(' + value["huerotate"] + 'deg)">' + (index+1) + '</span>');
		if(caller.results.length > 1){
			$(el).click({caller: caller}, function(event){
				event.data.caller.focusResult($(this).attr("data-resultNumber"));
			});
		}
		var overlay = new ol.Overlay({
			position: caller.interactiveMap.map.transformToMapCoordinates([parseFloat(value.lon), parseFloat(value.lat)]),
			element: el.get(0),
			offset: [-12, -45],
			stopEvent: false,
		});
		caller.interactiveMap.map.addOverlay(overlay);
		caller.markerOverlays.push(overlay);
	});
}



Results.prototype.mobilesWindowClick = function(){
	// Hide the Results Panel
	$(".results .results-container").hide("fast");
	var caller = this;
	$(".results .mobiles-window").hide("fast", function(){
		// Add the Possibility to come back to the list
		var showList = $('\
			<div id="show-list" class="container">\
				Liste anzeigen\
			</div>');
		$("#search-addon .results").append(showList);
		$(showList).click({caller: caller}, function(event){
			$("#show-list").hide('fast', function(){
				$("#show-list").remove();
			});
			$(".results .results-container").show("fast");
			$(".results .mobiles-window").show("fast", function(){
				event.data.caller.updateMapExtent();
			});
		});
		var padding = [
			$("#search-addon").outerHeight(true) + 25,
			25,
			25,
			25
		];
		caller.updateMapExtent(padding);
	});
}

Results.prototype.updateMapExtent = function(initPadding){
	if(this.results.length <= 0 || !this.moveMap){
		return;
	}
	var caller = this;
	var extent = [null, null, null, null];
	var valid = undefined;
	// 1. We try to only zoom into Matching results
	// 2. If no mathing result was found we zoom into all results
	$.each(this.results, function(index, res){
		// We just focus on those results that have all the terms in the search query in it
		var valid = true;
		var words = caller.query.split(/\W+/);
		$.each(words, function(index, value){
			if(res.display_name.toLowerCase().indexOf(value.toLowerCase()) === -1){
				valid = false;
			}
		});
		if(!valid) return true;
		var lon = parseFloat(res.lon);
		var lat = parseFloat(res.lat);
		if(extent[0] === null || extent[0] > lon){
			extent[0] = lon;
		}
		if(extent[1] === null || extent[1] > lat){
			extent[1] = lat;
		}
		if(extent[2] === null || extent[2] < lon){
			extent[2] = lon;
		}
		if(extent[3] === null || extent[3] < lat){
			extent[3] = lat;
		}
	});
	if(extent[0] == null){
		// There is no Result which matches every search term
		// So we will Zoom into every result
		$.each(this.results, function(index, res){
			var lon = parseFloat(res.lon);
			var lat = parseFloat(res.lat);
			if(extent[0] === null || extent[0] > lon){
				extent[0] = lon;
			}
			if(extent[1] === null || extent[1] > lat){
				extent[1] = lat;
			}
			if(extent[2] === null || extent[2] < lon){
				extent[2] = lon;
			}
			if(extent[3] === null || extent[3] < lat){
				extent[3] = lat;
			}
		});
	}

	extent = caller.interactiveMap.map.transformToMapCoordinates([extent[0], extent[1]]).concat(caller.interactiveMap.map.transformToMapCoordinates([extent[2], extent[3]]));

	// Let's find out in what space of the map we need to fit this in:
	// If Screen is not mobile the search results are 
	var padding = [25,25,25,25];
	if(initPadding !== undefined){
		padding = initPadding;
	}else if($(window).outerWidth() <= 767){
		// Padding Top:
		padding[0] = $("#search").outerHeight(true) + 15;
		// Padding Bottom:
		padding[2] = $(window).outerHeight(true) - $("#search").outerHeight(true) - $(".results .mobiles-window").outerHeight(true);
	}else{
		var paddingRight = 0;
		paddingRight += $("#search-addon").outerWidth(true);
		padding[1] = paddingRight;
	}
	caller.interactiveMap.map.getView().fit(extent, {duration: 600, padding: padding});
	
}