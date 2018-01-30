/**
 * Class RouteFinder
 * This is a module that enables the map to create a Route with multiple Waypoints and chose the desired vehicle
 * @param interactiveMap - an instance of the current interactiveMap Object
 * @param waypoints - An Array of waypoints [[lon,lat], ...] to start of with
**/
function RouteFinder(interactiveMap, waypoints, vehicle){
	this.interactiveMap = interactiveMap;
	this.waypoints = [];
	this.gpsEnabled = false;
	if(this.interactiveMap.GpsManager != null && this.interactiveMap.GpsManager.gps)
		this.gpsEnabled = true;
	this.resultHistory = new LocalHistory("results");
	this.searchHistory = new LocalHistory("suche");
	this.waypointsLength = waypoints.length;
	this.results = null;
	if(typeof vehicle != "undefined")
		this.vehicle = vehicle; // The next calculated Route will use this vehicle
	else
		this.vehicle = null;
	this.addWaypointsOnGps = null;

	$("#route-finder-addon .inactive").hide();

	// Add the Url Updater
	this.addURLUpdater();

	this.appendNewWaypointForm();

	this.addWaypoints(waypoints);

	// Show the interface
	var caller = this;
	$("#route-finder-addon").show('slow', function(){
		caller.adjustMapView();
		caller.updateMobilesWindow();
	});
	// Add the Click Event Handler on the mobiles-window
	$("#route-finder-addon #waypoint-list-container .mobiles-window").click({caller: this}, function(event){
		event.data.caller.mobilesWindowClick();
	});
	// Add the Click Event Handler on the Map
	this.interactiveMap.map.on("singleclick", this.mapClick, this);

	// Disable The Click Event for the map
	this.interactiveMap.reversePositionManager.setActive(false);

	// Enable Click Event for the Exit Button
	$("#route-finder-addon #vehicle-chooser button.close").click({caller: this}, function(event){
		caller.interactiveMap.switchModule("search");
	});

	// Disable The Zoom Bar. We won't need it now
	$(".ol-zoom, .ol-zoomslider").hide();


}

RouteFinder.prototype.addWaypoints = function(waypoints, recalculate){
	var caller = this;

	if(this.addWaypointsOnGps == null){
		// If we need a GPS Location and the GPS Locator is not yet ready we will add the Results when it's ready
		var shouldAddNow = true;
		$.each(waypoints, $.proxy(function(index, value){
				if(typeof value[0] == "string" && value[0] == "gps" && (this.interactiveMap.GpsManager == null || this.interactiveMap.GpsManager.loadingGps())){
					shouldAddNow = false;
					this.addWaypointsOnGps = waypoints;
					return 0;
				}
		}, this));
		if(!shouldAddNow) return;
	}else{
		this.addWaypointsOnGps = null;
	}
	var gpsAdded = false; // We will only add the gps position one time. We'll ignore any other occurences
	$.each(waypoints, function(index, value){
		if(typeof value[0] == "string" && value[0] == "gps"){
			if(!gpsAdded){
				caller.addWaypoint(undefined, undefined, undefined, caller.interactiveMap.GpsManager, true, false);
				gpsAdded = true;
			}
		}else
			caller.addWaypoint(value[0], value[1], undefined, undefined, false, false);
	});	

	if( this.interactiveMap.GpsManager !== null && this.interactiveMap.GpsManager.gps !== null 
		&& this.interactiveMap.GpsManager.gps && this.interactiveMap.GpsManager.accuracy < 500 && this.waypoints.length <= 1 && !gpsAdded){
		this.addWaypoint(undefined, undefined, undefined, this.interactiveMap.GpsManager, true, false);
	}

	if((typeof recalculate == "boolean" && recalculate) || typeof recalculate == "undefined"){
		if(this.vehicle != null){
			this.calculateRoute(this.vehicle);
			this.vehicle = null;
		}else{
			this.calculateRoute();
		}
	}
}

/*
 * this methos is Called by the GPS-Mager once it has access to a GPS Position
*/
RouteFinder.prototype.enableGps = function(){
	this.gpsEnabled = true;
	if(this.addWaypointsOnGps != null){
		this.addWaypoints(this.addWaypointsOnGps);
	}
}

