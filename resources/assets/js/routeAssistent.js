var followingId = null;
var positions = [];
var drivenRoute = null;
var routeAssistentVectorSource = new ol.source.Vector();
var waypoints = [];

function startAssistent() {
    if (gps && points.match(/^gps;/) !== null) {
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
var currentPosition = {};
var calculating = false;

function startLocationFollowing() {
    if (followingId === null) {
        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        followingId = navigator.geolocation.watchPosition(function(position) {
            var timestamp = Math.floor(position.timestamp / 1000);
            var lon = parseFloat(position.coords.longitude);
            var lat = parseFloat(position.coords.latitude);
            var accuracy = Math.max(position.coords.accuracy, 1.0);
            var newPosition = {
                timestamp: timestamp,
                lon: lon,
                lat: lat,
                accuracy: accuracy
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
            if (dist <= minDist || calculating) {
                return;
            } else {
                calculating = true;
            }
            currentPosition = {
                timestamp: timestamp,
                lon: lon,
                lat: lat,
                accuracy: accuracy
            };
            positions.push({
                timestamp: timestamp,
                lon: lon,
                lat: lat,
                accuracy: accuracy
            });
            if (positions.length >= 2) {
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
                            // Clear the shown Route
                            routeAssistentVectorSource.clear();
                            // Add the driven Route
                            drawGeojson(r.matchings[0].geometry, 'grey');
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
                                    map.getView().setCenter(ol.proj.transform([position.lon, position.lat], 'EPSG:4326', 'EPSG:3857'));
                                }
                            }).always(function() {
                                calculating = false;
                            });
                        }else{
                            calculating = false;
                        }
                    }else{
                        calculating = false;
                    }
                });
            }else{
                calculating = false;
            }
        }, function(error) {
            // Follow Location couldn't be started. Abort now
            deinitAssistent();
        }, options);
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
    var drivenRouteLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: lineColor,
            width: 5
        }),
        fill: new ol.style.Fill({
            color: lineColor
        })
    });
    var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
        'dataProjection': 'EPSG:4326',
        'featureProjection': 'EPSG:3857'
    });
    var feature = new ol.Feature({
        'geometry': geom
    });
    feature.setStyle(drivenRouteLineStyle);
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