function RouteFinderSearchResults(map, data, query){
	this.interactiveMap = map;
	this.results = data;
	this.query = query;
	this.markerOverlays = [];
	this.updateInterface();
}

RouteFinderSearchResults.prototype.updateInterface = function(){
	if(this.results.length > 0){

		this.deleteSearch();
		var caller = this;
		$.each(this.results, function(index, value){
			var res = (new NominatimParser(value)).getRouteFinderHtml().html();
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
			$("#route-finder-addon .results .results-container").append(resHtml);
			$(resHtml).click({caller: caller}, function(event){
				event.data.caller.interactiveMap.module.exitSearch(new NominatimParser(value));
			});
		});
		var caller = this;
		$("#route-finder-addon .results .results-container").show('slow', function(){
			if($(window).outerWidth() <= 767){
				// On Mobiles we need a window to look through to the map
				$("#route-finder-addon .results .results-container").before("<div class=\"mobiles-window\"></div>");
				$("#route-finder-addon .results .mobiles-window").click({caller: caller}, function(event){
					event.data.caller.mobilesWindowClick();
				});

				var height = $(window).outerHeight() - $("#route-finder-addon .results .results-container").outerHeight() - $("#route-finder-addon > form").outerHeight();
				height = Math.max(height, 175);
				$("#route-finder-addon .results .mobiles-window").css("height", height + "px");
			}
			caller.updateResultMarker();
			caller.updateMapExtent();
		});
	}
}

RouteFinderSearchResults.prototype.mobilesWindowClick = function(){
	// Optimize the Interface for Full Screen View
	$("#route-finder-addon .results .mobiles-window").hide("slow");
	var caller = this;
	$("#route-finder-addon .results .results-container").hide("slow", function(){
		// Add the Possibility to come back to the list
		var showList = $('\
			<div id="show-list" class="container">\
				Liste anzeigen\
			</div>');
		$("#route-finder-addon .results").append(showList);
		$(showList).click({caller: caller}, function(event){
			$("#show-list").hide('fast', function(){
				$("#show-list").remove();
			});
			$("#route-finder-addon .results .results-container").show("slow");
			$("#route-finder-addon .results .mobiles-window").show("slow", function(){
				event.data.caller.updateMapExtent();
			});
		});

		var paddingTop = $("#route-finder-addon form").outerHeight() + $("#route-finder-addon #show-list").outerHeight() + 50;
		caller.updateMapExtent([paddingTop, 50, 50, 50]);
	});

}

RouteFinderSearchResults.prototype.deleteSearch = function(){
	$("#route-finder-addon .results .results-container").html("");
	$("#route-finder-addon .results .mobiles-window").remove();
	$("#show-list").remove();
	var caller = this;
	$.each(this.markerOverlays, function(index, value){
		caller.interactiveMap.map.removeOverlay(value);
	});
	this.markerOverlays = [];

}

RouteFinderSearchResults.prototype.updateResultMarker = function(){
	var caller = this;
	if(this.markerOverlays.length > 0){
		$.each(this.markerOverlays, function(index, overlay){
			caller.interactiveMap.map.removeOverlay(overlay);
		});
		this.markerOverlays = [];
	}

	// Rem
	
	$.each(this.results, function(index, value){
		var el = $('<span id="index" class="marker" data-resultNumber="'+index+'" style="filter: hue-rotate(' + value["huerotate"] + 'deg)">' + (index+1) + '</span>');
		$(el).click({caller: caller}, function(event){
			event.data.caller.interactiveMap.module.exitSearch(new NominatimParser(value));
		});
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

RouteFinderSearchResults.prototype.updateMapExtent = function(initPadding){
	if(this.results.length <= 0){
		return;
	}
	var caller = this;
	var extent = [null, null, null, null];
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

	extent = caller.interactiveMap.map.transformToMapCoordinates([extent[0], extent[1]]).concat(caller.interactiveMap.map.transformToMapCoordinates([extent[2], extent[3]]));

	// Let's find out in what space of the map we need to fit this in:
	// If Screen is not mobile the search results are 
	var padding = [66,25,25,25];
	if(initPadding !== undefined){
		padding = initPadding;
	}else if($(window).outerWidth() <= 767){
		// Padding Top:
		padding[0] += $("#route-finder-addon > form").outerHeight(true);
		// Padding Bottom:
		padding[2] += $(window).outerHeight(true) - $("#route-finder-addon > form").outerHeight(true) - $("#route-finder-addon .results .mobiles-window").outerHeight(true);
	}else{
		var paddingRight = 0;
		paddingRight += $("#route-finder-addon").outerWidth(true);
		padding[1] += paddingRight;
	}
	caller.interactiveMap.map.getView().fit(extent, {duration: 600, padding: padding});
	
}