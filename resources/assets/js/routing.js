var routeLineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgb(255,0,0)',
        width: 5
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,.03)'
    })
});
var route = {};
var routeLayer = null;
var routeMarkers = [];
function start(){
    var pointString = points;
    if(points.match(/gps/) !== null){
        var pos = gpsLocation;
        pointString = points;
        if(pos !== null){
            pointString = pointString.replace(/gps/, pos.toString());
        }else{
            pointString = pointString.replace(/;{0,1}gps;{0,1}/, ';');
        }
    }
    var url = '/route/find/' + vehicle + '/' + pointString;
    $.getJSON(url, function(response) {
        route = response;
    }).success(function() {
        // If the Route could be loaded and there is a route between the points we can show it:
        if (typeof route["code"] !== 'undefined' && route["code"] === "Ok" && route["routes"].length >= 1) {
            deinitSearchBox();
            addGraphics();
            addResults();
            initResults();
        }
    });
};

function addResults() {
    $("#results").html("");
    var vehicleChooser = $("<div id=\"vehicle-chooser\">\
            <label class=\"radio-inline\">\
              <input type=\"radio\" name=\"vehicle\" value=\"foot\"> <div><img src=\"/img/silhouette-walk.png\" height=\"20px\" /></div>\
            </label>\
            <label class=\"radio-inline\" >\
              <input type=\"radio\" name=\"vehicle\" value=\"bicycle\"> <div><img src=\"/img/bike.png\" height=\"20px\" /></div>\
            </label>\
            <label class=\"radio-inline\">\
              <input type=\"radio\" name=\"vehicle\" value=\"car\"> <div><img src=\"/img/car.png\" height=\"20px\" /></div>\
            </label>\
        </div>\
        <div id=\"route-content\">\
        </div>\
        ");
    $("#results").append(vehicleChooser);
    $(vehicleChooser).find("input[value=" + vehicle + "]").prop("checked", true);
    // Add the changed Listener to the vehicle Chooser:
    $(vehicleChooser).find("input[type=radio]").change(function() {
        vehicle = $(vehicleChooser).find("input[type=radio]:checked").val();
        var url = '/route/start/' + vehicle + '/';
        $.each(route["waypoints"], function(index, value) {
            url += value["location"].toString() + ";";
        });
        url = url.replace(/;+$/, '');
        document.location.href = url;
    });
    // We should add a Place to display Informations About the Route
    var routeInformation = $('<div id="route-information" class="row"><div id="length" class="col-md-6"></div><div id="duration" class="col-md-6"></div></div>')
    $("#route-content").prepend(routeInformation);
    // Add Button for starting the route assistent
    if(points.match(/^gps/) !== null){
        var routeAssistent = $('<div class="container-fluid"><div class="row"><div class="col-xs-12"><a id="route-assistent" href="javascript:updateCurrentLocation(startAssistent);">Routenführung starten</a></div></div></div>');
        $("#route-content").prepend(routeAssistent);
    }
    addRouteMetaData();
    insertSteps();
}

function insertSteps() {
    var takenRoute = route["routes"][0];
    var stepList = $("<table id=\"routing-steps\" class=\"table\"></table>");
    // Parse Each Leg
    $.each(takenRoute["legs"], function(legIndex, leg) {
        // Parse all steps for the Leg
        $.each(leg["steps"], function(stepIndex, step) {
            var lon = step["maneuver"]["location"][0];
            var lat = step["maneuver"]["location"][1];
            var maneuver = $("<tr class=\"step\" data-lon=\"" + lon + "\" data-lat=\"" + lat + "\"></tr>");
            var directionImg = $("<td class=\"step-image\"></td>");
            var img = parseImg(step);
            if (img !== "") {
                $(directionImg).append("<img height=\"35px\" src=\"" + img + "\" />");
            }
            $(maneuver).append(directionImg);
            var stepString = parseManeuver(step["maneuver"], takenRoute, legIndex, stepIndex);
            //$(maneuver).append($("<div class=\"col-xs-8\">" + stepString + "</p>"));
            $(maneuver).append($("<td>" + stepString + "</td>"));
            var distance = parseFloat(step["distance"]);
            distance = Math.ceil(distance);
            if (distance > 1000) {
                distance /= 1000;
                distance = Math.round(distance * 10) / 10;
                distance = distance + " km";
            } else {
                distance = distance + " m";
            }
            if (step["maneuver"]["type"] === "arrive") {
                distance = "";
            }
            $(maneuver).append($("<td>" + distance + "</td>"));
            $(maneuver).mouseover(function() {
                var lon = parseFloat($(this).attr("data-lon"));
                var lat = parseFloat($(this).attr("data-lat"));
                var layer = addPoint(lon, lat);
                $(maneuver).mouseout(function() {
                    map.removeLayer(layer);
                });
                $(maneuver).click(function() {
                    var point = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
                    map.getView().setCenter(point);
                    map.getView().setZoom(16);
                });
            });
            $(stepList).append(maneuver);
        });
    });
    $("#route-content").append(stepList);
}

