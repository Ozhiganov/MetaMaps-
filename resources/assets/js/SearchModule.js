function SearchModule(interactiveMap){
	this.interactiveMap = interactiveMap;
	this.resultsMarginTopMobile = 175;
	this.results = [];
	this.markerOverlays = [];
	// Initialize the search Interface
	this.initializeInterface();
	// Add the Listeners
	this.addSearchListeners();
}

SearchModule.prototype.initializeInterface = function(){
	$("#search-addon").removeClass("hidden");
}

SearchModule.prototype.addSearchListeners = function(){
	// When the searchfield got focussed
	// Mainly just displays the history
	$("#search-addon").focusin({caller: this}, function(event){
		event.data.caller.focusSearchInput();
	});

	$("#search").submit({caller: this}, function(event){
		event.data.caller.startSearch(event);
		return false;
	});
}

SearchModule.prototype.startSearch = function(event){
	this.query = $("#search input[name=q]").val();
	var caller = this;
	// Conditions for not executing the search
	if(this.query === ""){
		$("#search input[name=q]").focus();
		return;
	}
	$("#search-addon .results .results-container").html("");
	if($("#search-addon .results .results-container").attr("data-status") === "out"){
		$("#search-addon .results .results-container").hide('fast', function(){
			$("#search-addon .results .results-container").attr("data-status", "in");
		});
	}
	$("#search #delete-search").remove();


	var lockSearchFunctions = function(){
		// Prevent Additional searches until this one finishes
		$("#search button[type=submit]").attr("disabled", true);
		$("#search input[name=q]").attr("readonly", true);

	    // Let's add a Loading animation:
	    var loading = $('\
	        <div class="container-fluid wait-for-search">\
	            <p>\
	                Ergebnisse werden geladen \
	                <img src="/img/ajax-loader.gif" alt="loading..." id="loading-search-results" />\
	            </p>\
	        </div>\
	        ');
	    $(".results .results-container").before(loading);
	    $(".results .wait-for-search").show('fast');

	    // Let's make a new input-group-addon to cancel the search if it takes too long
	    var cancelSearch = $('\
	        <div class="input-group-addon" id="cancel-search" title="Suche abbrechen">\
	            X\
	        </div> \
	    ');
	    $("#search input[name=q]").after(cancelSearch);

	};
	var unlockSearchFunctions = function(){
		// Prevent Additional searches until this one finishes
		$("#search button[type=submit]").attr("disabled", false);
		$("#search input[name=q]").attr("readonly", false);

	    // Let's add a Loading animation:
	    $(".results .wait-for-search").hide('fast', function(){
	    	$(".results .wait-for-search").remove();
	    });

	    $("#search #cancel-search").remove();
	};

	// Generate the Url for the Search Results
	var map = this.interactiveMap.map;
	var tmpExtent = map.getView().calculateExtent(map.getSize());
	var extent = map.transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(map.transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
	var url = '/' + encodeURI(this.query) + '/' + encodeURI(String(extent[0])) + '/' + encodeURI(String(extent[1])) + '/' + encodeURI(String(extent[2])) + '/' + encodeURI(String(extent[3]));
	lockSearchFunctions();	
	// Query the Search:
	$.get(url, function(data){
		caller.results = data;
		caller.updateInterface();
	})
	.always(function(){
		unlockSearchFunctions();
	});	

}

SearchModule.prototype.focusSearchInput = function(){

	// Read out the locally stored History
	var history = (new LocalHistory()).getFullHistory();

	var caller = this;
	// Add the History entries to the search suggestions:
	var oldHeight = $("#search-addon .results").height();
	// Clear the History Container
	$("#search-addon .results .history-container").html("");
	$.each(history, function(index, value){
		
		var res = "";
		if(typeof value === "object"){
			res =(new NominatimParser(value)).getHTMLResult().html();
		}else if(typeof value === "string"){
			res = value;
		}
		var resHtml = $('\
                        <div class="container-fluid suggestion">\
                            <div class="flex-container">\
                                <div class="item history">\
                                    <span class="glyphicon glyphicon-time"></span>\
                                </div>\
                                <div class="item result">\
                                    ' + res + '\
                                </div>\
                            </div>\
                        </div>\
                        ');
		$("#search-addon .results .history-container").append(resHtml);
	});
	var newHeight = $("#search-addon .results").height();

	this.adjustResultBoxHeight(oldHeight, newHeight);
}

SearchModule.prototype.adjustResultBoxHeight = function(oldHeight, newHeight){
	$("#search-addon .results").height(oldHeight),
	$("#search-addon .results").animate({height: newHeight}, 'slow', function(){
		$("#search-addon .results").height('auto');
	});
}

/**
 * Updates the User Interface if there are any Search results saved in this Module
 * It prints all Markers and geometries for the search results and updates the results list
**/
SearchModule.prototype.updateInterface = function(){
	if(this.results.length > 0){
		// First add those Results to the Results List
		$("#search-addon .results .results-container").html("");
		$("#search-addon .results .mobiles-window").remove();
		// On Mobiles we need a window to look through to the map
		if($(window).outerWidth() <= 767){
			$("#search-addon .results .results-container").before("<div class=\"mobiles-window\"></div>");
			// The Search box got focussed on a mobile Let's get more Space
			$("#search-addon").animate({"margin": 0}, 'slow');
			$("#search-addon .results").css("border-radius", 0);
			$("#search-addon .results").css("max-height", "95vh");
		}

		$.each(this.results, function(index, value){
			var res = (new NominatimParser(value)).getHTMLResult().html();
			var resHtml = $('\
							<div class="container-fluid suggestion">\
	                            <div class="flex-container">\
	                                <div class="item history">\
	                                    <span class="marker" style="filter: hue-rotate(' + value["huerotate"] + 'deg); font-size: 16px;">' + index + '</span>\
	                                </div>\
	                                <div class="item result">\
	                                    ' + res + '\
	                                </div>\
	                            </div>\
	                        </div>\
							');
			$("#search-addon .results .results-container").append(resHtml);
		});
		$("#search-addon .results .results-container").show('slow', function(){
			$("#search-addon .results .results-container").attr("data-status", "out");
		});
		// Let's make a new input-group-addon to cancel the search if it takes too long
	    var cancelSearch = $('\
	        <div class="input-group-addon" id="delete-search" title="Suche abbrechen">\
	            X\
	        </div> \
	    ');
	    $("#search input[name=q]").after(cancelSearch);
	    $(cancelSearch).click({caller: this}, function(event){
	    	event.data.caller.deleteSearch();
	    });
	    this.updateResultMarker();
	    this.updateMapExtent();
	}
}

SearchModule.prototype.deleteSearch = function(){
	$("#search-addon .results .results-container").hide("slow", function(){
		$("#search-addon .results .results-container").html("");
	});
	$("#search-addon .results .history-container").hide("slow", function(){
		$("#search-addon .results .history-container").html("");
	});
	$("#search-addon #delete-search").remove();
	$("#search-addon #search input[name=q]").val("");
}

SearchModule.prototype.updateResultMarker = function(){
	var caller = this;
	if(this.markerOverlays.length > 0){
		$.each(this.markerOverlays, function(index, overlay){
			caller.interactiveMap.map.removeOverlay(overlay);
		});
		this.markerOverlays = [];
	}
	
	$.each(this.results, function(index, value){
		var el = $('<span id="index" class="marker" style="filter: hue-rotate(' + value["huerotate"] + 'deg)">' + index + '</span>');
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

SearchModule.prototype.updateMapExtent = function(){
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
			if(res.display_name.indexOf(value) === -1){
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
	var padding = [25,25,25,25];
	if($(window).outerWidth() <= 767){
		// Padding Top:
		padding[0] = $("#search").outerHeight(true) + 15;
		// Padding Bottom:
		padding[2] = $(window).outerHeight() - this.resultsMarginTopMobile - padding[0];
		console.log($(window).outerHeight(), this.resultsMarginTopMobile, padding[0]);
	}else{
		var paddingRight = 0;
		paddingRight += $("#search-addon").outerWidth(true);
		console.log(paddingRight);
		padding[1] = paddingRight;
	}
	
	caller.interactiveMap.map.getView().fit(extent, {duration: 600, padding: padding});
	
}