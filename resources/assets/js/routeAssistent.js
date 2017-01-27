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
        //alert("Dieses Feature ist noch hochgradig experimentell und kann jederzeit abstürzen. Bitte benutzen Sie es nicht bei der Autofahrt und achten Sie konstant auf Ihre Umgebung, beachten Sie die Straßenverkehrsordnung und bedienen Sie dieses Interface (und Ihr Handy) nicht während der Fahrt.");
        positions = [];
        initWaypoints();
        prepareInterface();
        initAssistentGraphics();
        reloadRoute();
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
    // Set The Route Layer to the new one:
    routeLayer.setSource(routeAssistentVectorSource);
    // Remove old Markers
    $.each(routeMarkers, function(index, value) {
        map.removeOverlay(value);
    });
}

function prepareInterface() {
    // Change Navigation-Bar to make it show the next Steps
    // Hide Navigation Bar
    $("nav").removeClass("navbar");
    $("nav").removeClass("navbar-default");
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
    $("nav").html(nextStep);
    var dialog = $('\
        <div id="continue-dialog" class="container-fluid hidden">\
            <div class="row heading">Sie haben ihr Zwischenziel erreicht.</div>\
            <div class="row options">\
                <div id="next-waypoint" class="col-xs-6 first"><a href="#">Weiter zum nächsten Wegpunkt</a></div>\
                <div id="abort-routing" class="col-xs-6"><a href="#">Navigation abbrechen</a></div>\
            </div>\
        </div>\
    ');
    $("main").append(dialog);
    //Hide Results
    deinitResults();
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
    updateMapSize();
}

function deinitAssistent() {
    if (followingId !== null) {
        navigator.geolocation.clearWatch(followingId);
        followingId = null;
    }
    console.log(route.waypoints);
    if (route.waypoints.length <= 1) {
        // If just one waypoint is left then we finished the route and we redirect to the startpage
        window.location.href = "/";
    } else {
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
        console.log(url);
        //window.location.href = url;
    }
}
var currentPosition = null;
var calculating = false;
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
            timeout: 3000,
            maximumAge: 1000
        };
        followingId = navigator.geolocation.watchPosition(function(position) {
            
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

                // We check for finish here too
                updateNextStep(pointOnRoute.point, bearingGps);
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
        console.log(route.waypoints);
        route.waypoints.splice(1, 1);
    }
    if (route.waypoints.length >= 2) {
        // First Point is the GPS Location
        // At least 2 additional Waypoints are to go
        // So when we removed one now we aren't finished
        openNextWaypointDialog();
    } else {
        // We have a maximum of two waypoints left
        // One of these is the GPS Location so when we removed it we finished routing
        deinitAssistent();
    }
}

function openNextWaypointDialog() {
    $("nav").addClass("hidden");
    updateMapSize();
    $("#continue-dialog #next-waypoint").off();
    $("#continue-dialog #next-waypoint").click(function() {
        $("nav").removeClass("hidden");
        updateMapSize();
        $("#continue-dialog").addClass("hidden");
        startLocationFollowing();
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
    return toDegrees(bearing);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
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
                result = {
                    legIndex: legIndex,
                    stepIndex: stepIndex,
                    point: pointOnStep
                };
                // It could possibly be at the end of this step in that case we will see if we can go on to the next step
                if ((arraysEqual(stepGeom.getFirstCoordinate(), pointOnStep) || arraysEqual(stepGeom.getLastCoordinate(), pointOnStep)) && distance < Math.max(accuracy, 18)) {
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

function updateUserPosition(pos) {
    if (userPosOverlay !== null) {
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
    map.getView().setCenter(pos);
    map.getView().setZoom(18);
    map.addOverlay(userPosOverlay);
}

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
}

function updateNextStep(gpsPos, bearing) {
    var data = route;
    // This Function goes through the current Route Object and evaluates the next step:
    // Add the information for the next steps and route meta data
    // Route Metadata
    var duration = parseFloat(data.routes[0].duration);
    duration = parseDuration(duration);
    $("nav #route-information #duration").html(duration);
    distance = parseFloat(data.routes[0].distance)
    distance = parseDistance(distance);
    $("nav #route-information #length").html(distance);
    // Next Step
    var step = data.routes[0].legs[0].steps[1];
    var stepString = parseManeuver(step["maneuver"], data.routes[0], 0, 1);
    $("nav #routing-steps .step-string").html(stepString);
    var img = parseImg(step);
    $("nav #routing-steps .step-image img").attr('src', img);
    var stepDistance = parseDistance(parseFloat(data.routes[0].legs[0].steps[0].distance));
    $("nav #routing-steps .step-length").html(stepDistance);
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
    map.getView().setRotation(rotation);
    if (gpsPos !== null) {
        updateUserPosition(gpsPos);
    } else {
        updateUserPosition(ol.proj.transform([data.waypoints[0].location[0], data.waypoints[0].location[1]], 'EPSG:4326', 'EPSG:3857'));
    }
}
var rad = function(x) {
    return x * Math.PI / 180;
};
var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lon - p1.lon);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

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