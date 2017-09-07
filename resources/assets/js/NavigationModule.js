function NavigationModule(interactiveMap, route){
	this.interactiveMap = interactiveMap;
	this.route = route;
	this.vectorS = new ol.source.Vector();
	this.vectorLayerRoutePreview = new ol.layer.Vector({
        source: this.vectorS
    });
    $("#navigation .leg-finish").hide('', function(){
    	$(this).css("visibility", "visible");
    });
    this.running = false;
    this.interactiveMap.map.addLayer(this.vectorLayerRoutePreview);
	// Initialize empty driven Route ( With First Point already added)
    this.route.drivenRoute = {
        coordinates: [this.route.getFirstPoint()],
        type: "LineString"
    };
	this.prepareInterface();
	// Disable the Display Timeout
	if(typeof android !== "undefined"){
        android.disableDisplayTimeout();
        android.showToast("Bildschirm Timeout abgeschaltet.");
    }
    this.printRoute();

    this.currentPosition = null;
	this.calculating = false;

	this.lastUpdate = null;
	this.frequency = 3000;   // Frequency in ms in which the Route-Assistent should Update itself

	this.addListeners();

    this.startLocationFollowing();
}

NavigationModule.prototype.prepareInterface = function(){
	// Disable The Zoom Bar. We won't need it now
	$(".ol-zoom, .ol-zoomslider").hide();
	// Disable The Location tool it'll be active anyways
	this.interactiveMap.GpsManager.toggleGpsLocator(false);
	// Hide the Attribution and the Scale line
	$("#map .ol-scale-line, #map .ol-attribution").hide();
	// Show the Navigation Interface
	$("#navigation").show('slow');
	// Fill the Information with the current Step
	this.updateCurrentStep();
	this.updateRouteStats();
}

NavigationModule.prototype.addListeners = function(){
	// Listener for the exit navigation Button 
	$("#navigation .leg-finish .options .abort, #navigation #general-information .exit").click($.proxy(function(event){
		this.cancelNavigation();
	}, this));
	// Listener for the continue navigation Button
	$("#navigation .leg-finish .options .continue").click($.proxy(function(event){
		$("#navigation .leg-finish").hide('slow');
		this.startLocationFollowing();
	}, this));
}

NavigationModule.prototype.removeListeners = function(){
	$("#navigation .leg-finish .options .abort, #navigation #general-information .exit").off();
	$("#navigation .leg-finish .options .continue").off();
}

NavigationModule.prototype.cancelNavigation = function(){
	// We need to decide what screen the user should see next when exiting
	
	if(this.route.route.waypoints.length > 1){
		// If we have multiple (more than one) Waypoints left
		// The user should see the Route for the Remaining Waypoints
		// we guess that the user has already taken at least part of the route
		// so we have to dismiss the first waypoint and exchange it for the gps position of the user
		var waypoints = [];
		$.each(this.route.route.waypoints, $.proxy(function(index, value){
			if(index == 0){
				waypoints.push(["gps"]);
			}else{
				waypoints.push(value.location);
			}
		}, this));
		var vehicle = this.route.vehicle;
		this.interactiveMap.switchModule("route-finding", {waypoints: waypoints, vehicle: vehicle});
	}else if(this.route.route.waypoints.length == 1){
		// There is only one Waypoint Left that will be the desired destination for the user
		// Let's just open the Search Module
		this.interactiveMap.switchModule("search");
	}
}

