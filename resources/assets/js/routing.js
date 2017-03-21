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
var routeInit = false;
function start(){
    
    var pointString = points;
    if(points.match(/gps/) !== null){
        if(!gps){
            // If this is the case we will simply return here.
            // If the geolocation API got triggered, then another call to this function will
            // happen, when the gpsLocation is available
            return;
        }
        var pos = gpsLocation;
        pointString = points;
        if(pos !== null){
            pointString = pointString.replace(/gps/, pos.toString());
        }else{
            pointString = pointString.replace(/;{0,1}gps;{0,1}/, ';');
        }
    }
    if(routeInit){
        return;
    }
    routeInit = true;
    
    var url = '/route/find/' + vehicle + '/' + pointString;
    $.getJSON(url, function(response) {
        route = response;
    }).success(function() {
        // If the Route could be loaded and there is a route between the points we can show it:
        if (typeof route["code"] !== 'undefined' && route["code"] === "Ok" && route["routes"].length >= 1) {
            deinitSearchBox();
            addResults();
            toggleResults("out");
            addGraphics();
            
        }
    });
};

function addResults() {
    // To be consistent for multiple calls we need to remove eventually existing interfaces
    $("#vehicle-chooser").remove();
    $("#route-content").remove();
    $("#results").html("");
    var vehicleChooser = $("<div id=\"vehicle-chooser\">\
            <label id=\"back-to-edit\" class=\"radio-inline\">\
                <input type=\"radio\" name=\"vehicle\" value=\""+vehicle+"\"><div><span class=\"glyphicon glyphicon-arrow-left\"></span></div>\
            </label>\
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
        ");
    $("#search-addon").prepend(vehicleChooser);
    var routeContent = $("<div id=\"route-content\" class=\"container-fluid\"></div>");
    $("#results").append(routeContent);
    $(vehicleChooser).find("input[value=" + vehicle + "]").prop("checked", true);
    // Add the changed Listener to the vehicle Chooser:
    $(vehicleChooser).find("input[type=radio]").change(function() {
        vehicle = $(vehicleChooser).find("input[type=radio]:checked").val();
        var url = '/route/start/' + vehicle + '/' + points;
        url = url.replace(/;+$/, '');
        document.location.href = url;
    });
    // We should add a Place to display Informations About the Route
    var routeInformation = $('<div id="route-information" class="row"><div id="length" class="col-xs-6"></div><div id="duration" class="col-xs-6"></div></div>')
    $("#route-content").prepend(routeInformation);
    // Add Button for starting the route assistent
    if(points.match(/^gps/) !== null){
        var routeAssistent = $('\
            <btn class="btn btn-success" id="route-assistent">Starten <span class="glyphicon glyphicon-play"></span></a>\
        ');
        $(routeAssistent).click(function(){
            updateCurrentLocation(startAssistent);
        });
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
            }
            break;
        case "roundabout":
        case "rotary":
            return "/img/roundabout.png";
        case "on ramp":
            return "/img/auffahren.png";
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
            }
        default:
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
    var stepString = "";
    var type = maneuver["type"];
    var modifier = maneuver["modifier"];

    var targetStreet = "";
    if(typeof takenRoute["legs"][legIndex]["steps"][stepIndex]["name"] !== "undefined" && typeof takenRoute["legs"][legIndex]["steps"][stepIndex]["ref"] !== "undefined"){
        targetStreet = makeTrafficSigns(takenRoute["legs"][legIndex]["steps"][stepIndex]["ref"] + ":" + takenRoute["legs"][legIndex]["steps"][stepIndex]["name"]);
    }else if(typeof takenRoute["legs"][legIndex]["steps"][stepIndex]["ref"] !== "undefined" && typeof takenRoute["legs"][legIndex]["steps"][stepIndex]["name"] === "undefined"){
        targetStreet = makeTrafficSigns(takenRoute["legs"][legIndex]["steps"][stepIndex]["ref"] + ":");
    }else if(typeof takenRoute["legs"][legIndex]["steps"][stepIndex]["ref"] === "undefined" && typeof takenRoute["legs"][legIndex]["steps"][stepIndex]["name"] !== "undefined"){
        targetStreet = takenRoute["legs"][legIndex]["steps"][stepIndex]["name"];
    }
    if(typeof targetStreet === "undefined"){
        targetStreet = "";
    }

    var destinations = takenRoute["legs"][legIndex]["steps"][stepIndex]["destinations"];
    if(typeof destinations !== "undefined"){
        destinations = destinations.trim();
        destinations = makeTrafficSigns(destinations);
    }else{
        destinations = "";
    }
    
    switch (type) {
        case "depart":
            var direction = parseBearing(maneuver["bearing_after"]);
            var start = takenRoute["legs"][legIndex]["steps"][stepIndex]["name"];

            if(typeof start !== "undefined"){
                stepString = "Auf " + start + " nach " + direction;
            }else{
                stepString = "Starte Richtung " + direction;
            }

            var nextStreet = takenRoute["legs"][legIndex]["steps"][stepIndex + 1]["name"];
            if (typeof nextStreet !== "undefined" && nextStreet !== start) {
                stepString += " Richtung " + nextStreet;
            }
            break;
        case "continue":
            var mod = parseModifier(maneuver["modifier"]);
            stepString = mod + " einordnen.";
            break;
        case "roundabout turn":
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
            stepString = "Weiter auf ";
            break;
        case "merge":
            var mod = parseModifier(modifier);
            stepString = mod + " auffahren.";
            break;
        case "off ramp":
        case "fork":
            var mod = parseModifier(modifier);
            stepString = mod + " halten.";
            break;
        case "on ramp":
            var mod = parseModifier(modifier);
            stepString = mod + " auffahren.";
            break;
        case "use lane":
            switch(modifier){
                case "left":
                    stepString = "Linke ";
                    break;
                case "right":
                    stepString = "Rechte ";
                    break;
                case "middle":
                case "center":
                    stepString = "Mittlere ";
                    break;
                default:
            }
            if(stepString !== ""){
                stepString += "Spur verwenden.";
            }
            break;
        default:
            console.log(takenRoute["legs"][legIndex]["steps"][stepIndex]);
            stepString = "Konnte diesen Schritt nicht zu einem String auswerten";
    }

    // Die Anweisung kann nun noch erweitert werden, um eine Straße auf der weiter gefahren wird, oder um eine Richtung
    if(typeof destinations !== "undefined" && typeof targetStreet !== "undefined"){
        stepString += "<ul class=\"list-unstyled\"><li>" + targetStreet + "</li><li>" + destinations + "</li></ul>";
    }else{
        stepString += " <span class=\"destination\">" + targetStreet + destinations + "</span>";
    }

    return stepString;
}