RouteFinder.prototype.disableGps = function(){
	this.gpsEnabled = false;
	if(this.addWaypointsOnGps != null){
		console.log(this.addWaypointsOnGps);
		this.addWaypoints(this.addWaypointsOnGps);
	}
}

RouteFinder.prototype.adjustMapView = function(padding){
	if(this.waypoints.length === 1){
		// When there is only one Waypoint defined, we're gonna zoom onto it
		var point = [this.waypoints[0].lon, this.waypoints[0].lat];
		// Animate the View change:
		this.interactiveMap.map.getView().animate({center: this.interactiveMap.map.transformToMapCoordinates(point), zoom: 12, rotation: 0, duration: 750});
	}else if(this.route !== undefined){
		this.route.updateMapExtent(padding);
	}
}

/**
 * This Function either takes a lat/lon Position to add a waypoint
 * Or it takes a finished NominatimParser Object which will leave out the Network Request 
 * that would be needed to convert lat/lon into a concrete Waypoint
 * @return is a boolean whether the waypoint was added successfully or not.
**/
RouteFinder.prototype.addWaypoint = function(lon, lat, nominatimParser, gpsManager, autoPosition, recalculate){
	var waypoint = null;
	var index = -1;
	if(autoPosition === undefined) autoPosition = true;
	// We check where to put our new Waypoint
	//  If there is no Waypoint yet we will just push it to the list
	if((this.waypoints.length === 0 || this.waypoints.length === 1) && autoPosition){
		index = 0;
	}else {
		index = this.waypoints.length;
	}
	if(lat !== undefined && lon !== undefined){
		var caller = this;
		waypoint = new Waypoint(lon, lat, nominatimParser, gpsManager, index, this.interactiveMap.map, function(waypoint){
			caller.addWaypointInterface(waypoint);
		});
	}else if(nominatimParser !== undefined){
		var caller = this;
		waypoint = new Waypoint(undefined, undefined, nominatimParser, gpsManager, index, this.interactiveMap.map, function(waypoint){
			caller.addWaypointInterface(waypoint);
		});
	}else if(gpsManager !== undefined){
		var caller = this;
		waypoint = new Waypoint(undefined, undefined, nominatimParser, gpsManager, index, this.interactiveMap.map, function(waypoint){
			caller.addWaypointInterface(waypoint);
		});
	}else{
		return false;
	}
	if(waypoint.type == "gps"){
		console.log(waypoint);
		this.waypoints.unshift(waypoint);
	}else{
		this.waypoints.push(waypoint);
	}
	// So we now have a correct list of Waypoints but we need to tell them their new Index, too
	$.each(this.waypoints, function(index, waypoint){
		waypoint.changeIndex(index);
	});

	// There was a Waypoint added we need to update the screen
	if($("#route-finder-addon > form").length >= 1){
		var caller = this;
		$("#route-finder-addon > form").hide('slow', function(){
			$(this).remove();
			caller.appendNewWaypointForm();
			caller.updateMobilesWindow();
		});
	}

	// If there are more than two Waypoints defined, we can calculate the route
	if((typeof recalculate != "undefined" && recalculate) || typeof recalculate == "undefined")
		this.calculateRoute();

	// Make the List sortable
	var caller = this;
	$("#waypoint-list").sortable({
		handle: ".drag",
		items: "> li.wp",
		axis: "y",
		start: function(event, ui){
			$("#waypoint-list > .route-description").hide("fast", function(){
				caller.updateMobilesWindow();
				caller.adjustMapView();
			});
			
		},
		stop: function(event, ui){
			$("#waypoint-list > .route-description").show("fast", function(){
				caller.updateMobilesWindow();
				caller.adjustMapView();
			});
		},
		update: function( event, ui ){
			caller.waypointsResorted();
		}
	});
}

RouteFinder.prototype.waypointsResorted = function(){
	// The Waypoints got resorted by dragging which means that the ui has changed and we need to apply that to the waypoints in this object
	var newWaypoints = [];
	var caller = this;
	$("#route-finder-addon #waypoint-list > li.wp").each(function(index, value){
		var currentPos = parseInt($(value).attr("data-index"));
		newWaypoints.push(caller.waypoints[currentPos]);
	});
	this.waypoints = newWaypoints;
	// So we now have a correct list of Waypoints but we need to tell them their new Index, too
	$.each(this.waypoints, function(index, waypoint){
		waypoint.changeIndex(index);
	});
	this.calculateRoute();
}