function parseImg(step) {
    switch (step["maneuver"]["type"]) {
        case "depart":
        case "new name":
            return "/img/straight.png";
        case "roundabout turn":
        case "continue":
        case "end of road":
        case "turn":
            switch (step["maneuver"]["modifier"]) {
                case "left":
                    return "/img/turn-left.png";
                case "sharp left":
                    return "/img/turn-sharp-left.png";
                case "right":
                    return "/img/turn-right.png";
                case "sharp right":
                    return "/img/turn-sharp-right.png";
                case "uturn":
                    return "/img/uturn.png";
                case "slight right":
                    return "/img/fork-slight-right.png";
                case "slight left":
                    return "/img/fork-slight-left.png";
                case "straight":
                    return "/img/straight.png";
                default:
                    // console.log(step);
            }
            break;
        case "roundabout":
        case "rotary":
            return "/img/roundabout.png";
        case "merge":
        case "off ramp":
        case "fork":
            switch (step["maneuver"]["modifier"]) {
                case "left":
                    return "/img/fork-left.png";
                case "right":
                    return "/img/fork-right.png";
                case "slight right":
                    return "/img/fork-slight-right.png";
                case "slight left":
                    return "/img/fork-slight-left.png";
                case "straight":
                    return "/img/straight.png";
                default:
                    // console.log(step);
            }
        default:
            //  console.log(step);
    }
    return "";
}

function addPoint(lon, lat) {
    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'))
            })]
        })
    });
    map.addLayer(layer);
    return layer;
}

function addRouteMetaData() {
    var distance = route["routes"][0]["distance"];
    var duration = route["routes"][0]["duration"];
    $("#route-information #length").html(parseDistance(distance));
    $("#route-information #duration").html(parseDuration(duration));
}

function parseManeuver(maneuver, takenRoute, legIndex, stepIndex) {
    //console.log(maneuver);
    var stepString = "";
    var type = maneuver["type"];
    var modifier = maneuver["modifier"];
    var targetStreet = takenRoute["legs"][legIndex]["steps"][stepIndex]["name"];
    var destinations = takenRoute["legs"][legIndex]["steps"][stepIndex]["destinations"];
    if (!destinations) {
        destinations = takenRoute["legs"][legIndex]["steps"][stepIndex]["ref"]
    }
    switch (type) {
        case "depart":
            var direction = parseBearing(maneuver["bearing_after"]);
            var start = takenRoute["legs"][legIndex]["steps"][stepIndex]["name"];
            stepString = "Auf " + start + " nach " + direction;
            var nextStreet = takenRoute["legs"][legIndex]["steps"][stepIndex + 1]["name"];
            if (nextStreet !== start) {
                stepString += " Richtung " + nextStreet;
            }
            break;
        case "roundabout turn":
        case "continue":
        case "end of road":
        case "turn":
            var direction = "";
            if (maneuver["modifier"] === "uturn") {
                stepString = "Bei " + targetStreet + " wenden";
            } else {
                var modifier = parseModifier(maneuver["modifier"]);
                if (modifier !== "Weiter") {
                    modifier += " abbiegen";
                }
                stepString = modifier;
            }
            if (targetStreet !== "") {
                stepString += " auf " + targetStreet;
            }
            break;
        case "roundabout":
        case "rotary":
            stepString = "Im Kreisverkehr ";
            if (maneuver["exit"] !== null) {
                stepString += "die ";
                switch (parseInt(maneuver["exit"])) {
                    case 1:
                        stepString += "erste ";
                        break;
                    case 2:
                        stepString += "zweite ";
                        break;
                    case 3:
                        stepString += "dritte ";
                        break;
                    case 4:
                        stepString += "vierte ";
                        break;
                    case 5:
                        stepString += "fünfte ";
                        break;
                    case 6:
                        stepString += "sechste ";
                        break;
                    case 7:
                        stepString += "siebte ";
                        break;
                    case 8:
                        stepString += "achte ";
                        break;
                    case 9:
                        stepString += "neunte ";
                        break;
                }
                stepString += "Ausfahrt nehmen."
                if (destinations) {
                    stepString += " <nobr>(" + destinations + ")</nobr>";
                }
            }
            break;
        case "arrive":
            var mod = parseModifier(modifier);
            if (mod === undefined) {
                stepString = "Sie haben das Ziel erreicht.";
            } else {
                stepString = "Das Ziel befindet sich " + mod;
            }
            break;
        case "new name":
            stepString = "Weiter auf " + targetStreet;
            break;
        case "merge":
            var mod = parseModifier(modifier);
            stepString = mod + " auffahren.";
            if (targetStreet && !destinations) {
                stepString = mod + " auffahren auf " + targetStreet + ".";
            } else if (targetStreet && destinations) {
                stepString = mod + " halten um auf " + targetStreet + " (" + destinations + ") aufzufahren.";
            }
            break;
        case "off ramp":
        case "fork":
            var mod = parseModifier(modifier);
            stepString = "An der Gabelung " + mod + " halten.";
            if (targetStreet && !destinations) {
                stepString = "An der Gabelung " + mod + " halten. Richtung " + targetStreet;
            } else if (!targetStreet && destinations) {
                stepString = "An der Gabelung " + mod + " halten. (" + destinations + ")";
            } else if (targetStreet && destinations) {
                stepString = "An der Gabelung " + mod + " halten. Richtung " + targetStreet + " (" + destinations + ")";
            }
            break;
        default:
            console.log(takenRoute["legs"][legIndex]["steps"][stepIndex]);
            stepString = "Konnte diesen Schritt nicht zu einem String auswerten";
    }
    return stepString;
}