NavigationModule.prototype.updateCurrentStep = function(distTraveled){
	var traveled = 0;
	if(typeof distTraveled != "undefined")
		traveled = distTraveled;

	// The data structur of osrm is a little absurd here
	// Every step has the manuever of the next step saved
	// That's why we get the correct distance from it
	// But the whole Manuever is wrong because it's the manuever of the start of the step
	// That's why we have to fetch the distance of the current step but the manuever of the next step if possible
	var step = this.route.legs[0].steps[0];
	var distance = step.getDistance() - traveled;
	distance = Math.max(distance, 0);
	var distanceString = step.distanceString(distance);

	if(this.route.legs[0].steps.length >= 2){
		var otherStep = this.route.legs[0].steps[1];
		var image = otherStep.parseImg();
		var stepString = otherStep.toString();
	}else{
		var image = step.parseImg();
		var stepString = step.toString();
	}

	if(image.length > 0){
		var imageHtml = '<img src="' + image + '" alt="noimage" />';
	}else{
		var imageHtml = '';
	}

	var html = $('\
            <div class="step">\
                <div class="image">\
                    ' + imageHtml + '\
                </div>\
                <div class="step-string">\
                    ' + stepString + '\
                </div>\
                <div class="step-length">\
                    ' + distanceString + '\
                </div>\
            </div>');

	$("#navigation #next-step").html(html);
}

NavigationModule.prototype.updateRouteStats = function(distTraveled, durTraveled){
	var dist = 0;
	var dur = 0;
	if(typeof distTraveled == "number")
		dist = distTraveled
	if(typeof durTraveled == "number")
		dur = durTraveled;
	// We will update the displayed information abut route length/duration etc.
	var duration = this.route.legs[0].json.duration -dur;
	var durationString = this.durationString(duration);
	$("#navigation #general-information .duration").html(durationString);

	var distance = this.route.legs[0].json.distance - dist;
	var distanceString = this.distanceString(distance);
	$("#navigation #general-information .length").html(distanceString);

	var timeArival = new Date(new Date().getTime() + duration * 1000);
	$("#navigation #general-information .time").html(timeArival.getHours() + ":" + timeArival.getMinutes());
}

