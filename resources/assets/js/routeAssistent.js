var followingId = null;
var positions = [];
var routeAssistentVectorSource = new ol.source.Vector();
var waypoints = [];
var drivenRoutes = [];
var userPosOverlay = null;

function startAssistent() {
    if (gps && points.match(/^gps;/) !== null) {
        //alert("Dieses Feature ist noch hochgradig experimentell und kann jederzeit abstürzen. Bitte benutzen Sie es nicht bei der Autofahrt und achten Sie konstant auf Ihre Umgebung, beachten Sie die Straßenverkehrsordnung und bedienen Sie dieses Interface (und Ihr Handy) nicht während der Fahrt.");
        positions = [];
        initWaypoints();
        prepareInterface();
        initAssistentGraphics();
        reloadRoute();
        startLocationFollowing();
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
    //Hide Results
    deinitResults();
    // Remove Zoom Bar
    $(".ol-zoom, .ol-zoomslider, #location-tool").addClass("hidden");
    //Update Map Size
    updateMapSize();
}

function deinitAssistent() {
    window.location.reload();
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
            timeout: 5000,
            maximumAge: 1000
        };
        followingId = navigator.geolocation.watchPosition(function(position) {
            var timestamp = Math.floor(position.timestamp / 1000);
            var lon = parseFloat(position.coords.longitude);
            var lat = parseFloat(position.coords.latitude);
            var accuracy = parseFloat(position.coords.accuracy);
            var newPosition = {
                timestamp: timestamp,
                lon: lon,
                lat: lat,
                accuracy: Math.max(accuracy, 1.5)
            };
            var dist = getDistance(currentPosition, newPosition);
            var minDist = 0;
            switch (vehicle) {
                case "car":
                    minDist = 20;
                    break;
                case "bicycle":
                    minDist = 10;
                    break;
                case "foot":
                    minDist = 5;
                    break;
            }
            if (dist <= (minDist + accuracy) || calculating) {
                return;
            } else {
                calculating = true;
            }
            positions.push({
                timestamp: timestamp,
                lon: lon,
                lat: lat,
                accuracy: accuracy
            });
            currentPosition = {
                timestamp: timestamp,
                lon: lon,
                lat: lat,
                accuracy: accuracy
            };
            if (positions.length === 1) {
                // If Just one Position is in the array
                // then it indicates the beginning of the route
                // We start with the first step of the current route
                console.log(route);
                routeAssistentVectorSource.clear();
                // Draw the Route
                drawGeojson(route.routes[0].geometry, 'red');
                updateNextStep();
                calculating = false;
            } else if (positions.length >= 2) {
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
                var routeStepGeometry = route.routes[0].legs[0].steps[0].geometry;
                routeStepGeometry = (new ol.format.GeoJSON()).readGeometry(routeStepGeometry, {
                    'dataProjection': 'EPSG:4326',
                    'featureProjection': 'EPSG:3857'
                });
                var pointOnGeometry = routeStepGeometry.getClosestPoint(ol.proj.transform([currentPosition.lon, currentPosition.lat], 'EPSG:4326', 'EPSG:3857'));
                // First thing we do is to check whether the point is the beginning or ending of the Line
                // In that case we would have to recalculate anyways because of 2.
                // 3. is standard and we check for recalc
                var recalc = false;
                if (arraysEqual(routeStepGeometry.getFirstCoordinate(), pointOnGeometry) || arraysEqual(routeStepGeometry.getLastCoordinate(), pointOnGeometry)) {
                    recalc = true;
                } else {
                    // Now we check for 1.
                    // Sphere with the Radius of Earth
                    var wgs84Sphere = new ol.Sphere(6378137);
                    var c1 = ol.proj.transform(pointOnGeometry, 'EPSG:3857', 'EPSG:4326');
                    var c2 = [currentPosition.lon, currentPosition.lat];
                    var d = wgs84Sphere.haversineDistance(c1, c2);
                    if (d > accuracy) {
                        recalc = true;
                    }
                }
                if (!recalc) {
                    updateUserPosition(pointOnGeometry);
                    calculating = false;
                } else {
                    // Generate url to retrieve
                    var positionstring = "";
                    var timestampstring = "";
                    var radiusstring = "";
                    $.each(positions, function(index, value) {
                        positionstring += value.lon + "," + value.lat + ";";
                        timestampstring += value.timestamp + ";";
                        radiusstring += value.accuracy + ";";
                    });
                    positionstring = positionstring.replace(/;+$/, '');
                    timestampstring = timestampstring.replace(/;+$/, '');
                    radiusstring = radiusstring.replace(/;+$/, '');
                    var url = '/route/match/' + vehicle + '/' + positionstring + '/' + timestampstring + '/' + radiusstring;
                    $.getJSON(url, function(r) {
                        // Aus den "gesnappten" Koordinaten berechnen wir nun die gefahrene Route
                        if (r.code === "Ok" && r.tracepoints !== null && r.tracepoints[r.tracepoints.length - 1] !== null) {
                            var position = {
                                    hint: r.tracepoints[r.tracepoints.length - 1].hint,
                                    lon: parseFloat(r.tracepoints[r.tracepoints.length - 1].location[0]),
                                    lat: parseFloat(r.tracepoints[r.tracepoints.length - 1].location[1])
                                }
                                // Wir nehmen vorerst immer das Beste Matching für die gefahrene Route.
                                // Vielleicht fällt mir später etwas besseres ein
                            if (r.matchings !== null && r.matchings[0] !== undefined) {
                                // We have successfully calculated the driven route. Let's reset the points:
                                drivenRoutes.push(r.matchings[0].geometry);
                                // Clear Position data:
                                while (positions.length > 1) {
                                    positions.pop();
                                }
                                // Clear the shown Route
                                routeAssistentVectorSource.clear();
                                // Draw every driven Route on the map:
                                $.each(drivenRoutes, function(index, value) {
                                    // Add the driven Route
                                    drawGeojson(value, 'grey');
                                });
                                // Get the Route until the target
                                var hintsComplete = true;
                                var pointString = "";
                                var hintString = "";
                                $.each(waypoints, function(index, value) {
                                    if (value === 'gps') {
                                        pointString += position.lon + "," + position.lat + ";";
                                        hintString += position.hint + ";";
                                    } else {
                                        pointString += value.lon + "," + value.lat + ";";
                                        if (value.hint !== "") {
                                            hintString += value.hint + ";";
                                        } else {
                                            hintsComplete = false;
                                        }
                                    }
                                });
                                pointString = pointString.replace(/;$/, '');
                                hintString = hintString.replace(/;$/, '');
                                var url = '/route/find/' + vehicle + '/' + pointString;
                                if (hintsComplete) {
                                    url += "/" + hintString;
                                }
                                $.getJSON(url, function(data) {
                                    if (data.code === "Ok") {
                                        drawGeojson(data.routes[0].geometry, 'red');
                                        route = data;
                                        updateNextStep();
                                    }
                                }).always(function() {
                                    calculating = false;
                                });
                            } else {
                                calculating = false;
                            }
                        } else {
                            console.log(r);
                            positions.pop();
                            calculating = false;
                        }
                    });
                }
            } else {
                calculating = false;
            }
        }, function(error) {
            // Follow Location couldn't be started. Abort now
            deinitAssistent();
        }, options);
    }
}

