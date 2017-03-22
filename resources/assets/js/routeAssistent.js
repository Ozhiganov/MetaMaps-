var followingId = null;
var positions = [];
var routeAssistentVectorSource = new ol.source.Vector();
var waypoints = [];
var drivenRoute = null;
var userPosOverlay = null;
var currentGeometry = null;
var durations = null;
var distances = null;
var distanceToNextPoint = null;

function startAssistent() {
    if (gps && points.match(/^gps;/) !== null) {
        var text = "Bitte beachten Sie auf Ihrem Weg stets die geltenden Verkehrsregeln und fahren nur so, wie es die aktuelle Verkehrssituation zulässt.";
        map.un("moveend", updateUrl)
        if(typeof android === "undefined"){
            alert(text);
        }else{
            android.showToast(text);
        }
        positions = [];
        initWaypoints();
        prepareInterface();
        initAssistentGraphics();
        drivenRoute = {
            coordinates: [gpsLocation],
            type: "LineString"
        };
        startLocationFollowing();
        $(".ol-abort").click(function() {
            deinitAssistent();
        });
    }
}

function initWaypoints() {
    var result = points.split(';');
    $.each(result, function(index, value) {
        if (value === 'gps') {
            waypoints.push('gps');
        } else {
            waypoints.push({
                hint: '',
                lon: parseFloat(value.split(',')[0]),
                lat: parseFloat(value.split(',')[1])
            });
        }
    });
}

function initAssistentGraphics() {
    // We need to disable the display timeout to prevent the telephone screen from locking
    // While Navigating
    // We only can do this, if we are within the Android App
    // We have defined an JavaScript Interface within the App to allow this kind of Communication
    if(typeof android !== "undefined"){
        android.disableDisplayTimeout();
        android.showToast("Bildschirm Timeout abgeschaltet.");
    }
    // Set The Route Layer to the new one:
    routeLayer.setSource(routeAssistentVectorSource);
    // Remove the first Map Marker (The User Position is gonna replace it)
    map.removeOverlay(routeMarkers[0]);
    routeMarkers.splice(0,1);
}

function prepareInterface() {
    // Change Navigation-Bar to make it show the next Steps
    // Hide Navigation Bar
    $("figure#search-addon").html("");
    $("figure#search-addon").css("width", "100%");
    $("figure#search-addon").css("margin", "0");
    $("figure#search-addon").css("background-color", "white");
    // Create the Layout for the next Step:
    var nextStep = $('\
        <div id="route-content">\
            <div id="route-information" class="row">\
                <div id="length" class="col-xs-6"></div>\
                <div id="duration" class="col-xs-6"></div>\
            </div>\
            <table id="routing-steps" class="table">\
                <tbody>\
                    <tr class="step">\
                        <td class="step-image"><img height="35px" src=""></td>\
                        <td class="step-string"></td>\
                        <td class="step-length"></td>\
                    </tr>\
                </tbody>\
            </table>\
        </div>\
  ');
    $("figure#search-addon").html(nextStep);
    var dialog = $('\
        <div id="continue-dialog" class="container-fluid hidden">\
            <div class="row heading">Sie haben ihr Zwischenziel erreicht.</div>\
            <div class="row options">\
                <div id="next-waypoint" class="col-xs-6 first"><a href="#">Weiter zum nächsten Wegpunkt</a></div>\
                <div id="new-route" class="col-xs-6 first hidden"><a href="#">Neues Ziel eingeben</a></div>\
                <div id="abort-routing" class="col-xs-6"><a href="#">Fertig</a></div>\
            </div>\
        </div>\
    ');
    $("main").append(dialog);
    // Remove Zoom Bar
    $(".ol-zoom, .ol-zoomslider, #location-tool").addClass("hidden");
    var abort = $('\
        <span class="glyphicon glyphicon-remove"></span>\
        ');
    $(".ol-attribution").html("");
    $(".ol-attribution").addClass("ol-abort");
    $(".ol-attribution").removeClass("ol-attribution");
    $(".ol-abort").html(abort);
    //Update Map Size
}