NavigationModule.prototype.distanceString = function(length){
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

NavigationModule.prototype.finishLeg = function(){
	this.running = false;
	this.route.removeLeg();
	this.normalizeView(); // Puts the rotation back to 0
	// In every case will we stop Watching the Position for now
	// Fill the Finish Screen with information
	var target = this.route.route.waypoints[0].name;
	targetText = "Sie haben Ihr Ziel<br>\"" + target + "\"<br>erreicht!";
	$("#navigation .leg-finish > .container > .text").html(targetText);

	var startTime = '<span class="glyphicon glyphicon-time"></span> ' + this.startTime.getHours() + ":" + this.startTime.getMinutes();
	$("#navigation .leg-finish .start-time .time").html(startTime);

	var arivalTime = new Date();
	var arivalTimeString = '<span class="glyphicon glyphicon-time"></span> ' + arivalTime.getHours() + ":" + arivalTime.getMinutes();
	$("#navigation .leg-finish .arrival-time .time").html(startTime);

	// Last but not Least the Duration and the originally estimated duration
	var duration = arivalTime.getTime() - this.startTime.getTime(); // Milliseconds
	duration /= 1000;
	duration = Math.round(duration);
	var durationString = this.durationString(duration);

	var estimatedDuration = this.estimatedArival.getTime() - this.startTime.getTime();
	estimatedDuration /= 1000;
	estimatedDuration = Math.round(estimatedDuration);
	var difference = duration - estimatedDuration;
	var estimatedDurationString = this.durationString(difference);
	if(difference >= 60 ){
		// The User took more time than thought
		estimatedDurationString = '<span class="plus"> (+ ' + estimatedDurationString + ' langsamer als erwartet)</span>';
	}else if(difference < -60){
		// The User was faster than thought
		estimatedDurationString = '<span class="minus"> ( ' + estimatedDurationString + ' schneller als erwartet)</span>';
	}else{
		// The User matched the time exact
		estimatedDurationString = '<span class="minus"> (pünktlich)</span>';
	}
	estimatedDurationString = '<span class="glyphicon glyphicon-time"></span> '+ durationString + estimatedDurationString;
	$("#navigation .leg-finish .duration .time").html(estimatedDurationString);

	if(this.route.legs.length <= 0){
		// There is no waypoint left hide the button to continue
		$("#navigation .leg-finish .options > .continue").hide();
	}else{
		// There is another Leg to continue show the button to continue
		$("#navigation .leg-finish .options > .continue").show();
	}
	// Show the finish Screen
	$("#navigation .leg-finish").show('slow');
}

NavigationModule.prototype.durationString = function(duration){
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

NavigationModule.prototype.startLocationFollowing = function() {
	if (this.followingId == null) {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3000
        };
        this.running = true;

        // Set starting informations
        this.startTime = new Date();
        var duration = this.route.legs[0].json.duration;
        this.estimatedArival = new Date(new Date().getTime() + duration * 1000);
        this.interactiveMap.GpsManager.watchPosition($.proxy(this.newPosition, this));
    }
}

NavigationModule.prototype.newPosition = function(position) {
    // We will define an update Interval manually since the maximumAge Paramter doesn't seem to work
    if(this.lastUpdate !== null && (Date.now()-this.lastUpdate) < this.frequency){
        return;
    }
    if(!this.running){
    	// We should not come to this case again because the watch should've been cleared
    	// Let's clear it again
    	this.interactiveMap.GpsManager.stopWatch();
    	this.vectorS.clear();
        this.removeWaypoints();
        this.removeUserPosition();
    	return;
    } 
    this.lastUpdate = Date.now();
    var timestamp = Math.floor(position.timestamp / 1000);
    var lon = parseFloat(position.coords.longitude);
    var lat = parseFloat(position.coords.latitude);
    var accuracy = parseFloat(position.coords.accuracy);
    // We have to decide whether we will retrieve two exact Routes (driven and upcoming)
    // or whether we want to derive a new User Position on the Route of the new GPS Location
    // The latter one would use some mobile Data to make a new HTTP Request
    // The first one could save that data taking the risk that the user could've left the route
    // We calculate the risk in the following way:
    // We derive the perpendicular distance of the GPS Coordinate to the current Route Step (straight line)
    // We get a possible Position of the User on the Route. There could be some possible situations the user is in:
    // 1. The distance of the Point to the Route is higher than the GPS accuracy
    //  => The user has left the route and we need to recalculate
    // 2. The point is beyond the Point where the next step would begin
    //  => The user either has left the route or passed the next waypoint and we need to recalculate
    // 3. The distance of the Point to the Route is less or equal the gps Accuracy AND the Point on the route is before the next waypoitn
    //  => The user is on the route and hasn't passed the next waypoint so no recalculation is needed
    // First thing we do is to check whether the point is the beginning or ending of the Line
    // In that case we would have to recalculate anyways because of 2.
    // 3. is standard and we check for recalc
    var recalc = false;
    var pointOnRoute = this.route.calcPointOnRoute();
    if (pointOnRoute !== null) {
    	// If the user wasn't on the route for a period of time we could've started a Request for a new route
    	// Since we're back on the Route we can simply abort that request 
    	if(this.routeRequest != undefined){
    		this.routeRequest.abort();
    		this.routeRequest = undefined;
    	}
    	if($("#navigation #next-step").css("background-color") != "#ff8000"){
    		$("#navigation #next-step").css("background-color", "#ff8000");
    	}
        // If Leg Index or stepIndex is not 0 Then we need to change the Route Object
        var i = pointOnRoute.legIndex;
        while (i > 0) {
            this.finishLeg();
            return;
        }
        i = pointOnRoute.stepIndex;
        while (i > 0) {
            this.route.shiftStep();
            i--;
        }
        //this.route.printRoute();
        
        // Now we for sure have the current step at position 0
        // Every step has a geometry Object describing the line we need to take.
        // If we can find out at which point of that line we are we can adjust the bearing of the map to
        // follow the bearing of the User
        // In Addition we can then adjust the distance and duration to be at the current state
        // Tolerance how much the bearings may differ to be the same
        var tolerance = 0.03;
        var bearingGps = this.getBearing(this.interactiveMap.map.transformToWorldCoordinates(pointOnRoute.point), this.route.getNextPoint());
        var bearingRoute = this.getBearing(this.route.getFirstPoint(), this.route.getNextPoint());
        while ((bearingGps < (bearingRoute - tolerance) || (bearingRoute + tolerance) < bearingGps) && this.route.route.routes[this.route.route.activeRoute].legs[0].steps[0].geometry.coordinates.length > 2) {
            // The Bearings differ too much
            // Seems like we passed another Point
            // Delete it from route and add it to drivenRoute
            this.route.shiftStepStep();       
            bearingGps = this.getBearing(this.interactiveMap.map.transformToWorldCoordinates(pointOnRoute.point), this.route.getNextPoint());
            bearingRoute = this.getBearing(this.route.getFirstPoint(), this.route.getNextPoint());
        }

        // Calculate the distance we traveled on this step to give even more accurate Updates
        var distTraveled = this.getDistance(this.interactiveMap.map.transformToWorldCoordinates(pointOnRoute.point), this.route.getFirstPoint());
        if((this.route.route.routes[this.route.route.activeRoute].legs[0].distance - distTraveled - accuracy) <= 0){
            this.finishLeg();
            return;
        }

        var durTraveled = 0;
        if(this.route.route.routes[this.route.route.activeRoute].legs[0].distance !== 0){
            durTraveled = (this.route.route.routes[this.route.route.activeRoute].legs[0].duration / this.route.route.routes[this.route.route.activeRoute].legs[0].distance) * distTraveled;
        }
        // Update the Frequency when we are calculating the next Map Update
        this.frequency = this.calcFrequency(durTraveled);
        // We check for finish here too
        this.updateCurrentStep(distTraveled);
        this.updateRouteStats(distTraveled, durTraveled);
        this.printRoute(pointOnRoute.point);
        this.updateView(pointOnRoute.point, bearingGps);
        //updateNextStep(pointOnRoute.point, bearingGps, distTraveled, durTraveled);
        //redrawRoute(pointOnRoute.point);
    } else {
        // We need to recalculate but the user might have 
        // either a good internet connection, or no/a bad one
        // We need to do the right thing for each case to not confuse the user
        // We will start calculating a new Route now but will continue to accept new positions
        // If the user gets back on the correct route we will abort the retrieval of the new route and continue the navigation
        // If the new route gets downloaded we will replace it with the old one
        // If the download aborts with an error or with an timeout (10s) we will retry the download until success

        var pos = position.coords;
        pos = [parseFloat(pos.longitude), parseFloat(pos.latitude)];
        var pointString = "";
        $.each(this.route.route.waypoints, function(index, value) {
            if (index === 0) {
                // The first waypoint always is the gpsLocation
                pointString += pos.toString() + ";";
            } else {
                pointString += value.location.toString() + ";";
            }
        });
        pointString = pointString.replace(/;$/, '');

        var url = '/route/find/' + this.route.vehicle + '/' + pointString;

        // Let's check if we can submit a bearing for the starting point to generate a better route
        if(this.route.drivenRoute.coordinates.length >= 2){
            // We can calculate the current bearing. Let's do so:
            var bearing = this.getBearing(this.route.drivenRoute.coordinates[0], pos);
            bearing = Math.round(bearing);
            url += "/" + bearing;
        }

        // Change the Heading so that the user knows we're recalculating
        $("#navigation #next-step .image").html("");
        var message = '<img src="/img/ajax-loader.gif"></img> Neuberechnung...';
        if(this.routeLoadingerror != undefined && this.routeLoadingerror == true){
        	// We tried loading a new Route but it didn't succeed. We will inform the user about that fact
        	message += ' (<span class="glyphicon glyphicon-warning-sign" style="color:red;"></span> Netzwerkprobleme)';
        }
        $("#navigation #next-step .step-string").html(message);
        $("#navigation #next-step .step-length").html("");
        $("#navigation #next-step").css("background-color", "rgb(154,154,154)");
        // Also we will Update the User Position to the GPS Point and if available update the Bearing of the Map
        // That way the user will of course recognize that he is heading to the wrong direction
        this.updateUserPosition(this.interactiveMap.map.transformToMapCoordinates(pos));
        // We might have a Bearing based on the last two Position Updates in that case we will rotate the map
        if(this.interactiveMap.GpsManager.bearing != null){
        	this.updateMapView(this.interactiveMap.map.transformToMapCoordinates(pos), this.interactiveMap.GpsManager.bearing);
        }

        this.loadNewRoute(url, position);
    }
}

/*
* This function will try to retrieve a new Route
* Mostly this happens when the user has left the calculated Route
* This function won't load two new routes at the same time
* It'll try to download with a timeout of 10 seconds, after that the next Position update will trigger a new download 
* until one of it suceeds
*/
NavigationModule.prototype.loadNewRoute = function(url, position){

	if(this.routeRequest == undefined){
		var timeout = 10; // 10 seconds Timeout for this request
		$.ajax({
			url: url,
			dataType: 'json',
			success: $.proxy(function(response){
				this.routeLoadingerror = undefined;
				this.route.route = response;
				this.route.route.activeRoute = 0;
				this.route.legs = this.route.extractLegs();
				this.route.drivenRoute = {
			        coordinates: [this.route.getFirstPoint()],
			        type: "LineString"
			    };
				$("#navigation #next-step").css("background-color", "#ff8000");
	        	this.updateRouteStats();
	        	this.updateCurrentStep();
	        	// Update initially so that the new route is shown
	        	// Be safe and reset the last update time so it'll update now for sure
	        	this.lastUpdate = Date.now() - this.frequency - 1;
	        	this.newPosition(position);
				}, this),
			timeout: (timeout*1000),
			error: $.proxy(function(){
				this.routeLoadingerror = true;
			}, this)
		}).always($.proxy(function(){
			this.routeRequest = undefined;
		}, this));
	}
}


/*
* This Function updates the view of the map so that:
* 1. The given Point (in Map Coordinates) is in the center
* 2. The given Bearing is set
* The new rotation animation will take the shortest direction
*/
NavigationModule.prototype.updateMapView = function(point, bearing){
	// Point is given in Map Coordinates
	var rotation = bearing;
    rotation = 360 - rotation;
    // The Value needs to be in Radians
    rotation *= Math.PI;
    rotation /= 180;

    var fullRotation = 2 * Math.PI;
    var halfRotation = Math.PI;
    var a = rotation - this.interactiveMap.map.getView().getRotation() + halfRotation;
    var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
    var targetRotation = this.interactiveMap.map.getView().getRotation() + mod;
    this.interactiveMap.map.getView().animate({rotation: targetRotation, duration: 200}, $.proxy(function(){
        setTimeout($.proxy(function(){
            this.interactiveMap.map.getView().setRotation(((2* Math.PI) + (this.interactiveMap.map.getView().getRotation() % (2*Math.PI))) % (2 * Math.PI));
            var paddingTop = $("#navigation #next-step").outerHeight() + 50;
            var paddingBottom = $("#navigation #general-information").outerHeight() + 50;
            this.interactiveMap.map.getView().animate({center: point, duration: 600, padding: [paddingTop, 0, paddingBottom, 0]});
        }, this), 200);

    }, this));
}

NavigationModule.prototype.isBetween = function(point, p1, p2){
	// To determine if a point is on a route we compare min and max lat/lon values with the point
	var minLon = Math.min(p1[0], p2[0]);
	var maxLon = Math.max(p1[0], p2[0]);
	var minLat = Math.min(p1[1], p2[1]);
	var maxLat = Math.max(p1[1], p2[1]);

	if(point[0] >= minLon && point[0] <= maxLon && point[1] >= minLat && point[1] <= maxLat){
		return true;
	}else{
		return false;
	}
}

NavigationModule.prototype.updateView = function(point, bearing){
	// Point is given in Map Coordinates
	var rotation = bearing;
    rotation = 360 - rotation;
    // The Value needs to be in Radians
    rotation *= Math.PI;
    rotation /= 180;

    var limit = 3000; // How many meters are displayed at max
    var route = this.route.route.routes[this.route.route.activeRoute];
    var geojson = route.legs[0].steps[0].geometry;
    // Check whether the step is longer
	if(route.legs[0].steps[0].distance > limit){
	    // Darn we need to remove some of the step-points 
	    // Let's find out at which point we exceed the limit
	    var tmpDistance = 0;
	    var lastIndex = 1;
	    $.each(route.legs[0].annotation.distance, function(index, value){
	        if( (tmpDistance + value) < limit){
	            tmpDistance += value;
	        }else{
	            lastIndex = (index + 1);
	            return false;
	        }
	    });
	    geojson = {
	        coordinates : geojson.coordinates.slice(0,lastIndex),
	        type: "LineString"
	    }
	}
    var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
        'dataProjection' : 'EPSG:4326',
        'featureProjection' : 'EPSG:3857'
    });
    var fullRotation = 2 * Math.PI;
    var halfRotation = Math.PI;
    var a = rotation - this.interactiveMap.map.getView().getRotation() + halfRotation;
    var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
    var targetRotation = this.interactiveMap.map.getView().getRotation() + mod;
    this.interactiveMap.map.getView().animate({rotation: targetRotation, duration: 200}, $.proxy(function(){
        setTimeout($.proxy(function(){
            this.interactiveMap.map.getView().setRotation(((2* Math.PI) + (this.interactiveMap.map.getView().getRotation() % (2*Math.PI))) % (2 * Math.PI));
            var paddingTop = $("#navigation #next-step").outerHeight() + 50;
            var paddingBottom = $("#navigation #general-information").outerHeight() + 50;
            this.interactiveMap.map.getView().fit(geom, {duration: 600, padding: [paddingTop, 0, paddingBottom, 0]});
        }, this), 200);

    }, this));
}