RouteFinder.prototype.calculateRoute = function(vehicle){
	if(typeof this.route !== "undefined"){
		this.route.exit();
		this.route = undefined;
		$("#waypoint-list .route-description").remove();
		this.updateMobilesWindow();
		this.adjustMapView();
	}
	if(this.waypoints.length >= 2){
		var caller = this;
		this.route = new Route(this.waypoints, vehicle, this.interactiveMap, function(){
			caller.addLegDescriptions();
		});
		// Enable the Navigation
		$("#route-finder-addon .start-navigation").show();
		$("#route-finder-addon .start-navigation").off();
		$("#route-finder-addon .start-navigation").click($.proxy(function(){
			// If the first Position is the gps Position we can simply start
			if(this.route.waypoints.length > 1 && GpsManager.prototype.isPrototypeOf(this.route.waypoints[0].data)){
				this.interactiveMap.switchModule("navigation", this.route);
			}else{
				alert("Für dieses Feature muss der Erste Punkt der Route die eigene Position sein!");
			}
		}, this));
	}else{
		$("#route-finder-addon .start-navigation").hide();
		$("#route-finder-addon .start-navigation").off();
		$("#route-finder-addon .route-information .length, #route-finder-addon .route-information .duration").html("");
		this.updateMobilesWindow();
	}
	// After every Route Calculation the URL gets updated
	this.updateURL();
}

RouteFinder.prototype.addLegDescriptions = function(){
	$("#waypoint-list > li.route-description").remove();
	var waypoints = $("#waypoint-list > li");
	var caller = this;
	$.each(waypoints, function(index, value){
		if((caller.route.route.routes[caller.route.route.activeRoute].legs.length - 1) >= index){
			var leg = caller.route.legs[index];
			var legHtml = leg.generateRouteDescriptionHtml();
			var descrHtml = $('<li class="route-description"></li>');
			$(descrHtml).append(legHtml);
			$(value).after(descrHtml);
		}
	});
	this.updateMobilesWindow();
	this.adjustMapView();
}

RouteFinder.prototype.addWaypointInterface = function(waypoint){
	var waypointHtml = waypoint.getHtml();
	if(waypoint.type == "gps"){
		$("#route-finder-addon #waypoint-list").prepend(waypointHtml);
	}else{
		$("#route-finder-addon #waypoint-list").append(waypointHtml);	
	}

	$(waypointHtml).find(".delete-waypoint").click({caller: this}, function(event){
		event.data.caller.removeWaypoint(parseInt($(this).attr("data-index")));
		event.data.caller.calculateRoute();
	});	
	this.interactiveMap.map.addOverlay(waypoint.marker);
	this.updateMobilesWindow();
}

RouteFinder.prototype.removeWaypoint = function(index){
	var waypoint = this.waypoints[index];
	// Remove The Marker from the map
	this.interactiveMap.map.removeOverlay(waypoint.marker);
	// Remove The Waypoint from the Waypoint List (Interface)
	$("#waypoint-list li[data-index=" + index + "]").remove();
	// Remove the Waypoint from the internal list
	this.waypoints.splice(index, 1);
	$.each(this.waypoints, function(index, value){
		value.changeIndex(index);
	});
	this.updateMobilesWindow();
}

RouteFinder.prototype.removeWaypointMarker = function(index){
	var waypoint = this.waypoints[index];
	this.interactiveMap.map.removeOverlay(waypoint.marker);
}

RouteFinder.prototype.mapClick = function(event){
	this.exitSearch();
	$("#route-finder-addon .show-list").remove();
	var pos = this.interactiveMap.map.transformToWorldCoordinates(event.coordinate);
	$("#route-finder-addon #waypoint-list-container").show("slow");
	$("#route-finder-addon #vehicle-chooser").show("slow");
	var caller = this;
	$("#route-finder-addon > form").show("slow", function(){
		caller.updateMobilesWindow();
		caller.addWaypoint(pos[0], pos[1], undefined, undefined, true);
	});	
}

