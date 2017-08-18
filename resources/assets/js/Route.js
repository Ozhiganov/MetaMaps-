function Route(waypoints, vehicle, interactiveMap, callback, route){

	this.waypoints = waypoints;
	this.callback = callback;
	this.interactiveMap = interactiveMap;
	this.informationOverlays = [];
	if(vehicle === undefined){
		this.vehicle = this.estimateVehicle();
	}else{
		this.vehicle = vehicle;
	}
	this.legs = [];	// Value is set in calculateRoute()
	this.route = this.calculateRoute();	
	this.addVehicleChangedEvent();
}

Route.prototype.switchActiveRoute = function(index){
	this.route.activeRoute = index;
	this.legs = this.extractLegs();
}

Route.prototype.extractLegs = function(){
	var result = [];
	var caller = this;
	$.each(this.route.routes[this.route.activeRoute].legs, function(index, value){
		result.push(new Leg(value, caller));
	});
	return result;
}

Route.prototype.addVehicleChangedEvent = function(){
	$("#route-finder-addon #vehicle-chooser input").change({caller: this}, function(event){
		event.data.caller.vehicle = $(this).attr("value");
		event.data.caller.deleteRoute();
		event.data.caller.interactiveMap.module.calculateRoute(event.data.caller.vehicle);
	});
}

Route.prototype.estimateVehicle = function(){
	// This Function estimates the required vehicle for the route
	// All Distances < 2km will be by foot
	// All Distances < 10km by bike
	// All Distances >= 10km by car
	// Let's calculate the distance between Waypoints
	var distance = this.estimateRouteDistance();
	if(distance < 2000) return "foot";
	else if(distance < 10000) return "bicycle";
	else return "car";
}

Route.prototype.estimateRouteDistance = function(){
	// We will calculate the distance between every two waypoints
	var wgs84Sphere = new ol.Sphere(6378137);
	var caller= this;
	var distance = 0;
	$.each(this.waypoints, function(index, value){
		if(caller.waypoints[index+1] === undefined) return 0;
		var c1 = [value.lon, value.lat];
		var c2 = [caller.waypoints[index+1].lon, caller.waypoints[index+1].lat];
		distance += wgs84Sphere.haversineDistance(c1,c2);
	});
	return distance;
}

Route.prototype.calculateRoute = function(){
	if(this.waypoints.length >= 2){
		var p = true;
		if(typeof print == "bolean")
			p = print;
		var url = "";
		$.each(this.waypoints, function(index, value){
			url += value.lon + "," + value.lat + ";";
		});
		url = url.replace(/;+$/, '');

		url = "/route/find/" + this.vehicle + "/" + url;

		var caller = this;
		$.get(url, function(data){
			caller.route = data;
			caller.route.activeRoute = 0;
			caller.printRoute();
			caller.updateVehicle();
			caller.updateRouteInformation();
			caller.updateMapExtent();
			// Save the legs
			caller.legs = caller.extractLegs();
			if(typeof caller.callback === "function"){
				caller.callback();
			}
		});
	}
}

Route.prototype.updateMapExtent = function(initPadding){
	if(this.geom !== undefined){
		var padding = [66,25,25,25];
		if(initPadding !== undefined){
			padding = initPadding;
		}else if($(window).outerWidth() <= 767){
			// Padding Top:
			padding[0] += $("#route-finder-addon > form").outerHeight(true);
			padding[0] += $("#route-finder-addon > #vehicle-chooser").outerHeight(true);
			// Padding Bottom:
			padding[2] += $(window).outerHeight(true) - $("#route-finder-addon > form").outerHeight(true) - $("#route-finder-addon > #vehicle-chooser").outerHeight(true) - $("#route-finder-addon #waypoint-list-container .mobiles-window").outerHeight(true);
		}else{
			var paddingRight = 0;
			paddingRight += $("#route-finder-addon").outerWidth(true);
			padding[1] += paddingRight;
		}
		this.interactiveMap.map.getView().fit(this.geom, {
			duration: 750,
			padding: padding
		});
	}
}

