/*
 * Different things need to be done to be able to find the points to route to
 * First thinkg would be to prepare the Results Div
 */
var vectorLayerRoutePreview;
var markers = [];
var autoChooseVehicle = true;

function start(){

    // The GPS Location is tricky
    // It takes time on the one hand and waits for approval of sharing the Location on the other hand
    // Under some circumstances the following scenario can occure:
    // The User wants to derive a route from his own Position
    // We have to wait for the geolocation API to finish but in case of a failure of retrieving Location data we need to do something
    // So check here wheter a GPS Location is needed (one waypoint is "gps") AND the GPS Position isn't ready
    var needGPS = false;
    $.each(waypoints, function(index, value){
        if(value === "gps"){
            needGPS = true;
            return;
        }
    });
    if(needGPS && gpsLocation === null){
        // If this is the case we will simply return here.
        // If the geolocation API got triggered, then another call to this function will
        // happen, when the gpsLocation is available
        return;
    }

    // Put the Popstate Event:
    $(window).unbind('popstate');
    $(window).bind('popstate', function(event) {
        var state = event.originalEvent.state;
        autoChooseVehicle = false;
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

    refreshUrl();

    map.un("singleclick", mapClickFunction);
    map.on('singleclick', function(evt) {
        var pos = evt["coordinate"];
        addWaypoint(pos);
    });

    if (getWayPointLength() >= 1) {
        var points = [];
        $.each(waypoints, function(index, value){
            if(value === 'gps'){
                points.push(gpsLocation);
            }else{
                points.push(value);
            }
        });
        adjustViewPosList(points);
    }
};

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
    map.removeLayer(vectorLayerRoutePreview);
    // Remove Existing Markers
    clearMarkers();
    var vehicleChooser = $("<div id=\"vehicle-chooser\">\
            <label class=\"radio-inline\" title=\"Fußgänger\">\
              <input type=\"radio\" name=\"vehicle\" value=\"foot\"> <div><img src=\"/img/silhouette-walk.png\" height=\"20px\" /></div>\
            </label>\
            <label class=\"radio-inline\" title=\"Fahrrad\">\
              <input type=\"radio\" name=\"vehicle\" value=\"bicycle\"> <div><img src=\"/img/bike.png\" height=\"20px\" /></div>\
            </label>\
            <label class=\"radio-inline\" title=\"Auto\">\
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
        autoChooseVehicle = false;
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
        var waypointHtml = $('<ul id="waypoint-container"></ul>');
        if (waypoints.length >= 1) {
            if(waypoints[0] === ""){
                html = $("<div class=\"container-fluid new-waypoint-box\"><p>Startpunkt angeben:\
                    <button type=\"button\" class=\"\" \
                        data-html=\"true\"\
                        data-trigger=\"hover\"\
                        data-toggle=\"popover\"\
                        data-placement=\"bottom\"\
                        data-container=\"body\"\
                        title=\"Wegpunkt definieren\" \
                        data-content=\"Sie können neue Wegpunkte auf 2 Arten definieren:<ol><li>Klicken Sie einfach auf der Karte auf den Punkt, den Sie einfügen möchten.</li><li>Sie können nach Orten Suchen indem Sie ihre Suchworte in das Eingabefeld eintragen und entweder Enter drücken, oder auf das kleine Lupensymbol klicken. Wählen Sie dann einfach das passende Ergebnis durch Klick aus.</li></ol>\">\
                        <span class=\"glyphicon glyphicon-question-sign\"></span>\
                    </button></p><input id=\"0\" class=\"form-control\" placeholder=\"Klicke auf die Karte um diesen Wegpunkt einzufügen.\" value=\"\"></input></div>");
                addSearchEvent($(html).find("input"));
                $("#route-content").append(html);
                
                firstEmpty = true;
            }
            $.each(waypoints, function(index, value) {
                var html;
                if (typeof value[0] !== "undefined" || value === 'gps') {
                    var chr = String.fromCharCode(65 + index);
                    // So now the Pin
                    var el = $('<span id="' + chr + '" class="marker">' + chr + '</span>');
                    html= $('\
                        <li id="' + index + '" class="waypoint-list-item container-fluid" title="' + value[0] + '">\
                            <div class="row">\
                                <div class="waypoint-marker col-xs-2"></div>\
                                <div class="adress-name col-xs-8">' + value[0] + '</div>\
                                <div class="delete-waypoint col-xs-2" data-id="' + index + '" title="Wegpunkt löschen"><a href="javascript:deleteWaypoint('+index+');"><span class="glyphicon glyphicon-trash"></span></a></div>\
                            </div>\
                        </li>\
                        ');
                    $(html).find(".waypoint-marker").append(el);
                    // Add the correct value:
                    var lon = "";
                    var lat = "";
                    if (value === 'gps') {
                        var pos = gpsLocation;
                        lon = pos[0];
                        lat = pos[1];
                        positionToAdress('gps', $(html).find(".adress-name"));
                    } else {
                        lon = value[0];
                        lat = value[1];
                        positionToAdress([lat, lon], $(html).find(".adress-name"));
                    }
                    
                    addPositionMarker(lon, lat, index);
                    $(waypointHtml).append(html);
                } else {
                    /*
                    
                    addSearchEvent(html);
                    */
                }
                

            });
            $("#route-content").append(waypointHtml);
            if(waypoints[waypoints.length-1] === ""){
                if (!firstEmpty) {
                    html = $("<div class=\"container-fluid new-waypoint-box\"><p>Ziel angeben:\
                    <button type=\"button\" class=\"\" \
                        data-html=\"true\"\
                        data-trigger=\"hover\"\
                        data-toggle=\"popover\"\
                        data-placement=\"bottom\"\
                        data-container=\"body\"\
                        title=\"Wegpunkt definieren\" \
                        data-content=\"Sie können neue Wegpunkte auf 2 Arten definieren:<ol><li>Klicken Sie einfach auf der Karte auf den Punkt, den Sie einfügen möchten.</li><li>Sie können nach Orten Suchen indem Sie ihre Suchworte in das Eingabefeld eintragen und entweder Enter drücken, oder auf das kleine Lupensymbol klicken. Wählen Sie dann einfach das passende Ergebnis durch Klick aus.</li></ol>\">\
                        <span class=\"glyphicon glyphicon-question-sign\"></span>\
                    </button></p><input id=\"" + (waypoints.length-1) + "\" class=\"form-control\" placeholder=\"Klicke auf die Karte um diesen Wegpunkt einzufügen.\" value=\"\"></input></div>");
                    firstEmpty = true;
                } else {
                    html = $("<div class=\"container-fluid new-waypoint-box\"><p>Wegpunkt hinzufügen:\
                    <button type=\"button\" class=\"\" \
                        data-html=\"true\"\
                        data-trigger=\"hover\"\
                        data-toggle=\"popover\"\
                        data-placement=\"bottom\"\
                        data-container=\"body\"\
                        title=\"Wegpunkt definieren\" \
                        data-content=\"Sie können neue Wegpunkte auf 2 Arten definieren:<ol><li>Klicken Sie einfach auf der Karte auf den Punkt, den Sie einfügen möchten.</li><li>Sie können nach Orten Suchen indem Sie ihre Suchworte in das Eingabefeld eintragen und entweder Enter drücken, oder auf das kleine Lupensymbol klicken. Wählen Sie dann einfach das passende Ergebnis durch Klick aus.</li></ol>\">\
                        <span class=\"glyphicon glyphicon-question-sign\"></span>\
                    </button></p><input id=\"" + (waypoints.length-1) + "\" class=\"form-control\" value=\"\"></input></div>");
                }
                addSearchEvent($(html).find("input"));
                $("#route-content").append(html);
            }
            // Enable the Popoversfor this element:
            $("#route-content button[data-toggle=popover]").popover();
        }
        
    }
    // Describes the number of unfilled waypoints
    var unfilled = 0;
    if (waypoints[0] === '') {
        unfilled++;
    }
    if (waypoints[waypoints.length - 1] === '') {
        unfilled++;
    }
    if (typeof waypoints !== "undefined" && (waypoints.length - unfilled) >= 2 ) {
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
            var newWaypoints = [];
            $.each(waypoints, function(index, value){
                if(index === 0){
                    newWaypoints.push(value);
                }else if(index > 0 && value !== ""){
                    newWaypoints.push(value);
                }
            });
            newWaypoints.push('');
            waypoints = newWaypoints;
            refreshUrl();
        });
        // We should add a Place to display Informations About the Route
        var routeInformation = $('<div id="route-information" class="row"><div id="length" class="col-xs-6"></div><div id="duration" class="col-xs-6"></div></div>')
        $("#route-content").prepend(routeInformation);
    }
    generatePreviewRoute();
    addDragAndDrop();
    toggleResults("out");
}