RouteFinder.prototype.mobilesWindowClick = function(){
	// Hide the Interface
	$("#route-finder-addon #waypoint-list-container").hide("slow");
	$("#route-finder-addon #vehicle-chooser").hide("slow");
	var caller = this;
	$("#route-finder-addon > form").hide("slow", function(){
		// Add the Possibility to come back to the list
		var showList = $('\
			<div class="container show-list">\
				Liste anzeigen\
			</div>');
		$("#route-finder-addon").prepend(showList);
		$(showList).click({caller: caller}, function(event){
			$("#route-finder-addon #waypoint-list-container").show("slow");
			$("#route-finder-addon #vehicle-chooser").show("slow");
			$("#route-finder-addon > form").show("slow", function(){
				event.data.caller.updateMobilesWindow();
				event.data.caller.adjustMapView();
			});
			$("#route-finder-addon .show-list").remove();
		});
	});

	this.adjustMapView([25,25,25,25]);
}

RouteFinder.prototype.updateMobilesWindow = function(){
	if($(window).outerWidth() <= 767){
		// On Mobiles we need a window to look through to the map
		var height = $(window).outerHeight() - $("#route-finder-addon #vehicle-chooser").outerHeight() - $("#route-finder-addon > form").outerHeight() - $("#route-finder-addon #waypoint-list-container #waypoint-list").outerHeight() - $("#route-finder-addon #waypoint-list-container .route-information").outerHeight();
		height = Math.max(height, 175);
		$("#route-finder-addon #waypoint-list-container > .mobiles-window").css("height", height + "px");
	}
}

RouteFinder.prototype.appendNewWaypointForm = function(){
	// If there is only one waypoint yet we will make the user define a start point
	$("#route-finder-addon .results").before(this.generateNewWaypointForm("Wegpunkt hinzufügen:"));
}

RouteFinder.prototype.generateNewWaypointForm = function(text){
	if(text === undefined){
		text = "Neuen Wegpunkt angeben:";
	}
	var startPointHtml = $('\
			<form>\
			<div class="form-group new-waypoint-form">\
                <div class="input-group">\
					<input type="text" class="form-control" id="start-point" autocomplete="off" required placeholder="' + text + '">\
					<span class="input-group-addon"><button type="submit"><span class="glyphicon glyphicon-search"></span></button></span>\
					<span class="input-group-addon"><button type="button"\
						data-html="true"\
                        data-trigger="hover"\
                        data-toggle="popover"\
                        data-placement="bottom"\
                        data-container="body"\
                        title="Wegpunkt definieren" \
                        data-content="Sie können neue Wegpunkte auf 2 Arten definieren:<ol><li>Klicken Sie einfach auf der Karte auf den Punkt, den Sie einfügen möchten.</li><li>Sie können nach Orten Suchen indem Sie ihre Suchworte in das Eingabefeld eintragen und entweder Enter drücken, oder auf das kleine Lupensymbol klicken. Wählen Sie dann einfach das passende Ergebnis durch Klick aus.</li></ol>"\
					><span class="glyphicon glyphicon-question-sign"</button>\
				</div>\
				<div class="history-container">\
                    <div class="results"></div>\
                    <div class="searches"></div>\
                </div>\
			</div>\
			</form>\
			');
		// Enable the search power on the form element
		$($(startPointHtml)[0]).submit({caller: this}, function(event){
			var query = $(this).find("input[type=text]").val();
			event.data.caller.executeSearch(query);
			return false;
		});
		// Enable the History on the Input Element
		$(startPointHtml).find("input[type=text]").off("focusin");
		$(startPointHtml).find("input[type=text]").focusin($.proxy(this.historyEnabled, this));
		$(startPointHtml).find("input[type=text]").focusout(function(event){
			$("#route-finder-addon > form .history-container .results").html("");
			$("#route-finder-addon > form .history-container .searches").html("");

		});
		// Enable the Popover
		$(startPointHtml).find("button[data-toggle=popover]").popover();
		// Make it execute Searches:
		$(startPointHtml).find("input[type=text]").focusin({caller: this}, function(event){
			event.data.caller.enterSearch();
		});
	return startPointHtml;
		
}