function deinitAssistent() {

    if(typeof android !== "undefined"){
        android.enableDisplayTimeout();
        android.showToast("Bildschirm Timeout eingeschaltet.");
    }

    if (followingId !== null) {
        navigator.geolocation.clearWatch(followingId);
        followingId = null;
    }
    if(route.waypoints.length === 0){
        // If just one waypoint is left then we finished the route and we redirect to the startpage
        window.location.href = "/";
    } else if (route.waypoints.length === 1) {
        var pos = route.waypoints[0].location;
        // Transform Position
        pos = ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857');
        var url = "/map/" + pos.toString() + ",18";
        window.location.href = url;
    }else {
        // We redirect to the route Overview at the current state
        var pointString = "";
        $.each(route.waypoints, function(index, value) {
            if (index === 0) {
                // The first Index always is the GPS Location
                pointString += "gps;";
            } else {
                pointString += value.location.toString() + ";";
            }
        });
        pointString = pointString.replace(/;$/, '');
        var url = "/route/" + vehicle + "/" + pointString;
        window.location.href = url;
    }
}
var currentPosition = null;
var calculating = false;

var lastUpdate = null;
var frequency = 3000;   // Frequency in ms in which the Route-Assistent should Update itself
function startLocationFollowing() {
    if (followingId === null) {
        if (currentPosition === null) {
            currentPosition = {
                timestamp: Math.floor(Date.now() / 1000),
                lon: gpsLocation[0],
                lat: gpsLocation[1],
                accuracy: 1.5
            };
        }
        options = {
            enableHighAccuracy: true,
            maximumAge: 3000
        };
        followingId = navigator.geolocation.watchPosition(function(position) {
            // We will define an update Interval manually since the maximumAge Paramter doesn't seem to work
            if(lastUpdate !== null && (Date.now()-lastUpdate) < frequency){
                return;
            }
            lastUpdate = Date.now();
            var timestamp = Math.floor(position.timestamp / 1000);
            var lon = parseFloat(position.coords.longitude);
            var lat = parseFloat(position.coords.latitude);
            var accuracy = parseFloat(position.coords.accuracy);
            gpsLocation = [lon, lat];
            currentPosition = {
                timestamp: Math.floor(timestamp / 1000),
                lon: lon,
                lat: lat,
                accuracy: accuracy
            };
            if(debug){
                var time = new Date();
                $("#debug-box").html(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "<br />" + currentPosition.lon + "<br />" + currentPosition.lat + "<br />" + currentPosition.accuracy);
            }
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
            var pointOnRoute = getNextPointOnRoute(ol.proj.transform([currentPosition.lon, currentPosition.lat], 'EPSG:4326', 'EPSG:3857'), currentPosition.accuracy);
            if (pointOnRoute !== null) {
                // If Leg Index or stepIndex is not 0 Then we need to change the Route Object
                var i = pointOnRoute.legIndex;
                while (i > 0) {
                    console.log("Entferne leg");
                    removeLeg();
                    i--;
                }
                i = pointOnRoute.stepIndex;
                while (i > 0) {
                    console.log("Entferne Step");
                    if(removeStep()){
                        i = 0;
                    }else{
                        i--;
                    }
                }
                // Now we for sure have the current step at position 0
                // Every step has a geometry Object describing the line we need to take.
                // If we can find out at which point of that line we are we can adjust the bearing of the map to
                // follow the bearing of the User
                // In Addition we can then adjust the distance and duration to be at the current state
                // Tolerance how much the bearings may differ to be the same
                var tolerance = 0.03;
                var bearingGps = getBearing(ol.proj.transform(pointOnRoute.point, 'EPSG:3857', 'EPSG:4326'), route.routes[0].legs[0].steps[0].geometry.coordinates[1]);
                var bearingRoute = getBearing(route.routes[0].legs[0].steps[0].geometry.coordinates[0], route.routes[0].legs[0].steps[0].geometry.coordinates[1]);
                while ((bearingGps < (bearingRoute - tolerance) || (bearingRoute + tolerance) < bearingGps) && route.routes[0].legs[0].steps[0].geometry.coordinates.length > 2) {
                    // The Bearings differ too much
                    // Seems like we passed another Point
                    // Delete it from route and add it to drivenRoute
                    var dist = route.routes[0].legs[0].annotation.distance.shift();
                    var dur = route.routes[0].legs[0].annotation.duration.shift();
                    route.routes[0].distance -= dist;
                    route.routes[0].duration -= dur;
                    route.routes[0].legs[0].distance -= dist;
                    route.routes[0].legs[0].duration -= dur;
                    route.routes[0].legs[0].steps[0].distance -= dist;
                    route.routes[0].legs[0].steps[0].duration -= dur;
                    route.routes[0].geometry.coordinates.shift();
                    var coord = route.routes[0].legs[0].steps[0].geometry.coordinates.shift();
                    drivenRoute.coordinates.push(coord);
                    bearingGps = getBearing(ol.proj.transform(pointOnRoute.point, 'EPSG:3857', 'EPSG:4326'), route.routes[0].legs[0].steps[0].geometry.coordinates[1]);
                    bearingRoute = getBearing(route.routes[0].legs[0].steps[0].geometry.coordinates[0], route.routes[0].legs[0].steps[0].geometry.coordinates[1]);
                }

                // Calculate the distance we traveled on this step to give more accurate Updates
                var distTraveled = getDistance(ol.proj.transform(pointOnRoute.point, 'EPSG:3857', 'EPSG:4326'), route.routes[0].legs[0].steps[0].geometry.coordinates[0]);
                // The distTraveled can only be as accurate as the accuracy of the gps Position so we gonna substract the accuracy from the distance just to be sure for the worst case
                distTraveled = Math.max(0, (distTraveled-currentPosition.accuracy));

                if((route.routes[0].legs[0].distance - distTraveled) <= 20){
                    removeLeg();
                    // If this was the last leg we can return at this point
                    if(typeof route.routes[0].legs[0] === "undefined"){
                        return;
                    }
                }

                var durTraveled = 0;
                if(route.routes[0].legs[0].steps[0].distance !== 0){
                    durTraveled = (route.routes[0].legs[0].steps[0].duration / route.routes[0].legs[0].steps[0].distance) * distTraveled;
                }
                // Update the Frequency when we are calculating the next Map Update
                frequency = calcFrequency(durTraveled);
                // We check for finish here too
                updateNextStep(pointOnRoute.point, bearingGps, distTraveled, durTraveled);
                redrawRoute(pointOnRoute.point);
            } else {
                // We need to recalculate
                // If we are still folling the location we stop that until we have our new route:
                if (followingId !== null) {
                    navigator.geolocation.clearWatch(followingId);
                    followingId = null;
                }
                var pos = gpsLocation;
                drivenRoute.coordinates.push(pos);
                var pointString = "";
                $.each(route.waypoints, function(index, value) {
                    if (index === 0) {
                        // The first waypoint always is the gpsLocation
                        pointString += pos.toString() + ";";
                    } else {
                        pointString += value.location.toString() + ";";
                    }
                });
                pointString = pointString.replace(/;$/, '');

                var url = '/route/find/' + vehicle + '/' + pointString;

                // Let's check if we can submit a bearing for the starting point to generate a better route
                if(drivenRoute.coordinates.length >= 2){
                    // We can calculate the current bearing. Let's do so:
                    var bearing = getBearing(drivenRoute.coordinates[drivenRoute.coordinates.length-2], drivenRoute.coordinates[drivenRoute.coordinates.length-1]);
                    bearing = Math.round(bearing);
                    url += "/" + bearing;
                }

                
                $.getJSON(url, function(response) {
                    route = response;
                    startLocationFollowing();
                });
            }
        }, function(error) {
            // Follow Location couldn't be started. Abort now
            deinitAssistent();
        }, options);
    }
}