function makeTrafficSigns(destinations){
    var tmp = "";
        while(destinations.length > 0){
            // Let's check what kind of destination we have:
            if(destinations.match(/^[^,]+?:/)){
                var track = destinations.substring(0, destinations.indexOf(":")).trim();
                track = track.split(/;/g);
                destinations = destinations.substr(destinations.indexOf(":") + 1);
                // No we get the destinations of this track an make them to a traffic sign
                var tmpDests = [];
                while(destinations.match(/^[^,]+/) !== null){
                    if(destinations.indexOf(",") !== -1){
                        tmpDests.push(destinations.substring(0, destinations.indexOf(",")));
                        destinations = destinations.substring(destinations.indexOf(",")+1);
                    }else{
                        tmpDests.push(destinations);
                        destinations = "";
                    }
                }
                // Generate Output from the generated data
                var tmpClass = "";
                if(track[0].indexOf("A ") === 0){
                    tmpClass = "autobahn";
                }else if(track[0].trim().match(/^\w{0,3}\s*\d/) !== null 
                    || track[0].trim().match(/^Ring\s\d+/) !== null)
                    {
                    tmpClass = "landstrasse";
                }
                tmp += "<span class=\"" + tmpClass + " schild\">";
                $.each(track, function(index, value){
                    tmp += "<span class=\"highway-number\">" + value + "</span>";
                });
                tmp += " " + tmpDests + "</span>";
            }else{
                if(destinations.match(/^\w+?,/)){
                    tmp += destinations.substring(0, destinations.indexOf(","));
                    destinations = destinations.substring(destinations.indexOf(",")+1);
                }else if(destinations.match(/^\w+?;/)){
                    tmp += destinations.substring(0, destinations.indexOf(";"));
                    destinations = destinations.substring(destinations.indexOf(";")+1);
                }else{
                    tmp += destinations;
                    destinations = "";
                }
            }
        }
        return tmp;
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
            direction = "Leicht rechts";
            break;
        case "straight":
            direction = "Weiter";
            break;
        case "slight left":
            direction = "Leicht links";
            break;
        case "left":
            direction = "Links";
            break;
        case "sharp left":
            direction = "Scharf links";
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
    if(distance >= 1000){
        distance /= 1000;
        var km = Math.round(distance * 10) / 10;
        return km + " km";
    }else if(distance >= 50){
        var mod = distance % 50;
        var m = 0;
        if(mod >= 25){
            m = distance + (50-mod);
        }else{
            m = distance - mod;
        }
        return m + " m";
    }else{
        var m = Math.round(distance / 10) * 10;
        return m + " m";
    }
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
    if(hours === 0 && minute === 0){
        result = "< 1 Min.";
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
    // We give adjust the view so the route is not under the result list
    var paddingRight = 0;
    if(parseInt( $(document).outerWidth()) > 768 && $("#results").attr("data-status") === "out" ){
        paddingRight = $("#search-addon").outerWidth();
    }
    adjustViewBoundingBox(minPos, maxPos, [5,paddingRight,5,5]);
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