RouteFinder.prototype.historyEnabled = function(){
	// Clear the current History
	$("#route-finder-addon > form .history-container .results").html("");
	$("#route-finder-addon > form .history-container .searches").html("");
	// Add the GPS position to the history container
	var resHtml = $('\
							<div class="container-fluid suggestion item gps" data-resultNumber="-1">\
	                            <div class="flex-container">\
	                                <div class="item history">\
	                                    <span class="marker" style="font-size: 16px;"></span>\
	                                </div>\
	                                <div class="item result">\
	                                    Eigene Position\
	                                </div>\
	                            </div>\
	                        </div>\
							');
	$(resHtml).hide();
	$(resHtml).mousedown($.proxy(function(event){
		this.exitSearch();
		this.addWaypoint(undefined, undefined, undefined, this.interactiveMap.GpsManager, true, true);
	}, this));
	$("#route-finder-addon > form .history-container .results").append(resHtml);
	// Load the History into the container
	$.each(this.resultHistory.results, $.proxy(function(index, value){
		var html = (new NominatimParser(value)).getRouteFinderHtml().html();
		var resHtml = $('\
							<div class="container-fluid suggestion item" data-resultNumber="'+index+'">\
	                            <div class="flex-container">\
	                                <div class="item history">\
	                                    <span class="marker" style="font-size: 16px;">' + (index+1) + '</span>\
	                                </div>\
	                                <div class="item result">\
	                                    ' + html + '\
	                                </div>\
	                            </div>\
	                        </div>\
							');
		$(resHtml).hide();
		$(resHtml).mousedown($.proxy(function(event){
				// When the suggestion is Clicked we simply add it to the waypoints
				// But we also update the date of the result
				this.resultHistory.addItem(value);
				this.exitSearch(new NominatimParser(value));
		}, this));
		$("#route-finder-addon > form .history-container .results").append(resHtml);
	}, this));
	// Load the recent searches into the container
	$.each(this.searchHistory.results, $.proxy(function(index, value){
		var item = $('\
			<div class="item inactive">\
				<div class="icon"><span class="glyphicon glyphicon-time"></span></div>\
				<div class="search-query">' + value.query + '</div>\
			</div>');
		$(item).hide();
		$(item).mousedown($.proxy(function(event){
			var val = $(item).find(".search-query").html();
			$("#route-finder-addon > form input[type=text]").val(val);
			this.executeSearch(val);
		}, this));
		$("#route-finder-addon > form .history-container .searches").append(item);
	}, this));
	// Add the Listener for the SearchBox
	$("#route-finder-addon > form input[type=text]").keyup(function(){
		var value = $(this).val().toLowerCase();
		// Each past search:
		$("#route-finder-addon > form .history-container .results > .item").each(function(index, item){
			var query = $(item).text().toLowerCase();
			if(value.length > 0 && query.indexOf(value) > -1 && !$(item).hasClass("gps")){
				$(this).show();
			}else if(!$(item).hasClass("gps")){
				$(this).hide();
			}
		});
		$("#route-finder-addon > form .history-container .searches > .item").each(function(index, item){
			var query = $(item).find(".search-query").html().toLowerCase();
			if(value.length > 0 && query.indexOf(value) > -1 && !$(item).hasClass("gps")){
				$(this).show();
			}else if(!$(item).hasClass("gps")){
				$(this).hide();
			}	
		});
	});
}