/*
* This Function sets the rotation of the Map back to 0 with an animation
* It'll calculate the shortest rotation direction to do so.
*/
NavigationModule.prototype.normalizeView = function(){
	var fullRotation = 2 * Math.PI;
    var halfRotation = Math.PI;
    var a = 0 - this.interactiveMap.map.getView().getRotation() + halfRotation;
    var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
    var targetRotation = this.interactiveMap.map.getView().getRotation() + mod;
	this.interactiveMap.map.getView().animate({rotation: targetRotation, duration: 200}, $.proxy(function(){
	    setTimeout($.proxy(function(){
	            this.interactiveMap.map.getView().setRotation(((2* Math.PI) + (this.interactiveMap.map.getView().getRotation() % (2*Math.PI))) % (2 * Math.PI));
	    }, this), 200);
	}, this));
}

NavigationModule.prototype.printRoute = function(point){

	if(typeof this.vectorS != "undefined")
		this.vectorS.clear();
    
    
    // Geometry of the active route
    var  geojson = this.route.route.routes[this.route.route.activeRoute].geometry;
    var geojsonDriven = this.route.drivenRoute;
    if(typeof point != "undefined"){
	    var coordinates = geojson.coordinates.slice();

	    // We'll Add the user Position and the first Point of the current step to the driven Route
	    var coordinatesDrive = geojsonDriven.coordinates.slice();
	    coordinatesDrive.push(coordinates[0].slice());
	    coordinatesDrive.push(this.interactiveMap.map.transformToWorldCoordinates(point));
	    geojsonDriven.coordinates = coordinatesDrive;

	    coordinates[0] = this.interactiveMap.map.transformToWorldCoordinates(point);
	    geojson.coordinates = coordinates;

	}
	this.geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
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
    this.vectorS.addFeature(feature);

    if(geojsonDriven.coordinates.length > 1){
    	// Add the driven route, too
    	var geomDriven = (new ol.format.GeoJSON()).readGeometry(geojsonDriven, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
		var routeLineStyleDriven = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(199,199,199)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(199,199,199,.03)'
	        })
	    });
	    var featureDriven = new ol.Feature({
	    	'geometry': geomDriven
	    });
	    featureDriven.setStyle(routeLineStyleDriven);
	    this.vectorS.addFeature(featureDriven);
    }

    this.updateUserPosition(point);

    // Add the Waypoints (except the first one)
    if(typeof this.waypointsAdded == "undefined"){
    	$.each(this.route.waypoints, $.proxy(function(index, value){
    		if(index == 0) return 1;
    		this.interactiveMap.map.addOverlay(value.marker);
    	}, this));
    	this.waypointsAdded = true;
    }
}