Route.prototype.updateRouteInformation = function(){
	var length = this.route.routes[this.route.activeRoute].distance;
	var distanceString = this.distanceString(length);
	$("#route-finder-addon #waypoint-list-container .route-information .length").html(distanceString);

	var duration = this.route.routes[this.route.activeRoute].duration;
	var durationString = this.durationString(duration);
	$("#route-finder-addon #waypoint-list-container .route-information .duration").html(durationString);

	this.interactiveMap.module.updateMobilesWindow();
}

Route.prototype.distanceString = function(length){
	var result = "";
	length = Math.floor(length);

	if(length > 10000){
		// We will only display full km
		result = Math.round(length/1000) + " km";
	}else if(length > 2000){
		// We will display every 100m
		result = (Math.round(length/100) / 10) + "km";
	}else if(length > 1000){
		// We will display every 50m
		length /= 10;
		length = Math.ceil(length/5) * 5;
		length /= 100;
		result = length + " km";
	}else if(length > 500){
		// We will display every 50m but in m instead of km
		length /= 10;
		length = Math.ceil(length/5) * 5;
		length *= 10;
		result = length + " m";
	}else{
		// We will display every 10m but in m instead of km
		length = Math.ceil(length / 10) * 10;
		result = length + " m";
	}

	return result;
}

Route.prototype.durationString = function(duration){
	duration = Math.abs(duration);
	duration = Math.floor(duration);
	var result = "";
	if(duration >= 3600){
		var hours = Math.floor(duration / 3600);
		var minutes = Math.round((duration % 3600) / 60);

		result += hours + " Std " + minutes + " Min";
	}else{
		var minutes = Math.round((duration % 3600) / 60);

		result += minutes + " Min";
	}
	return result;
}

Route.prototype.updateVehicle = function(){
	// Uncheck the current vehicle
	$("#vehicle-chooser input[checked]").prop("checked", false);
	// Check the new one
	$("#vehicle-chooser input[value=" + this.vehicle + "]").prop("checked", true);
}

Route.prototype.printRoute = function(){
	this.deleteRoute();

    var vectorS = new ol.source.Vector();
    
    // Geometry of the active route
    var  geojson = this.route.routes[this.route.activeRoute].geometry;
	this.geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });


    // Let's print alternative routes, first
    if(this.route.routes.length > 1){
    	var alternativerouteLineStyle = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(121,121,121)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(121,121,121,.03)'
	        })
	    });
	    var alternativerouteLineHoverStyle = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(255,0,0)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(255,0,0,.03)'
	        })
	    });
    	for(var i = 0; i < this.route.routes.length; i++){
    		if(i === this.route.activeRoute) continue;
    		var  altgeojson = this.route.routes[i].geometry;
    		var geom = (new ol.format.GeoJSON()).readGeometry(altgeojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
		    var feature = new ol.Feature({
		        'geometry': geom
		    });
		    feature.setStyle(alternativerouteLineStyle);
		    vectorS.addFeature(feature);

		    // For each alternative Route we will create a popup saying how much longer that route 
		    // would need to drive
		    // The most complicated part about that is to calculate the correct position for this information
		    var pos = this.calculateAlternativeRoutePopupPosition(this.route.routes[i]);
		    var time = this.route.routes[i].duration - this.route.routes[this.route.activeRoute].duration;
		    var timeString = this.durationString(time);
		    var informationOverlay = new ol.Overlay({
		    	element: $('\
		    		<div id="popup" class="ol-popup alternative-route" title="Klicken zum Auswählen der Alternativroute.">\
		    			<div id="popup-content">\
		    				<font color="' + (time > 0 ? "red" : "green") + '">' + (time > 0 ? "+" : "-") + timeString + '</font> <br /> <nobr>' + this.route.routes[i].legs[0].summary + '</nobr>\
		    			</div>\
		    		</div>').get(0),
		    	autopan: false,
		    	position: pos
		    });
		    $(informationOverlay.getElement()).mouseover({feature: feature}, function(event){
		    	event.data.feature.setStyle(alternativerouteLineHoverStyle);
		    });
		    $(informationOverlay.getElement()).mouseout({feature: feature}, function(event){
		    	event.data.feature.setStyle(alternativerouteLineStyle);
		    });
		    $(informationOverlay.getElement()).click({caller: this, index: i}, function(event){
		    	event.data.caller.switchActiveRoute(event.data.index);
		    	event.data.caller.printRoute();	
		    	event.data.caller.updateRouteInformation();	  
		    	event.data.caller.interactiveMap.module.addLegDescriptions(); 
		    });
		    this.interactiveMap.map.addOverlay(informationOverlay);
		    this.informationOverlays.push(informationOverlay);
    	}
    }

    // This is gonna be the main route
	var routeLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(255,128,0)',
            width: 5
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,128,0,.03)'
        })
    });

	
    var feature = new ol.Feature({
        'geometry': this.geom
    });
    feature.setStyle(routeLineStyle);
    vectorS.addFeature(feature);

    this.vectorLayerRoutePreview = new ol.layer.Vector({
        source: vectorS
    });
    
    this.interactiveMap.map.addLayer(this.vectorLayerRoutePreview);
}