RouteFinder.prototype.executeSearch = function(query){ 
	// Generate the Url for the Search Results
	$("#route-finder-addon .results .wait-for-search").show('fast');
	var map = this.interactiveMap.map;
	var tmpExtent = map.getView().calculateExtent(map.getSize());
	var extent = map.transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(map.transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
	var url = '/' + encodeURI(query) + '/' + encodeURI(String(extent[0])) + '/' + encodeURI(String(extent[1])) + '/' + encodeURI(String(extent[2])) + '/' + encodeURI(String(extent[3]));
	// Query the Search:
	var results = null;
	var caller = this;
	var timeout = 10; // 10 seconds Timeout for this request
	this.searching = $.ajax({
		url: url,
		dataType: 'json',
		success: $.proxy(function(data){
			this.searching = undefined;
			if(this.results !== null && this.results !== undefined) this.results.deleteSearch();
			this.results = new RouteFinderSearchResults(this.interactiveMap, data, query);
			if(data.length > 0){
				caller.searchHistory.addItem({query: query});
			}
			$("#route-finder-addon .results .wait-for-search").hide('fast');
			$("#route-finder-addon > form .history-container .results .item").hide();
			$("#route-finder-addon > form .history-container .searches .item").hide();
		}, this),
		timeout: (timeout*1000),
		error: $.proxy(function(jqxr){
			// We encountered an error while trying to fetch the search results.
			// It can be an abortion error in case the user clicked abort, or a timeout/connection error
			// Only in the latter case we'll retry the search
			if(jqxr.statusText != "abort"){
				$("#route-finder-addon .results .wait-for-search > p").hide("slow"); // Hide the currently displayed information
				$("#route-finder-addon .results .wait-for-search .no-internet").show("slow");
				this.retrySearch = window.setTimeout($.proxy(function(){
					this.retrySearch = undefined;
					this.executeSearch(query);
				}, this), 1000);
			}
		}, this)
	}).always($.proxy(function(){
		this.searching = undefined;
	}, this));
}

RouteFinder.prototype.enterSearch = function(){
	$("#route-finder-addon #vehicle-chooser").hide("slow");
	$("#route-finder-addon #waypoint-list-container #waypoint-list").hide("slow");
	$("#route-finder-addon #waypoint-list-container .mobiles-window").hide('slow');
	$("#route-finder-addon #waypoint-list-container .route-information").hide("slow");
	var gpsInWaypointList = false;
	$.each(this.waypoints, function(index, value){
		if(typeof value.type != undefined && value.type == "gps")
			gpsInWaypointList = true;
	});
	if(this.gpsEnabled && !gpsInWaypointList)
	{
		$("#route-finder-addon > form .history-container .results .gps").show();
	}
	var caller = this;

	var cancelSearch = $('\
		<span class="input-group-addon" id="cancel-search" title="Suche abbrechen">X</span>\
	');
	$("#route-finder-addon #cancel-search").remove();
	$("#route-finder-addon input[type=text]").before(cancelSearch);
	$(cancelSearch).click({caller: caller}, function(event){
		event.data.caller.exitSearch();
	});

}

RouteFinder.prototype.exitSearch = function(nominatimParser){
	$("#route-finder-addon .results .wait-for-search").hide('fast');
	$("#route-finder-addon .results .wait-for-search > p").show("slow"); // Hide the currently displayed information
	$("#route-finder-addon .results .wait-for-search .no-internet").hide("slow");
	$("#route-finder-addon > form .history-container .results .gps").hide();
	if(this.retrySearch != undefined){
		window.clearTimeout(this.retrySearch);	// We retry fetching search results with a window.setTimeout() which needs to get cleared when we abort
	}
	if(this.searching != undefined){
		this.searching.abort();
	}
	$("#route-finder-addon #vehicle-chooser").show("slow");
	$("#route-finder-addon #waypoint-list-container .route-information").show("slow");
	$("#route-finder-addon #waypoint-list-container #waypoint-list").show("slow", function(){
		$("#route-finder-addon #cancel-search").remove();
	});
	var caller = this;
	$("#route-finder-addon #waypoint-list-container .mobiles-window").show('slow', function(){
		caller.adjustMapView();
	});
	$("#route-finder-addon .wait-for-search").hide('fast');
	if(this.results !== null){
		this.results.deleteSearch();
		this.results = null;
	}
	$("#route-finder-addon input[type=text]").val("");

	// If this method has a valid Nominatim Parser Object as argument
	// then the Search was successfull and we can remove the Search Box
	if(nominatimParser !== undefined){
		this.addWaypoint(undefined, undefined, nominatimParser);
		this.resultHistory.addItem(nominatimParser.nominatimResult);
	}

	
}

RouteFinder.prototype.addURLUpdater = function(){
	// The URL gets updated everytime a new waypoint is added
	// We just need to register the popstate event
	$(window).on("popstate", $.proxy(this.popUrl, this));
}

RouteFinder.prototype.popUrl = function(event){
	var state = event.originalEvent.state;
	if(state != null){
		// We need to check if the poped event is part of the RouteFinder or part of the SearchModule
		if(typeof state.waypoints != "undefined"){
			// Part of Route Finder
			var waypoints = state.waypoints;
			// Remove the old Waypoints
			while(this.waypoints.length > 0){
				this.removeWaypoint(0);
			}
			// Remove the old Route
			if(this.route !== null && this.route !== undefined){
				this.route.deleteRoute();
				$("#waypoint-list .route-description").remove();
			}
			this.vehicle = state.vehicle;
			this.addWaypoints(waypoints, true);
		}else if(typeof state.pos != "undefined"){
			// Part of Search Addon
			// The Url of the Search can be distinguished between just a map Position and a map position plus search query
			if(typeof state.query != "undefined" && typeof state.pos != "undefined" && typeof state.zoom != "undefined"){
				// The Map will get a new Position and zoom
				// After that we will exit the route finder and execute the search
				this.interactiveMap.map.getView().animate({
					center: this.interactiveMap.map.transformToMapCoordinates(state.pos),
					zoom: state.zoom,
					duration: 250
				}, $.proxy(function(){
					this.interactiveMap.switchModule("search", state.query);
				}, this));
			}else if(typeof state.pos != "undefined" && typeof state.zoom != "undefined"){
				// The Map will get a new Position and then switch to the Search Module without search query
				this.interactiveMap.map.getView().animate({
					center: this.interactiveMap.map.transformToMapCoordinates(state.pos),
					zoom: state.zoom,
					duration: 250
				}, $.proxy(function(){
					this.interactiveMap.switchModule("search");
				}, this));
			}
		}
	}
}

RouteFinder.prototype.updateURL = function(){
	var waypoints = this.waypoints;
	var route = this.route;
	if(typeof route != "undefined"){
		var url = window.location.origin + "/route/start/" + route.vehicle + "/";
		// Sadly we can not store the calculated Route in the history of the browser
		// because the objects are too large to be serialized into it.
		// So we just have the Option to save the Waypoints and recalculate the route when the user presses back.
		var waypointData = [];
		$.each(waypoints, function(index, value){
			if(typeof value.type != "undefined" && value.type == "gps"){
				url += "gps;";
				waypointData.push(["gps"]);
			}else{
				url += value.lon + "," + value.lat + ";";
				waypointData.push([value.lon, value.lat]);
			}
		});
		url = url.substring(0, url.lastIndexOf(";"));
		data = {
			waypoints: waypointData,
			vehicle: route.vehicle
		};
		var currentState = window.history.state;
		// We will only add this state if it's not already the last state
		if( currentState == null || typeof currentState.waypoints == "undefined" || currentState.waypoints.length != waypointData.length || currentState.vehicle != data.vehicle){
			window.history.pushState(data, "", url);
		}else{
			var shouldPush = false;
			// The current states waypoints have the same length as the ones we try to push
			// Let's check if they are exactly the same before pushing
			$.each(waypointData, function(index,value){
				var other = currentState.waypoints[index];
				if((value[0] == "gps" && other[0] != "gps") || value[0] != other[0] || value[1] != other[1]){
					shouldPush = true;
					return 0;
				}
			});
			if(shouldPush){
				window.history.pushState(data, "", url);
			}
		}
	}
}

RouteFinder.prototype.removeURLUpdater = function(){
	$(window).off("popstate", $.proxy(this.popUrl, this));
}

RouteFinder.prototype.exit = function(){
	this.removeURLUpdater();
	$("#route-finder-addon").hide('slow');
	$("#route-finder-addon > form").remove();

	$.each(this.waypoints, $.proxy(function(index, value){
		this.removeWaypointMarker(index);
	}, this));
	// Remove the Waypoints from the Interface
	$("#route-finder-addon #waypoint-list").html("");

	// Remove Route Information
	$("#route-finder-addon #waypoint-list-container .route-information .length").html("");
	$("#route-finder-addon #waypoint-list-container .route-information .duration").html("");

	if(this.route !== null && this.route !== undefined){
		this.route.exit();
	}

	$("#route-finder-addon #waypoint-list-container .mobiles-window").off();
	$("#route-finder-addon #vehicle-chooser button.close").off();
	this.interactiveMap.map.un("singleclick", this.mapClick, this);
	this.interactiveMap.reversePositionManager.setActive(true);
	$(".ol-zoom, .ol-zoomslider").show();
}