NavigationModule.prototype.updateUserPosition = function(point){
	// Add the User Position
    if(typeof this.userPosOverlay == "undefined" || this.userPosOverlay == null){
        var el = $('<img src="/img/navigation-arrow.svg" width="30px" />');
        this.userPosOverlay = new ol.Overlay({
            position: point,
            element: el.get(0),
            offset: [-15, -15],
            stopEvent: false,
        });
        this.interactiveMap.map.addOverlay(this.userPosOverlay);
    }else{
    	// The User Position Overlay already exist lets update the position
    	this.userPosOverlay.setPosition(point);
    }
}

NavigationModule.prototype.calcFrequency= function(durTraveled){
    // We decide in which Frequency we gonna update the Map.
    // It depends of the duration the current step will take to Finish:
    // 1s   =>  The Last 15 Seconds of a step will be updated the most frequent
    // 2s   =>  Between 15-19 Seconds
    // 3s   =>  Between 19 and 24 Seconds
    // 4s   =>  Between 24 and 30 Seconds
    // 5s   =>  > 30 Seconds
    var route = this.route.route.routes[this.route.route.activeRoute];
    var duration = route.legs[0].steps[0].duration;
    duration -= durTraveled;
    if(duration < 15){
        return 1000;
    }else if(duration < 19){
        return 2000;
    }else if(duration < 24){
        return 3000;
    }else if(duration < 30){
        return 4000;
    }else{
        return 5000;
    }
}

