/*
 * Different things need to be done to be able to find the points to route to
 * First thinkg would be to prepare the Results Div
 */
var vectorLayerRoutePreview;
var markers = [];
$(document).ready(function() {
    // Put the Popstate Event:
    $(window).unbind('popstate');
    $(window).bind('popstate', function(event) {
        var state = event.originalEvent.state;
        if (state !== null && state.url !== undefined) {
            document.location.href = state["url"];
        } else if (state !== null && state["vehicle"] !== undefined && state["waypoints"] !== undefined) {
            vehicle = state["vehicle"];
            waypoints = clone(state["waypoints"]);
            initRouteFinder();
        } else {
            waypoints = [];
            initRouteFinder();
        }
    });
    deinitSearchBox();
    if (waypoints.length >= 1) {
        adjustViewPosList(waypoints);
    }
    refreshUrl();
    map.un("singleclick", mapClickFunction);
    map.on('singleclick', function(evt) {
        var pos = evt["coordinate"];
        addWaypoint(pos);
    });
});

function addWaypoint(pos) {
    pos = ol.proj.transform(pos, 'EPSG:3857', 'EPSG:4326');
    $.each(waypoints, function(index, value) {
        if (value === '') {
            waypoints[index] = pos;
            refreshUrl();
            return false;
        }
    });
}

function refreshUrl() {
    var uri = '/route/start/' + vehicle + '/';
    $.each(waypoints, function(index, value) {
        uri += value.toString() + ";";
    });
    uri = uri.replace(/;$/, '');
    var stateObj = {
        waypoints: clone(waypoints),
        vehicle: vehicle
    };
    // Change URL
    window.history.pushState(stateObj, '', uri);
    initRouteFinder();
}

function changeVehicle(newVehicle) {
    var uri = '/route/start/' + newVehicle + '/';
    vehicle = newVehicle;
    refreshUrl();
}

function initRouteFinder() {
    $("#results").html("");
    // Remove Existing Markers
    clearMarkers();
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
    // Select the correct checkbox:
    $("#vehicle-chooser input[value=" + vehicle + "]").prop("checked", true);
    // Add the changed Listener to the Radio Buttons
    $(vehicleChooser).find("input[type=radio]").off();
    $(vehicleChooser).find("input[type=radio]").change(function() {
        changeVehicle($("input[type=radio]:checked").val());
    });
    // Let's check for existing waypoints
    if (typeof waypoints !== "undefined") {
        if (waypoints.length === 0) {
            waypoints.unshift('', '');
        } else if (waypoints.length === 1) {
            waypoints.unshift('');
        }
        var firstEmpty = false;
        var waypointHtml = $('<div id="waypoint-container" class="container-fluid"></div>');
        if (waypoints.length >= 1) {
            $.each(waypoints, function(index, value) {
                var html;
                if (typeof value[0] !== "undefined") {
                    var chr = String.fromCharCode(65 + index);
                    // So now the Pin
                    var el = $('<span id="' + chr + '" class="marker">' + chr + '</span>');
                    html = $('\
                        <div id="' + index + '" class="waypoint-list-item row" draggable="true" title="' + value[0] + '">\
                            <div class="waypoint-marker col-xs-2"></div>\
                            <div class="adress-name col-xs-10">' + value[0] +'</div>\
                        </div>');
                    $(html).find(".waypoint-marker").append(el);
                    // Add the correct value:
                    positionToAdress(value[0], value[1], $(html).find(".adress-name"));
                    addPositionMarker(value[0], value[1], index);
                } else {
                    if (!firstEmpty) {
                        html = $("<input id=\"" + index + "\" class=\"form-control\" placeholder=\"Klicke auf die Karte um diesen Wegpunkt einzufügen.\" value=\"\"></input>");
                        firstEmpty = true;
                    } else {
                        html = $("<input id=\"" + index + "\" class=\"form-control\" placeholder=\"\" value=\"\"></input>");
                    }
                    addSearchEvent(html);
                }
                $(waypointHtml).append(html);
            });
        }
        $("#route-content").append(waypointHtml);
    }
    // Describes the number of unfilled waypoints
    var unfilled = 0;
    if (waypoints[0] === '') {
        unfilled++;
    }
    if (waypoints[waypoints.length - 1] === '') {
        unfilled++;
    }
    if (typeof waypoints !== "undefined" && (waypoints.length - unfilled) >= 2) {
        var from = waypoints[0][0] + "," + waypoints[0][1];
        var lastIndex = waypoints.length - 1;
        var to = waypoints[lastIndex][0] + "," + waypoints[lastIndex][1];
        var points = "";
        $.each(waypoints, function(index, value) {
            if (value === '' || typeof value[0] === "undefined") {
                return;
            } else {
                points += value.toString() + ";";
            }
        });
        points = points.replace(/;+$/, '');
        var startButton = $("<div class=\"col-xs-6\"><a id=\"calc-route\" href=\"/route/" + vehicle + "/" + points + "\" class=\"\">Route berechnen</a></div>");
        var addWayPoint = $("<div class=\"col-xs-6\"><button type=\"button\" id=\"add-waypoint\" class=\"\">Wegpunkt hinzufügen</a></div>");
        var buttons = $("<div id=\"find-route-options\" class=\"container-fluid\"><div class=\"row\"></div></div>");
        $(buttons).find(".row").append(startButton);
        $(buttons).find(".row").append(addWayPoint);
        $("#route-content").append(buttons);

        // Add the Listener for adding Waypoints
        $("#add-waypoint").click(function() {
            clearMarkers();
            waypoints.splice(waypoints.length, 0, '');
            refreshUrl();
        });
        // We should add a Place to display Informations About the Route
        var routeInformation = $('<div id="route-information" class="row"><div id="length" class="col-md-6"></div><div id="duration" class="col-md-6"></div></div>')
        $("#route-content").prepend(routeInformation);
    }
    generatePreviewRoute();
    addDragAndDrop();
    initResults();
}
/*
 * Function to convert lat/lon into an adress String and Put it into the value attribute of the given input-object
 * @param{float} lon
 * @param{float} lat
 * @apram{Input-Object} obj
 */