/**
 * This Function takes an alternative Route as an argument.
 * It will then compare that route to the currently active route
 * and determine all parts of the route of the alternative route that are
 * different to the currently active one.
 * From all calculated parts It'll take the longest one and calculate the Point
 * that is exactly in the center of that route part.
 * This will be the Position where we will display the Information for this alternative Route
**/
Route.prototype.calculateAlternativeRoutePopupPosition = function(alternativeRoute){
	var parts = [];
	var tmpLineString = undefined;

	// We will use copies of the array because we will delete a whole ton of waypoints from it.
	// Because that will significantly speed up our process
	var ar1 = alternativeRoute.geometry.coordinates.slice();
	var caller = this;
	var pos = [];
	$.each(ar1, function(index, value){
		if(value[0] !== caller.route.routes[caller.route.activeRoute].geometry.coordinates[index][0] || value[1] !== caller.route.routes[caller.route.activeRoute].geometry.coordinates[index][1] ){
			pos = caller.interactiveMap.map.transformToMapCoordinates(value.slice());
			return false;
		}
	});

	return pos;
}

Route.prototype.deleteRoute = function(){
	if(this.vectorLayerRoutePreview !== undefined){
		this.interactiveMap.map.removeLayer(this.vectorLayerRoutePreview);
		this.vectorLayerRoutePreview = undefined;
		this.geom = undefined;
	}
	if(this.informationOverlays !== undefined && this.informationOverlays.length > 0){
		var caller = this;
		$.each(this.informationOverlays, function(index, value){
			$(value).off();
			caller.interactiveMap.map.removeOverlay(value);
		});
		this.informationOverlays = [];
	}
}