function parseModifier(modifier) {
    var direction = "";
    switch (modifier) {
        case undefined:
            direction = undefined;
            break;
        case "sharp right":
            direction = "Scharf rechts";
            break;
        case "right":
            direction = "Rechts";
            break;
        case "slight right":
            direction = "Leicht Rechts";
            break;
        case "straight":
            direction = "Weiter";
            break;
        case "slight left":
            direction = "Leicht Links";
            break;
        case "left":
            direction = "Links";
            break;
        case "sharp left":
            direction = "Scharf Links";
            break;
        default:
            direction = "Konnte Richtungs-Modifizierer nicht auswerten: " + modifier;
    }
    return direction;
}

function parseBearing(bearing) {
    bearing = parseFloat(bearing);
    if ((bearing >= 0 && bearing < 22.5) || bearing >= 337.5) {
        return "Norden";
    } else if (bearing >= 22.5 && bearing < 67.5) {
        return "Nordosten";
    } else if (bearing >= 67.5 && bearing < 112.5) {
        return "Osten";
    } else if (bearing >= 112.5 && bearing < 157.5) {
        return "Südosten";
    } else if (bearing >= 157.5 && bearing < 202.5) {
        return "Süden";
    } else if (bearing >= 202.5 && bearing < 247.5) {
        return "Südwesten";
    } else if (bearing >= 247.5 && bearing < 292.5) {
        return "Westen";
    } else if (bearing >= 292.5 && bearing < 337.5) {
        return "Nordwesten";
    }
}

function parseDistance(distance) {
    distance = parseFloat(distance);
    distance /= 1000;
    var km = Math.round(distance * 10) / 10;
    return km + " km";
}

function parseDuration(duration) {
    duration = Math.floor(parseFloat(duration));
    var hours = 0;
    if (duration > 3600) {
        hours = Math.floor(duration / 3600);
        duration = duration % 3600;
    }
    var minute = 0;
    if (duration > 60) {
        minute = Math.round(duration / 60);
        duration = duration % 60;
    }
    var result = "";
    if (hours > 0) {
        result += hours + " Std.";
    }
    if (minute > 0) {
        result += " " + minute + " Min.";
    }
    return result;
}

function addGraphics() { // We collect the minimal Position and the maximum Position within the route so we can Adjust the View:
    var minPos = [];
    var maxPos = [];
    var vectorS = new ol.source.Vector();
    // We will show the first Route:
    $.each(route["routes"][0]["legs"], function(index, value) {
        // For each leg we collect all the steps:
        $.each(value["steps"], function(index, value) {
            var geojson = value["geometry"];
            // Let's look through the Points to find the minimal
            $.each(geojson["coordinates"], function(index, value) {
                if (typeof minPos[0] === "undefined" || parseFloat(value[0]) < minPos[0]) {
                    minPos[0] = value[0];
                } else if (typeof maxPos[0] === "undefined" || parseFloat(value[0]) > maxPos[0]) {
                    maxPos[0] = value[0];
                }
                if (typeof minPos[1] === "undefined" || parseFloat(value[1]) < minPos[1]) {
                    minPos[1] = value[1];
                } else if (typeof maxPos[1] === "undefined" || parseFloat(value[1]) > maxPos[1]) {
                    maxPos[1] = value[1];
                }
            });
            var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
                'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
            var feature = new ol.Feature({
                'geometry': geom
            });
            feature.setStyle(routeLineStyle);
            // feature.setId(index);
            vectorS.addFeature(feature);
        });
    });
    adjustViewBoundingBox(minPos, maxPos);
    if(routeLayer !== null){
        // Remove old Features
        map.removeLayer(routeLayer);
    }
    // Remove old Markers
    $.each(routeMarkers, function(index, value){
        map.removeOverlay(value);
    });
    // add Features

    routeLayer = new ol.layer.Vector({
        source: vectorS
    });
    map.addLayer(routeLayer);
    // We should add some Pins to the Waypoint Locations
    $.each(route["waypoints"], function(index, value) {
        // This will work upto an index of 25
        // Caharacter Representation of the index:
        var chr = String.fromCharCode(65 + index);
        // So now the Pin
        var el = $('<span id="' + chr + '" class="marker">' + chr + '</span>');
        var pos = ol.proj.transform([parseFloat(value["location"][0]), parseFloat(value["location"][1])], 'EPSG:4326', 'EPSG:3857');
        routeMarkers.push(addMarker(el, pos));
    });
}

function startAssistent() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/routeAssistent.js', {
            scope: '/'
        }).then(function(reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function(error) {
            // registration failed
            console.error('Registration failed with ' + error);
        });
    };
}