function positionToAdress(lon, lat, obj) {
    var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + lat + "&lon=" + lon + "&zoom=18";
    $.get(url, function(data) {
        if (typeof data !== "undefined" && typeof data["display_name"] !== "undefined") {
            obj.html(data["display_name"]);
            obj.attr("title", data["display_name"]);
        }
    });
}

function addPositionMarker(lon, lat, index) {
    // This will work upto an index of 25
    // Caharacter Representation of the index:
    var chr = String.fromCharCode(65 + index);
    // So now the Pin
    var el = $('<span id="' + chr + '" class="marker">' + chr + '</span>');
    var pos = ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857');
    markers.push(addMarker(el, pos));
}
/*
 * Clears all Markers which are on the map
 */
function clearMarkers() {
    $.each(markers, function(index, value) {
        map.removeOverlay(value);
    });
    removeTemporarayMarker();
    markers = [];
    markerPositions = [];
}
/*
 * Generates Parameter to the Route until this point using the global waypoints variable
 * @return{String} QueryParameter
 */
function generateBase64Parameter() {
    if (typeof waypoints === "undefined") {
        return null;
    } else {
        var newWayPoints = [];
        $.each(waypoints, function(index, value) {
            if (value !== '') {
                newWayPoints.push(value);
            }
        });
        var points = btoa(waypoints.toString());
        return points;
    }
}
/*
 * This Function generates an Overview of the Route that will be calculated
 * and prints it on the map
 */