NavigationModule.prototype.getBearing = function(p1, p2){
	// Takes to Points in World Coordinates and calculates the Bearing of the connection Line
    var p1r = [this.toRadians(p1[0]), this.toRadians(p1[1])];
    var p2r = [this.toRadians(p2[0]), this.toRadians(p2[1])];
    var x = Math.cos(p2r[1]) * Math.sin(p2r[0] - p1r[0]);
    var y = Math.cos(p1r[1]) * Math.sin(p2r[1]) - Math.sin(p1r[1]) * Math.cos(p2r[1]) * Math.cos(p2r[0] - p1r[0]);
    var bearing = Math.atan2(x, y);
    bearing = this.toDegrees(bearing);
    if(bearing < 0){
        bearing += 360;
    }
    return bearing;
}

NavigationModule.prototype.toRadians = function(angle) {
    return angle * (Math.PI / 180);
}

NavigationModule.prototype.toDegrees = function(radians) {
    return radians * 180 / Math.PI;
}

NavigationModule.prototype.getDistance = function(p1, p2){
	var wgs84Sphere = new ol.Sphere(6378137);
    return wgs84Sphere.haversineDistance(p1, p2);
}

NavigationModule.prototype.removeWaypoints = function(){
	if(typeof this.waypointsAdded != "undefined"){
    	$.each(this.route.waypoints, $.proxy(function(index, value){
    		if(index == 0) return 1;
    		this.interactiveMap.map.removeOverlay(value.marker);
    	}, this));
    	this.waypointsAdded = undefined;
    }
}

NavigationModule.prototype.removeUserPosition = function(){
	if(typeof this.userPosOverlay != "undefined"){
		this.interactiveMap.map.removeOverlay(this.userPosOverlay);
	}
}

NavigationModule.prototype.exit = function(){
	// If we're currently following the Location we need to disable that
	this.interactiveMap.GpsManager.stopWatch();
	// Hide the finish screen if visible
	$("#navigation .leg-finish").hide('slow');
	this.removeListeners();
	this.normalizeView();
	this.interactiveMap.map.removeLayer(this.vectorLayerRoutePreview);
	// Remove the Waypoints
    this.removeWaypoints();
    // Remove the User Position
    this.removeUserPosition();
    
	$(".ol-zoom, .ol-zoomslider").show();
	this.interactiveMap.GpsManager.toggleGpsLocator(true);
	$("#map .ol-scale-line, #map .ol-attribution").show();
	$("#navigation").hide('slow');
	$("#navigation #next-step").html("");
}