function deleteWaypoint(index){
    waypoints[index] = "";
    refreshUrl();
}

/*
 * Function to convert lat/lon into an adress String and Put it into the value attribute of the given input-object
 * @param{float} lon
 * @param{float} lat
 * @apram{Input-Object} obj
 */
function positionToAdress(pos, obj) {
    if (pos === 'gps') {
        obj.html('Eigener Standort');
        obj.attr('title', 'Eigener Standort');
    } else {
        var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + pos[0] + "&lon=" + pos[1] + "&zoom=18";
        $.get(url, function(data) {
            if (typeof data !== "undefined" && typeof data["display_name"] !== "undefined") {
                obj.html(data["display_name"]);
                obj.attr("title", data["display_name"]);
            }
        });
    }
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
                if (value === 'gps') {
                    points += gpsLocation.toString() + ";";
                } else {
                    points += value.toString() + ";";
                }
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
            map.removeLayer(vectorLayerRoutePreview);
            vectorLayerRoutePreview = null;
            vectorLayerRoutePreview = new ol.layer.Vector({
                source: vectorS
            });
    
            map.addLayer(vectorLayerRoutePreview);

            if(autoChooseVehicle){
                // We change the vehicle to the probably best fitting
                var prevVehicle = vehicle;
                if(distance < 2000){
                    vehicle = "foot";
                }else if(distance < 10000){
                    vehicle = "bicycle";
                }else{
                    vehicle = "car";
                }
                if(prevVehicle !== vehicle){
                    refreshUrl();
                }
            }
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
function addDragAndDrop() {
    // We will add Drag and Drop only if there are enough Waypoints to reorder:
    var count = $("#waypoint-container > li").length;
    if(count < 2){
        return;
    }
    $("#waypoint-container").before('<div id="rearange-info">Sortiere die Wegpunkte mit Drag \'n Drop</div>');
    $( "#waypoint-container" ).sortable({
        cancel: ".delete-waypoint",
        items: ">li",
        update: function(event, ui){
            var draggedId = parseInt(ui.item.attr("id"));
            var newPos = null;
            $("#waypoint-container > li").each(function(index, value){
                var id = parseInt($(value).attr("id"));
                if(draggedId === id){
                    newPos = index;
                    return false;
                }
            });
            if(newPos !== null){
                waypoints.move(draggedId, newPos);
                refreshUrl();
            }
        }
    });
    $( "#waypoint-container" ).disableSelection();
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
        $(element).css("border", "");
        $(element).tooltip("destroy");
        var history = getHistory();
        if (gps || history.length > 0) {
            var sr = $("<div id=\"search-results\"></div>");
            if (gps) {
                var res = $("<ul class=\"list list-unstyled\"></ul>");
                var ownPosition = $("<li><img src=\"/img/marker-icon.png\" /> Eigene Position</li>");
                $(ownPosition).mousedown(function() {
                    var id = $(element).attr("id");
                    waypoints[id] = 'gps';
                    refreshUrl();
                });
                $(res).append(ownPosition);
                $(sr).append(res);
            }
            if (history.length > 0) {
                $(sr).append("<h5>Ergebnisse aus der <a href=\"/help/history\" target=\"_blank\">History</a></h5>");
                var res = $("<ul class=\"list list-unstyled\"></ul>");
                $.each(history, function(index, value) {
                    var r = $("<li>" + value.name + "</li>");
                    $(r).mousedown(function() {
                        var id = $(element).attr("id");
                        waypoints[id] = [value.lon, value.lat];
                        addToHistory(value.name, value.lon, value.lat);
                        refreshUrl();
                    });
                    $(res).append(r);
                });
                $(sr).append(res);
            }
            $(element).after(sr);
            $(element).unbind("keyup");
            $(element).keyup(function() {
                var val = escapeRegExp($(this).val());
                var reg = new RegExp(val, 'i');
                // Hide all Elements where the String does not match and unhide all where it matches:
                $("#search-results li").each(function(index, value) {
                    var name = $(value).html();
                    var el = $("#search-results li")[index];
                    if (name.match(reg) !== null) {
                        $(el).removeClass("hidden");
                    } else {
                        $(el).addClass("hidden");
                    }
                });
            });
        }
        var searchButton = $("<a tab-index=\"-1\" class=\"search-btn btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-search\"></span></a>");
        // Remove possibly existing search Buttons:
        $(element).parent().find(".search-btn").remove();
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
            if($(element).val() !== ""){
                $(element).css("border", "3px solid #c9302c");
                $(element).tooltip({
                    "title": "Sie haben noch keine Suche durchgeführt. Klicken Sie auf die Lupe und wählen eins der Ergebnisse aus um diesen Wegpunkt hinzuzufügen.",
                    "trigger": "manual",
                    "placement": "auto"
                }).tooltip("show");
            }else{
                $(".search-btn").remove();
            }
            //$(element).val("");
            addSearchEvent(element);
            $(element).attr("placeholder", placeholder);
            
        });
    });
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function getHistory() {
    var präfix = "place-search:";
    var result = [];
    if (localStorage) {
        var reg = new RegExp("^" + präfix, '');
        $.each(localStorage, function(key, value) {
            if (key.match(reg) !== null && value.match(/^\d+;\d+\.\d+,\d+\.\d+$/) !== null) {
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
        result.sort(function(a, b) {
            return b.count - a.count
        });
    }
    return result;
}

function saveHistory(history, präfix) {
    if (localStorage) {
        // Das abspeichern der neuen History verläuft in 2 Schritten:
        // 1. Löschen der vorhanden History
        // 2. Hinzufügen der neuen History
        // 1. Löschen der vorhandenen History
        clearHistory(präfix);
        // 2. Hinzufügen der neuen History
        $.each(history, function(index, value) {
            var key = präfix + btoa(value.name);
            var val = value.count + ";" + value.lon + "," + value.lat;
            localStorage.setItem(key, val);
        });
    }
}

function clearHistory(präfix) {
    var oldhistory = getHistory();
    $.each(oldhistory, function(index, value) {
        var key = präfix + btoa(value.name);
        localStorage.removeItem(key);
    });
}

function addToHistory(name, lon, lat) {
    if (localStorage) {
        var präfix = "place-search:";
        var key = btoa(name);
        var historyLimit = 10;
        // Let's get the sorted List of Results
        var history = getHistory();
        // Check if item exists:
        var item = localStorage.getItem(präfix + key);
        if (item === null) {
            // Item ist noch nicht in der History. Es wird an die erste Stelle gesetzt
            if (history.length >= historyLimit) {
                // Zuerst das letzte Element entfernen, da unsere History voll ist
                history.pop();
            }
            // Nun fügen wir das neue Element hinzu:
            history.unshift({
                name: name,
                count: 10,
                lon: lon,
                lat: lat
            });
        } else {
            // Item ist bereits in der History. Es wird einen Platz nach oben gepackt.
            var itemIndex = parseInt(item.match(/^\d+/)[0]);
            // Der angezeigte Index ist eine Zahl zwischen 1 und 10 wobei 10 das erste Element ist und 1 das letzte
            // Wir konvertieren diese Zahl zum Array-Index
            itemIndex = Math.abs(itemIndex - 10);
            // Wir verschieben das Array Element jetzt um einen Platz nach vorne, also z.B: Element an stelle 4 kommt an stelle 3 etc.
            history.move(itemIndex, itemIndex - 1);
        }
        // Jetzt müssen wir noch den Count Parameter für jedes Element aktualisieren:
        var newHistory = [];
        $.each(history, function(index, value) {
            var c = historyLimit - index;
            newHistory.push({
                name: value.name,
                count: c,
                lon: value.lon,
                lat: value.lat
            });
        });
        saveHistory(newHistory, präfix);
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

function getWayPointLength(){
    var count = 0;
    $.each(waypoints, function(index, value){
        if(value !== ''){
            count++;
        }
    });
    return count;
}