function generatePreviewRoute() {
    // First thing is to remove the eventually already existing Layer
    map.removeLayer(vectorLayerRoutePreview);
    var vectorS = new ol.source.Vector();
    var routeLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(255,0,0)',
            width: 5
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,.03)'
        })
    });
    if (waypoints.length < 2 || waypoints[0] === '' || (waypoints[waypoints.length - 1] === '' && waypoints.length === 2)) {
        return;
    } else {
        var points = "";
        $.each(waypoints, function(index, value) {
            if (value === '' || typeof value[0] === "undefined") {
                return;
            } else {
                points += value.toString() + ";";
            }
        });
        points = points.replace(/;+$/, '');
        // At this Point we can only Route between 2 Points so we have all the Information needed
        var url = '/route/preview/' + vehicle + '/' + points;
        // The Rest will be handled Asynchronious
        $.get(url, function(data) {
            var geojson = data["geojson"];
            var duration = data["duration"];
            var distance = data["distance"];
            $("#route-information #length").html(parseDistance(distance));
            $("#route-information #duration").html(parseDuration(duration));
            var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
                'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
            var feature = new ol.Feature({
                'geometry': geom
            });
            feature.setStyle(routeLineStyle);
            vectorS.addFeature(feature);
            vectorLayerRoutePreview = new ol.layer.Vector({
                source: vectorS
            });
            map.addLayer(vectorLayerRoutePreview);
        });
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
/*
 * This functions appends the drag and drop event for all waypoints
 * This allows us to switch the Position of the waypoints
 */
var draggedId = -5;

function addDragAndDrop() {
    $(".waypoint-list-item").on("dragstart", function(evt) {
        evt.originalEvent.dataTransfer.setData('text', evt.target.id);
        //Hide Original Element
        setTimeout(function() {
            $("#" + evt.target.id).addClass("hide");
        });
        draggedId = parseInt(evt.target.id);
    });
    $(".waypoint-list-item").on("dragend", function(evt) {
        $("#waypoint-container .hide").removeClass("hide");
    });
    $("#waypoint-container div").each(function(index, element) {
        $(element).on('dragover', function(evt) {
            var targetId = parseInt(evt.target.id);
            if (draggedId !== targetId) {
                evt.originalEvent.preventDefault();
                $("#waypoint-container .drop-target").remove();
                $(this).after('<hr class="drop-target" />');
            }
        });
        $(element).on('dragleave', function(evt) {
            $("#waypoint-container .drop-target").remove();
        });
        $(element).on('drop', function(evt) {
            evt.originalEvent.preventDefault();
            var data = parseInt(evt.originalEvent.dataTransfer.getData('text'));
            var target = parseInt($(this).attr("id"));
            if (data !== target) {
                if (data > target) target += 1;
                waypoints.move(data, target);
                refreshUrl();
            }
            draggedId = -5;
        });
    });
    // We need a special treatment to allow placing a waypoint at the start
    // For being able so we need to assign a special dragover,dragleave and drop event handler to the Nav-Tabs of the result
    var element = $("#results ul.nav-tabs, #route-information");
    $(element).on('dragover', function(evt) {
        var targetId = -1;
        if (draggedId !== targetId) {
            evt.originalEvent.preventDefault();
            $("#waypoint-container .drop-target").remove();
            $("#waypoint-container").prepend('<hr class="drop-target" />');
        }
    });
    $(element).on('dragleave', function(evt) {
        $("#waypoint-container .drop-target").remove();
    });
    $(element).on('drop', function(evt) {
        evt.originalEvent.preventDefault();
        var data = parseInt(evt.originalEvent.dataTransfer.getData('text'));
        var target = -1;
        if (data !== target) {
            if (data > target) target += 1;
            waypoints.move(data, target);
            initRouteFinder();
        }
        draggedId = -5;
    });
}
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
/* 
 * This Function adds the Search Event to the input Box to allow searching for any Waypoint
 * @param element{Object} Input-Field that needs the Listeners to be attached
 */
function addSearchEvent(element) {
    $(element).focusin(function() {
        var history = getHistory();
        if(gps || history.length > 0){
            var sr = $("<div id=\"search-results\"></div>");
            var res = $("<ul class=\"list list-unstyled\"></ul>");
            if(gps){
                var ownPosition = $("<li><img src=\"/img/marker-icon.png\" /> Eigene Position</li>");
                $(ownPosition).mousedown(function(){
                    navigator.geolocation.getCurrentPosition(function(position){
                        var id = $(element).attr("id");
                        waypoints[id] = [position.coords.longitude, position.coords.latitude];
                        refreshUrl();
                    }, function(error){
                        checkGPS();
                    });
                });
                $(res).append(ownPosition);
            }
            $.each(history, function(index, value){
                console.log(value);
                var r = $("<li>" + value.name + "</li>");
                $(r).mousedown(function(){
                    var id = $(element).attr("id");
                    waypoints[id] = [value.lon, value.lat];
                    addToHistory(value.name)
                    refreshUrl();
                });
                $(res).append(r);
            });
            
            $(sr).append(res);
            $(element).after(sr);
        }
        var searchButton = $("<a tab-index=\"-1\" href=\"#\" class=\"search-btn btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-search\"></span></a>");
        $(element).after(searchButton);
        var placeholder = $(element).attr("placeholder");
        $(element).attr("placeholder", "Suchworte eingeben");
        $(element).keypress(function(e) {
            if (e.which == 13) {
                $(searchButton).click();
            }
        });
        $(searchButton).mousedown(function(evt) {
            evt.preventDefault();
        });
        $(searchButton).click(function() {
            $("#search-results").remove();
            var searchResults = $("<div id=\"search-results\"><div class=\"loader\"><img src=\"/img/ajax-loader.gif\" /></div></div>");
            $(element).after(searchResults);
            var id = $(element).attr("id");
            var query = $(element).val();
            var url = "/route/search/" + encodeURI(query);
            $.getJSON(url, function(data) {
                var results = $("<ul class=\"list list-unstyled\"></ul>");
                $.each(data, function(index, value) {
                    var result = $("<li>" + value["display_name"] + "</li>");
                    $(results).append(result);
                    $(result).mousedown(function(evt) {
                        console.log(value);
                        addToHistory(value["display_name"], value["lon"], value["lat"]);
                        waypoints[id] = [parseFloat(value["lon"]), parseFloat(value["lat"])];
                        refreshUrl();
                    });
                    $(result).mouseover(function() {
                        addTemporaryMarker(value["lon"], value["lat"]);
                    });
                    $(result).mouseout(function() {
                        removeTemporarayMarker();
                    });
                });
                $(searchResults).find(".loader").remove();
                $(searchResults).append("<h5>Suchergebnisse für: \"" + query + "\"</h5>");
                $(searchResults).append(results);
            });
        });
        $(element).focusout(function(evt) {
            $("#search-results").remove();
            $(element).off();
            $(element).val("");
            addSearchEvent(element);
            $(element).attr("placeholder", placeholder);
            $(".search-btn").remove();
        });
    });
}

function getHistory(){
    var präfix = "place-search:";
    var result = [];

    if(localStorage){
        var reg = new RegExp("^" + präfix, '');
        $.each(localStorage, function(key, value){
            if(key.match(reg) !== null && value.match(/^\d+;\d+\.\d+,\d+\.\d+$/) !== null ){
                var match = value.match(/([\d]+?);([\d\.]+),([\d\.]+)/);
                var count = parseInt(match[1]);
                var lon = parseFloat(match[2]);
                var lat = parseFloat(match[3]);
                var name = atob(key.replace(präfix, ''));
                result.push({
                    name: name,
                    count: count,
                    lon: lon,
                    lat: lat
                });
            }
        });
        result.sort(function(a, b){
            return b.count-a.count
        });
    }
    return result;
}

function addToHistory(name, lon, lat){
    if(localStorage){
        var präfix = "place-search:";
        var key = btoa(name);
        // Check if item exists:
        var item = localStorage.getItem(präfix + key);
        if(item === null){
            localStorage.setItem(präfix + key, "1;" + lon + "," + lat);
        }else{
            var count = parseInt(item.match(/^(\d+);/)[1]);
            count++;
            localStorage.setItem(präfix + key, count + ";" + lon + "," + lat);
        }
    }
}

function clearHistory(itemCount){
    var präfix = "place-search:";
    var result = [];

    if(localStorage){
        var reg = new RegExp("^" + präfix, '');
        $.each(localStorage, function(key, value){
            if(key.match(reg) !== null && value.match(/^\d+;\d+\.\d+,\d+\.\d+$/) !== null ){
                var match = value.match(/([\d]+?);([\d\.]+),([\d\.]+)/);
                var count = parseInt(match[1]);
                var lon = parseFloat(match[2]);
                var lat = parseFloat(match[3]);
                var name = atob(key.replace(präfix, ''));
                result.push({
                    name: name,
                    count: count,
                    lon: lon,
                    lat: lat
                });
                localStorage.removeItem(key);
            }
        });
        result.sort(function(a, b){
            return b.count-a.count
        });
        for(var i = 0; i < itemCount; i++){
            if(i < result.length){
                var key = btoa(name);
                localStorage.setItem(präfix + key, result[i].count+ ";" + result[i].lon + "," + result[i].lat);
            }else{
                break;
            }
        }
    }
}
var marker = null;

function addTemporaryMarker(lon, lat) {
    // So now the Pin
    var el = $('<span class="marker"></span>');
    var pos = ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857');
    if (marker !== null) {
        map.removeOverlay(marker);
        marker = null;
    }
    marker = addMarker(el, pos);
}

function removeTemporarayMarker() {
    if (marker !== null) {
        map.removeOverlay(marker);
        marker = null;
    }
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}