function updateUserPosition(pos) {
    if(userPosOverlay !== null){
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
    map.addOverlay(userPosOverlay);
}

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
}

function updateNextStep() {
    var data = route;
    // This Function goes through the current Route Object and evaluates the next step:
    // Add the information for the next steps and route meta data
    // Route Metadata
    var duration = parseFloat(data.routes[0].duration);
    duration = parseDuration(duration)
    $("nav #route-information #duration").html(duration);
    var distance = parseFloat(data.routes[0].distance)
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
    rotation = 360 - rotation;
    // The Value needs to be in Radians
    rotation *= Math.PI;
    rotation /= 180;
    map.getView().setRotation(rotation);
    map.getView().setZoom(18);
    map.getView().setCenter(ol.proj.transform([data.waypoints[0].location[0], data.waypoints[0].location[1]], 'EPSG:4326', 'EPSG:3857'));
    updateUserPosition(ol.proj.transform([data.waypoints[0].location[0], data.waypoints[0].location[1]], 'EPSG:4326', 'EPSG:3857'));
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
    if (points.match(/gps/) !== null) {
        var pos = gpsLocation;
        var pointString = points;
        if (pos !== null) {
            pointString = pointString.replace(/gps/, pos.toString());
        } else {
            pointString = pointString.replace(/;{0,1}gps;{0,1}/, ';');
        }
    }
    var url = '/route/find/' + vehicle + '/' + pointString;
    $.getJSON(url, function(response) {
        route = response;
        // Add The Hints to the waypoints:
        $.each(route.waypoints, function(index, value) {
            if (waypoints[index] !== 'gps') {
                waypoints[index].hint = value.hint;
            }
        });
    }).success(function() {
        //addGraphics();
    });
}