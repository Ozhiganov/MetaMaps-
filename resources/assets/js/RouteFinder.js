/**
 * Class RouteFinder
 * This is a module that enables the map to create a Route with multiple Waypoints and chose the desired vehicle
 * @param interactiveMap - an instance of the current interactiveMap Object
 * @param waypoints - An Array of waypoints [[lon,lat], ...] to start of with
**/
function RouteFinder(interactiveMap, waypoints){
	this.interactiveMap = interactiveMap;
	this.waypoints = [];
	this.waypointsLength = waypoints.length;
	this.results = null;
	this.appendNewWaypointForm();

	var caller = this;
	$.each(waypoints, function(index, value){
		caller.addWaypoint(value[0], value[1], undefined, undefined, false);
	});	

	if(this.interactiveMap.GpsManager.gps && this.interactiveMap.GpsManager.accuracy < 500 && this.waypoints.length <= 1){
		this.addWaypoint(undefined, undefined, undefined, this.interactiveMap.GpsManager, true);
	}

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

/*
 * this methos is Called by the GPS-Mager once it has access to a GPS Position
*/
RouteFinder.prototype.enableGps = function(){
	if(this.waypoints.length <= 1 && this.interactiveMap.GpsManager.accuracy < 500){
		// If there is one or no Waypoint defined Yet we gonna automatically add the Current Position
		// As a Waypoint
		this.addWaypoint(undefined, undefined, undefined, this.interactiveMap.GpsManager, true);
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
RouteFinder.prototype.addWaypoint = function(lon, lat, nominatimParser, gpsManager, autoPosition){
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
	if(index === 0){
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
		$("#waypoint-list .route-description").remove();
		this.updateMobilesWindow();
		this.adjustMapView();
	}
	if(this.waypoints.length >= 2){
		var caller = this;
		this.route = new Route(this.waypoints, vehicle, this.interactiveMap, function(){
			caller.addLegDescriptions();
		});
	}
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
	console.log("test");
	var waypointHtml = waypoint.getHtml();
	if(waypoint.index === 0){
		$("#route-finder-addon #waypoint-list").prepend(waypointHtml);
	}else{
		$("#route-finder-addon #waypoint-list").append(waypointHtml);	
	}

	$(waypointHtml).find(".delete-waypoint").click({caller: this}, function(event){
		event.data.caller.removeWaypoint(parseInt($(this).attr("data-index")));
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
	this.calculateRoute();
	this.adjustMapView();
}

RouteFinder.prototype.mapClick = function(event){
	this.exitSearch();
	var pos = this.interactiveMap.map.transformToWorldCoordinates(event.coordinate);
	$("#route-finder-addon #waypoint-list-container").show("slow");
	$("#route-finder-addon #vehicle-chooser").show("slow");
	var caller = this;
	$("#route-finder-addon > form").show("slow", function(){
		caller.updateMobilesWindow();
		caller.addWaypoint(pos[0], pos[1], undefined, undefined, true);
	});
	$("#route-finder-addon .results #show-list").remove();
	
}

RouteFinder.prototype.mobilesWindowClick = function(){
	// Hide the Interface
	$("#route-finder-addon #waypoint-list-container").hide("slow");
	$("#route-finder-addon #vehicle-chooser").hide("slow");
	var caller = this;
	$("#route-finder-addon > form").hide("slow", function(){
		// Add the Possibility to come back to the list
		var showList = $('\
			<div id="show-list" class="container">\
				Liste anzeigen\
			</div>');
		$("#route-finder-addon .results").append(showList);
		$(showList).click({caller: caller}, function(event){
			$("#route-finder-addon #waypoint-list-container").show("slow");
			$("#route-finder-addon #vehicle-chooser").show("slow");
			$("#route-finder-addon > form").show("slow", function(){
				event.data.caller.updateMobilesWindow();
				event.data.caller.adjustMapView();
			});
			$("#route-finder-addon .results #show-list").remove();
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
	if(this.waypoints.length <= 1){
		$("#route-finder-addon .results").before(this.generateNewWaypointForm("Startpunkt angeben:"));
	}else{
		$("#route-finder-addon .results").before(this.generateNewWaypointForm("Wegpunkt hinzufügen:"));
	}
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
			</div>\
			</form>\
			');
		// Enable the search power on the form element
		$($(startPointHtml)[0]).submit({caller: this}, function(event){
			var query = $(this).find("input[type=text]").val();
			event.data.caller.executeSearch(query);
			return false;
		});
		// Enable the Popover
		$(startPointHtml).find("button[data-toggle=popover]").popover();
		// Make it execute Searches:
		$(startPointHtml).find("input[type=text]").focusin({caller: this}, function(event){
			event.data.caller.enterSearch();
		})
	return startPointHtml;
		
}

RouteFinder.prototype.executeSearch = function(query){
	// Generate the Url for the Search Results
	$("#route-finder-addon .wait-for-search").show('fast');
	var map = this.interactiveMap.map;
	var tmpExtent = map.getView().calculateExtent(map.getSize());
	var extent = map.transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(map.transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
	var url = '/' + encodeURI(query) + '/' + encodeURI(String(extent[0])) + '/' + encodeURI(String(extent[1])) + '/' + encodeURI(String(extent[2])) + '/' + encodeURI(String(extent[3]));
	// Query the Search:
	var results = null;
	var caller = this;
	$.get(url, function(data){
		if(caller.results !== null && caller.results !== undefined) caller.results.deleteSearch();
		caller.results = new RouteFinderSearchResults(caller.interactiveMap, data, query);
	})
	.always(function(){
		$("#route-finder-addon .wait-for-search").hide('fast');
	});	
}

RouteFinder.prototype.enterSearch = function(){
	$("#route-finder-addon #vehicle-chooser").hide("slow");
	$("#route-finder-addon #waypoint-list-container #waypoint-list").hide("slow");
	$("#route-finder-addon #waypoint-list-container .mobiles-window").hide('slow');
	$("#route-finder-addon #waypoint-list-container .route-information").hide("slow");
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
	}

	
}

RouteFinder.prototype.exit = function(){
	$("#route-finder-addon").hide();
	$("#route-finder-addon > form").remove();
	while(this.waypoints.length > 0){
		this.removeWaypoint(0);
	}

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

