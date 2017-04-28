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

	this.initInterface();

	var caller = this;
	$.each(waypoints, function(index, value){
		caller.waypoints.push(new Waypoint(value[0], value[1], index, interactiveMap.map, function(waypoint){
			caller.addWaypoint(waypoint);
		}));
	});

	// Show the interface
	$("#route-finder-addon").show('slow');

	// Disable The Click Event for the map
	this.interactiveMap.reversePositionManager.setActive(false);

}

RouteFinder.prototype.addWaypoint = function(waypoint){
	var wpHtml = waypoint.getHtml();
	// Let's add the waypoint
	var waypointHtml = $('\
		<li data-index="' + waypoint.index + '">\
			' + wpHtml + '\
		</li>\
		');
	$("#route-finder-addon #waypoint-list").append(waypointHtml);
	console.log($(waypointHtml).find(".delete-waypoint"));
	$(waypointHtml).find(".delete-waypoint").click({caller: this}, function(event){
		event.data.caller.removeWaypoint(parseInt($(this).attr("data-index")));
	});	
	this.interactiveMap.map.addOverlay(waypoint.marker);
}

RouteFinder.prototype.removeWaypoint = function(index){
	var waypoint = this.waypoints[index];
	// Remove The Marker from the map
	this.interactiveMap.map.removeOverlay(waypoint.marker);
	// Remove The Waypoint from the Waypoint List (Interface)
	$("#waypoint-list li[data-index=" + index + "]").remove();
	// Remove the Waypoint from the internal list
	this.waypoints.splice(index, 1);
}

RouteFinder.prototype.initInterface = function(){
	var waypointList = $('\
		<div id="waypoint-list-container" >\
			<ul id="waypoint-list" class="list-unstyled">\
			</ul>\
		</div>\
		');
	$("#route-finder-addon").append(waypointList);

	// If there is only one waypoint yet we will make the user define a start point
	if(this.waypointsLength === 1){
		$("#route-finder-addon #vehicle-chooser").after(this.generateNewWaypointForm("Startpunkt angeben:"));
	}
}

RouteFinder.prototype.generateNewWaypointForm = function(text){
	if(text === undefined){
		text = "Neuen Wegpunkt angeben:";
	}
	var startPointHtml = $('\
			<form>\
			<div class="form-group new-waypoint-form">\
				<label for="start-point">' + text + '<button type="button" \
                        data-html="true"\
                        data-trigger="hover"\
                        data-toggle="popover"\
                        data-placement="bottom"\
                        data-container="body"\
                        title="Wegpunkt definieren" \
                        data-content="Sie können neue Wegpunkte auf 2 Arten definieren:<ol><li>Klicken Sie einfach auf der Karte auf den Punkt, den Sie einfügen möchten.</li><li>Sie können nach Orten Suchen indem Sie ihre Suchworte in das Eingabefeld eintragen und entweder Enter drücken, oder auf das kleine Lupensymbol klicken. Wählen Sie dann einfach das passende Ergebnis durch Klick aus.</li></ol>">\
                        <span class="glyphicon glyphicon-question-sign"></span>\
                    </button></label>\
                <div class="input-group">\
					<input type="text" class="form-control" id="start-point">\
					<span class="input-group-addon"><button type="submit"><span class="glyphicon glyphicon-search"></span></button></span>\
				</div>\
			</div>\
			</form>\
			');
		// Enable the Popover
		$(startPointHtml).find("button[data-toggle=popover]").popover();
		// Make it execute Searches:
		$(startPointHtml).find("input[type=text]").focusin({caller: this}, function(event){
			event.data.caller.enterSearch();
		})
	return startPointHtml;
		
}

RouteFinder.prototype.enterSearch = function(){
	$("#route-finder-addon #vehicle-chooser").hide("slow");
	$("#route-finder-addon #waypoint-list-container").hide("slow");
	var caller = this;

	if($(window).outerWidth() <= 767){
		$("#route-finder-addon").animate({padding: 0}, 'slow');
	}

	var cancelSearch = $('\
			<span class="input-group-addon" id="cancel-search" title="Suche abbrechen">X</span>\
		');
		$("#route-finder-addon #cancel-search").remove();
		$("#route-finder-addon input[type=text]").before(cancelSearch);
		$(cancelSearch).click({caller: caller}, function(event){
			event.data.caller.exitSearch();
		});

}

RouteFinder.prototype.exitSearch = function(){
	$("#route-finder-addon #vehicle-chooser").show("slow");
	$("#route-finder-addon #waypoint-list-container").show("slow");
	$("#route-finder-addon").animate({padding: "15px 15px 0 15px"}, 'slow', function(){
		$("#route-finder-addon #cancel-search").remove();
	});
}

RouteFinder.prototype.exit = function(){
	$("#route-finder-addon").hide('slow', function(){
		$("#route-finder-addon #waypoint-list-container").remove();
	});
	this.interactiveMap.reversePositionManager.setActive(true);
}