/*
 * This Function does a whole lot of work for the Navigation Module
 * It'll read out the users current Position from the GpsManager 
 * Then it'll commpare that Position to every Step the user has to take on the route to reach his destination.
 * The first Step that Matches the current Gps Location enough to be sure that the user is at that step will be returned.
*/
Route.prototype.calcPointOnRoute = function(){
	var r = this.route.routes[this.route.activeRoute];
    var wgs84Sphere = new ol.Sphere(6378137);
    // Wir Ziehen einen Punkt auf den nächsten 4 Schritten in betracht
    // Wenn der Punkt dort nicht zu finden ist, müssen wir neu berechnen
    var stepCounter = 1;
    var result = null;
    var gpsPoint = this.interactiveMap.GpsManager.location;
    var accuracy = this.interactiveMap.GpsManager.accuracy;
    $.each(r.legs, $.proxy(function(legIndex, leg) {
        if (stepCounter >= 5) {
            return;
        }
        $.each(leg.steps, $.proxy(function(stepIndex, step) {
            var stepGeom = (new ol.format.GeoJSON()).readGeometry(step.geometry, {
                'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
            var pointOnStep = stepGeom.getClosestPoint(this.interactiveMap.map.transformToMapCoordinates(gpsPoint));
            // We need to calculate the distance between the GPS-Point and the Point on the Route:
            var c1 = gpsPoint;
            var c2 = ol.proj.transform(pointOnStep, 'EPSG:3857', 'EPSG:4326');
            var distance = wgs84Sphere.haversineDistance(c1, c2);
            if (distance > Math.max(accuracy, 30)) {
                // The Distance of the Point is too high to be on this route step
                stepCounter++;
                return;
            } else {
                // The Point is on this Route Step
                if(result == null || (result != null && result.distance > distance)){
                    result = {
                        legIndex: legIndex,
                        stepIndex: stepIndex,
                        point: pointOnStep,
                        distance: distance
                    };
                }

                // We need to know the distance to the end of the step to decide whether we check the next step, too
                var d = wgs84Sphere.haversineDistance(c1, r.legs[legIndex].steps[stepIndex].geometry.coordinates[r.legs[legIndex].steps[stepIndex].geometry.coordinates.length-1]);
                // It could possibly be at the end of this step in that case we will see if we can go on to the next step
                if (d < Math.max(accuracy, 30)) {
                    stepCounter++;
                    return;
                } else {
                    // Otherwise we take that point and return
                    stepCounter = 5;
                    return false;
                }
            }
            stepCounter++;
        }, this));
    }, this));
    return result;
}

Route.prototype.removeLeg = function(){
	// Remove The first Leg of the route
	if(this.legs.length <= 0) return;
	this.legs.shift();
	var route = this.route.routes[this.route.activeRoute];
	while(route.legs[0].stepslength > 0){
		this.shiftStep();
	}
	route.legs.shift();
	this.route.waypoints.shift();
	// The first Waypoint of this route is probably the user Location that gets updated
	// so if there is more then one waypoint left AND the dirst waypoint has a GpsManager as data object.
	// Then we'll remove the second Waypoint to keep the GPS one
	if(this.waypoints.length > 1 && GpsManager.prototype.isPrototypeOf(this.waypoints[0].data)){
		// We need to remove The Waypoint from the Interface if it's there
		this.interactiveMap.map.removeOverlay(this.waypoints[1].marker);
		this.waypoints.splice(1,1);
	}else{
		this.interactiveMap.map.removeOverlay(this.waypoints[0].marker);
		this.waypoints.shift();
	}
}

Route.prototype.shiftStep = function(){
	// This function shifts the first step of this route and edits all necessary parameters
	if(this.legs.length == 0) return;
	this.legs[0].steps.shift();

	var route = this.route.routes[this.route.activeRoute];
	var leg = this.route.routes[this.route.activeRoute].legs[0];
	if(leg.steps.length == 0) return;

	var step = leg.steps.shift();

	// Calculate how many of the annotations need to get removed
	// A step can have multiple Lines. The length of the Waypoints of this step -1 is how many annotations need to get removed
	var count = step.geometry.coordinates.length - 1;
	while(count != 0){
		// We need to remove this step from the json
		var distance = leg.annotation.distance.shift();
		var duration = leg.annotation.duration.shift();
		leg.annotation.datasources.shift();
		leg.annotation.nodes.shift();
		leg.distance -= distance; route.distance -= distance;
		leg.duration -= duration; route.duration -= duration;
		var coordinate = route.geometry.coordinates.shift();
		this.drivenRoute.coordinates.push(coordinate);
		count--;
	}
	console.log(this);
}

Route.prototype.shiftStepStep = function(){
	// This Function will remove only the First Coordinate from the current step if there is a minimum of 3 left
	var route = this.route.routes[this.route.activeRoute];
	var leg = this.route.routes[this.route.activeRoute].legs[0];
	var step = leg.steps[0];
	if(step.geometry.coordinates.length > 2){
		// Update the step itself
		step.geometry.coordinates.shift();
		// Update the Corresponding leg
		var distance = leg.annotation.distance.shift();
		var duration = leg.annotation.duration.shift();
		leg.annotation.datasources.shift();
		leg.annotation.nodes.shift();
		leg.distance -= distance; route.distance -= distance;
		leg.duration -= duration; route.duration -= duration;
		// This will be approximate but since the step will be deleted when passed, it doesn't matter
		step.distance -= distance;
		step.duration -= duration;
		var coordinate = route.geometry.coordinates.shift();
		this.drivenRoute.coordinates.push(coordinate);
	}
	console.log(step);

}

Route.prototype.getFirstPoint = function(){
	var point = this.route.routes[this.route.activeRoute].legs[0].steps[0].geometry.coordinates[0];
	return point;
}

Route.prototype.getNextPoint = function(){
	var point = this.route.routes[this.route.activeRoute].legs[0].steps[0].geometry.coordinates[1];
	return point;
}

Route.prototype.exit = function(){
	this.deleteRoute();
	// Remove the change Listener
	$("#route-finder-addon #vehicle-chooser input").off();
}