function calcFrequency(durTraveled){
    // We decide in which Frequency we gonna update the Map.
    // It depends of the duration the current step will take to Finish:
    // 1s   =>  The Last 15 Seconds of a step will be updated the most frequent
    // 2s   =>  Between 15-19 Seconds
    // 3s   =>  Between 19 and 24 Seconds
    // 4s   =>  Between 24 and 30 Seconds
    // 5s   =>  > 30 Seconds
    var duration = route.routes[0].legs[0].steps[0].duration;
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

function removeStep() {
    // Update Route Distance
    route.routes[0].distance -= route.routes[0].legs[0].steps[0].distance;
    route.routes[0].duration -= route.routes[0].legs[0].steps[0].duration;
    route.routes[0].legs[0].distance -= route.routes[0].legs[0].steps[0].distance;
    route.routes[0].legs[0].duration -= route.routes[0].legs[0].steps[0].duration;
    if (route.routes[0].legs[0].steps[0].distance > 0) {
        route.routes[0].legs[0].annotation.distance = route.routes[0].legs[0].annotation.distance.slice(route.routes[0].legs[0].steps[0].geometry.coordinates.length - 1);
    }
    if (route.routes[0].legs[0].steps[0].duration > 0) {
        route.routes[0].legs[0].annotation.duration = route.routes[0].legs[0].annotation.duration.slice(route.routes[0].legs[0].steps[0].geometry.coordinates.length - 1);
    }
    route.routes[0].geometry.coordinates = route.routes[0].geometry.coordinates.slice(route.routes[0].legs[0].steps[0].geometry.length - 1);
    var step = route.routes[0].legs[0].steps.shift();
    while (step.geometry.coordinates.length > 0) {
        // The Last Coordinate of this step is gonna be the first coordinate of the next one
        // That's why we add until just one coordinate is left
        drivenRoute.coordinates.push(step.geometry.coordinates.shift());
    }
    // If the distance of the Leg is < 10 we remove it too
    if (route.routes[0].legs[0].distance < 10) {
        removeLeg();
        return true;
    }else{
        return false;
    }
}

function removeLeg() {
    // Update Route Distance
    route.routes[0].distance -= route.routes[0].legs[0].distance;
    route.routes[0].duration -= route.routes[0].legs[0].duration;
    route.routes[0].legs.shift();
    initFinish();
}

function initFinish() {
    cancleFollowing();
    // If a leg get's removed it means that we have passed a waypoint
    if (route.waypoints.length >= 2) {
        route.waypoints.splice(0, 1);
        waypoints.splice(1,1);
    }
    if (route.waypoints.length >= 2) {
        // We have our targeted Rotation Value
        // Problem is, that we need to rotate the map in the shortest way. (Turn Right or Left)
        // We can calculate that if we calculate the delta angle of the shortest Way:
        // (targetAngle - sourceAngle + 180) % 360 - 180
        // The result is gonna be positive or negative so we are gonna add that value to our current angle
        var fullRotation = 2 * Math.PI;
        var halfRotation = Math.PI;
        var a = 0 - map.getView().getRotation() + halfRotation;
        var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
        var targetRotation = map.getView().getRotation() + mod;
        map.getView().animate({
            center: ol.proj.transform(route.waypoints[0].location, 'EPSG:4326', 'EPSG:3857'),
            rotation: targetRotation,
            zoom: 18,
            duration: 2000
        }, function(){
            map.getView().setRotation(0);
        });
        // First Point is the GPS Location
        // At least 2 additional Waypoints are to go
        // So when we removed one now we aren't finished
        openNextWaypointDialog();
    } else {
        // We have a maximum of two waypoints left
        // One of these is the GPS Location so when we removed it we finished routing
        openNextWaypointDialog();
    }
}

function openNextWaypointDialog() {
    // At this point the passed waypoint already got removed
    // We need to check whether there are more waypoints to navigate to
    // We are gonna show a slight different version in either case.
    // If there is only one Waypoint left, we're finished with the navigation
    if(route.waypoints.length <= 1){
        $("#continue-dialog > .heading").html("Sie haben Ihr Ziel erreicht!");
        $("#next-waypoint").addClass("hidden");
        $("#new-route").removeClass("hidden");
    }else{
        // Otherwise there are more waypoints to navigate to
        $("#continue-dialog > .heading").html("Sie haben Ihr Zwischenziel erreicht!");
        $("#new-route").addClass("hidden");
        $("#next-waypoint").removeClass("hidden");
    }
    $("#search-addon").addClass("hidden");
    $("#continue-dialog #next-waypoint").off();
    $("#continue-dialog #next-waypoint").click(function() {
        $("#search-addon").removeClass("hidden");
        $("#continue-dialog").addClass("hidden");
        map.removeOverlay(routeMarkers[0]);
        routeMarkers.splice(0,1);
        startLocationFollowing();
    });
    $("#continue-dialog #new-route").off();
    $("#continue-dialog #new-route").click(function(){
        document.location.href = "/route/start/" + vehicle + "/gps;";
    });
    $("#continue-dialog #abort-routing").off();
    $("#continue-dialog #abort-routing").click(function() {
        deinitAssistent();
    });
    $("#continue-dialog").removeClass("hidden");
}

function cancleFollowing() {
    if (followingId !== null) {
        navigator.geolocation.clearWatch(followingId);
        followingId = null;
    }
}

function redrawRoute(gpsLocation) {
    // Clear the shown Route
    routeAssistentVectorSource.clear();
    $.each(route.routes[0].legs, function(legIndex, leg) {
        $.each(leg.steps, function(stepIndex, step) {
            var geom = {
                coordinates: step.geometry.coordinates.slice(),
                type: step.geometry.type
            };
            if (legIndex === 0 && stepIndex === 0 && gpsLocation !== null) {
                // Beim verfolgen der Route soll der Erste Punkt IMMER die GPS Position auf der Route sein
                geom.coordinates[0] = ol.proj.transform(gpsLocation, 'EPSG:3857', 'EPSG:4326');
            }
            drawGeojson(geom, 'red');
        });
    });

    var drivenGeom = {
        coordinates: drivenRoute.coordinates.slice(),
        type: "LineString"
    };
    // Wir müssen noch einen Punkt zur gefahrenen Route temporär hinzufügen.
    // Wir wollen von dem letzten Punkt der gefahrenen Route nicht direkt zur GPS Position zeichnen.
    // Wenn sich nämlich die Richtung der Straße geändert hat, ohne dass ein Step abgeschlossen wurde,
    // fehlt uns der Erste Punkt des nächsten Steps, damit die gezeichnete Route auch wirklich stimmt.
    drivenGeom.coordinates.push(route.routes[0].legs[0].steps[0].geometry.coordinates[0]);
    if (gpsLocation !== null) {
        // Beim verfolgen der Route soll der Erste Punkt IMMER die GPS Position auf der Route sein
        drivenGeom.coordinates.push(ol.proj.transform(gpsLocation, 'EPSG:3857', 'EPSG:4326'));
    }
    drawGeojson(drivenGeom, 'grey');
}
/*
 * Calculates the bearing between two given lat/lon Points
 * @param p1 {Array} Array [lon,lat]
 * @param p2 {Array} Array [lon,lat]
 * @return bearing in degrees
 */
function getBearing(p1, p2) {
    var p1r = [toRadians(p1[0]), toRadians(p1[1])];
    var p2r = [toRadians(p2[0]), toRadians(p2[1])];
    var x = Math.cos(p2r[1]) * Math.sin(p2r[0] - p1r[0]);
    var y = Math.cos(p1r[1]) * Math.sin(p2r[1]) - Math.sin(p1r[1]) * Math.cos(p2r[1]) * Math.cos(p2r[0] - p1r[0]);
    var bearing = Math.atan2(x, y);
    bearing = toDegrees(bearing);
    if(bearing < 0){
        bearing += 360;
    }
    return bearing;
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function getDistance(p1, p2){
    var wgs84Sphere = new ol.Sphere(6378137);
    var dist = wgs84Sphere.haversineDistance(p1,p2);
    return dist;
}

function getNextPointOnRoute(gpsPoint, accuracy) {
    var r = route.routes[0];
    var wgs84Sphere = new ol.Sphere(6378137);
    // Wir Ziehen einen Punkt auf den nächsten 4 Schritten in betracht
    // Wenn der Punkt dort nicht zu finden ist, müssen wir neu berechnen
    var stepCounter = 1;
    var result = null;
    $.each(r.legs, function(legIndex, leg) {
        if (stepCounter >= 5) {
            return;
        }
        $.each(leg.steps, function(stepIndex, step) {
            var stepGeom = (new ol.format.GeoJSON()).readGeometry(step.geometry, {
                'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
            var pointOnStep = stepGeom.getClosestPoint(gpsPoint);
            // We need to calculate the distance between the GPS-Point and the Point on the Route:
            var c1 = ol.proj.transform(gpsPoint, 'EPSG:3857', 'EPSG:4326');
            var c2 = ol.proj.transform(pointOnStep, 'EPSG:3857', 'EPSG:4326');
            var distance = wgs84Sphere.haversineDistance(c1, c2);
            if (distance > Math.max(accuracy, 30)) {
                // The Distance of the Point is too high to be on this route step
                stepCounter++;
                return;
            } else {
                // The Point is on this Route Step
                if(result === null || (result !== null && result.distance > distance)){
                    result = {
                        legIndex: legIndex,
                        stepIndex: stepIndex,
                        point: pointOnStep,
                        distance: distance
                    };
                }

                // We need to know the distance to the end of the step to decide whether we check the next step, too
                var d = getDistance(c1, route.routes[0].legs[legIndex].steps[stepIndex].geometry.coordinates[route.routes[0].legs[legIndex].steps[stepIndex].geometry.coordinates.length-1]);

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
        });
    });
    return result;
}

function updateUserPosition(pos, rot) {
    if(typeof userPosOverlay === "undefined" || userPosOverlay === null){
        var el = $('<img src="/img/navigation-arrow.svg" width="30px" />');
        userPosOverlay = new ol.Overlay({
            position: pos,
            element: el.get(0),
            offset: [-15, -15],
            stopEvent: false,
        });
        map.addOverlay(userPosOverlay);
    }
    /*if (userPosOverlay !== null) {
        map.removeOverlay(userPosOverlay);
        userPosOverlay = null;
    }
    var el = $('<img src="/img/navigation-arrow.svg" width="30px" />');
    userPosOverlay = new ol.Overlay({
        position: pos,
        element: el.get(0),
        offset: [-15, -15],
        stopEvent: false,
    });
*/

    //map.getView().on("change:center", eventUserPositionUpdate);

    // We will display the Route until the next step.
    // We don't wanna hide something behind the route Text, so we calc the height of it:
    var height = $("figure#search-addon").outerHeight() + 50;
    // Get the Geom of the next Step to adjust the view
    var geojson = route.routes[0].legs[0].steps[0].geometry;



    // When we are on the highway we don't want to show the whole i.e. 80km of road until the next step
    // Let's limit this to let's say 3km?
    var limit = 3000;
    // Check whether the step is longer
    if(route.routes[0].legs[0].steps[0].distance > limit){
        // Darn we need to remove some of the step-points 
        // Let's find out at which point we exceed the limit
        var tmpDistance = 0;
        var lastIndex = 1;
        $.each(route.routes[0].legs[0].annotation.distance, function(index, value){
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
        console.log(lastIndex, geojson);
    }

    geojson.coordinates[0] = ol.proj.transform(pos, 'EPSG:3857', 'EPSG:4326');

    var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
        'dataProjection' : 'EPSG:4326',
        'featureProjection' : 'EPSG:3857'
    });
    // We have our targeted Rotation Value
    // Problem is, that we need to rotate the map in the shortest way. (Turn Right or Left)
    // We can calculate that if we calculate the delta angle of the shortest Way:
    // (targetAngle - sourceAngle + 180) % 360 - 180
    // The result is gonna be positive or negative so we are gonna add that value to our current angle
    var fullRotation = 2 * Math.PI;
    var halfRotation = Math.PI;
    var a = rot - map.getView().getRotation() + halfRotation;
    var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
    var targetRotation = map.getView().getRotation() + mod;
    map.getView().animate({rotation: targetRotation, duration: 200}, function(){
        setTimeout(function(){
            map.getView().setRotation(((2* Math.PI) + (map.getView().getRotation() % (2*Math.PI))) % (2 * Math.PI));
            map.getView().fit(geom, {duration: 600, padding: [height, 0, 30, 0]});
        }, 200);

    });
    userPosOverlay.setPosition(pos);
    
/*
    map.getView().animate({
        center: pos,
        rotation: rot,
        zoom: 18,
        duration: 500
    }, function(){
        map.getView().un("change:center", eventUserPositionUpdate);
        //map.addOverlay(userPosOverlay);
    });
    */
/*
    map.getView().centerOn(pos, map.getSize(), [$("#map").width()/2,$("#map").height() - 150]);
    map.getView().setRotation(rot);
    map.getView().setZoom(18);*/
    
}

function eventUserPositionUpdate(){
    var center = map.getView().getCenter();
    userPosOverlay.setPosition(center);
}

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
}

function updateNextStep(gpsPos, bearing, distTraveled, durTraveled) {
    var data = route;
    // This Function goes through the current Route Object and evaluates the next step:
    // Add the information for the next steps and route meta data
    // Route Metadata
    var duration = parseFloat(data.routes[0].duration) - durTraveled;
    duration = parseDuration(duration);
    $("#search-addon #route-information #duration").html(duration);
    distance = parseFloat(data.routes[0].distance) - distTraveled;
    distance = parseDistance(distance);
    $("#search-addon #route-information #length").html(distance);
    // Next Step
    var step = data.routes[0].legs[0].steps[1];
    var stepString = parseManeuver(step["maneuver"], data.routes[0], 0, 1);
    $("#search-addon #routing-steps .step-string").html(stepString);
    var img = parseImg(step);
    $("#search-addon #routing-steps .step-image img").attr('src', img);
    var stepDistance = parseDistance(parseFloat(data.routes[0].legs[0].steps[0].distance) - distTraveled);
    $("#search-addon #routing-steps .step-length").html(stepDistance);
    // So now that everything is Drawn we adjust the Map View
    // The new Rotation is The bearing of the first step of the route:
    var rotation = parseInt(data.routes[0].legs[0].steps[0].maneuver.bearing_after);
    if (bearing !== null) {
        rotation = bearing;
    }
    rotation = 360 - rotation;
    // The Value needs to be in Radians
    rotation *= Math.PI;
    rotation /= 180;
    if (gpsPos !== null) {
        updateUserPosition(gpsPos, rotation);
    } else {
        updateUserPosition(ol.proj.transform([data.waypoints[0].location[0], data.waypoints[0].location[1]], 'EPSG:4326', 'EPSG:3857'), rotation);
    }
}

function removeRoute() {
    if (routeLayer !== null) {
        // Remove old Features
        map.removeLayer(routeLayer);
    }
    // Remove old Markers
    $.each(routeMarkers, function(index, value) {
        map.removeOverlay(value);
    });
    vectorS = new ol.source.Vector();
}

function drawGeojson(geojson, lineColor) {
    var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
        'dataProjection': 'EPSG:4326',
        'featureProjection': 'EPSG:3857'
    });
    var feature = new ol.Feature({
        'geometry': geom
    });
    if (lineColor !== null) {
        var drivenRouteLineStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: lineColor,
                width: 5
            }),
            fill: new ol.style.Fill({
                color: lineColor
            })
        });
        feature.setStyle(drivenRouteLineStyle);
    }
    routeAssistentVectorSource.addFeature(feature);
}

function reloadRoute() {
    var pos = gpsLocation;
    var pointString = "";
    $.each(route.waypoints, function(index, value) {
        if (index === 0) {
            // The first waypoint always is the gpsLocation
            pointString += pos.toString() + ";";
        } else {
            pointString += value.location.toString() + ";";
        }
    });
    pointString = pointString.replace(/;$/, '');
    var url = '/route/find/' + vehicle + '/' + pointString;
    $.getJSON(url, function(response) {
        route = response;
        drivenRoute = {
            coordinates: [pos],
            type: "LineString"
        };
        startLocationFollowing();
    }).error(function() {
        deinitAssistent();
    });
}