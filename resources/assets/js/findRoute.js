/*
 * Different things need to be done to be able to find the points to route to
 * First thinkg would be to prepare the Results Div
 */
var vectorLayerRoutePreview;
var markers = [];
var autoChooseVehicle = true;
var findRouteInitialized = false;
var paddingRight = null;
function start(){

    // The GPS Location is tricky
    // It takes time on the one hand and waits for approval of sharing the Location on the other hand
    // Under some circumstances the following scenario can occure:
    // The User wants to derive a route from his own Position
    // We have to wait for the geolocation API to finish but in case of a failure of retrieving Location data we need to do something
    // So check here wheter a GPS Location is needed (one waypoint is "gps") AND the GPS Position isn't ready
    var needGPS = false;
    deinitStartNavigation();
    $.each(waypoints, function(index, value){
        if(value === "gps"){
            needGPS = true;
            return;
        }
    });
    if((needGPS && !gps) || findRouteInitialized){
        // If this is the case we will simply return here.
        // If the geolocation API got triggered, then another call to this function will
        // happen, when the gpsLocation is available
        return;
    }else{
        findRouteInitialized = true;
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

    map.un("moveend", updateUrl);

    if (getWayPointLength() >= 1) {
        var points = [];
        $.each(waypoints, function(index, value){
            if(value === 'gps'){
                points.push(gpsLocation);
            }else{
                points.push(value);
            }
        });
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
    // To be consistent for multiple calls we need to remove eventually existing interfaces
    $("#vehicle-chooser").remove();
    $("#route-content").remove();

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
            <button type=\"button\" class=\"close\" aria-label=\"Close\" title=\"Routenplanung abbrechen\">\
              <span aria-hidden=\"true\">&times;</span>\
            </button>\
        </div>\
        ");
    $(vehicleChooser).find(".close").click(function(){
        document.location.href = "/";
    });
    $("#search-addon").prepend(vehicleChooser);
    var routeContent = $("<div id=\"route-content\" class=\"container-fluid\"></div>");
    $("#results").append(routeContent);
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
        var waypointHtml = $('<ul id="waypoint-container" class="row"></ul>');
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
    var countLoggedWaypoints = 0;
    $.each(waypoints, function(index, value){
        if(value !== ""){
            countLoggedWaypoints++;
        }
    });
    // We give adjust the view so the route is not under the result list
    paddingRight = 0;
    if(parseInt( $(document).outerWidth()) > 768 && $("#results").attr("data-status") === "out" ){
        paddingRight = $("#search-addon").outerWidth();
    }
    if (countLoggedWaypoints < 2 ) {
        if(countLoggedWaypoints === 1){
            // Let's Zoom into this point
            var point = null;
            $.each(waypoints, function(index, value){
                if(value !== ""){
                    point = value;
                    return false;
                }
            });
            if(point === "gps"){
                point = gpsLocation;
            }
            point = ol.proj.transform(point, 'EPSG:4326', 'EPSG:3857');
            map.getView().animate({
                center: point,
                zoom: 15,
                duration: 1500,
                padding: [5, paddingRight, 5, 5]
            });
        }
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

            map.getView().fit(geom, {
                duration: 1500,
                padding: [5, (paddingRight + 20), 5, 6],
                maxZoom: 18,
            });
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

/* 
 * This Function adds the Search Event to the input Box to allow searching for any Waypoint
 * @param element{Object} Input-Field that needs the Listeners to be attached
 */
function addSearchEvent(element) {

    if($(document).outerWidth() > 768){
        addSearchEventDesktop(element);
    }else{
        addSearchEventMobile(element);
    }
}

function addSearchEventMobile(element){
    $(element).focusin(function(){
        // Create a new Input Field for searches
        var input = $('\
            <form accept-charset="UTF-8" class="form-inline" onsubmit="return false;">\
                <div class="form-group">\
                    <div class="input-group">\
                        <div class="input-group-addon" id="exit-suggestions">\
                            <span class="glyphicon glyphicon-arrow-left">\
                            </span>\
                        </div>\
                        <input class="form-control" name="query" placeholder="Karten durchsuchen..." type="text" autocomplete="off" value="' + $(element).val() + '"/>\
                        <div class="input-group-addon" id="search-for-suggestions">\
                            <button type="submit" class="glyphicon glyphicon-search">\
                            </button>\
                        </div>\
                    </div>\
                </div>\
            </form>');
        $("#search-suggestions").append(input);
        $("#search-addon").css("display", "none");

        if(gps){
            var suggestion = $('\
                <div class="container-fluid suggestion">\
                     <div class="flex-container">\
                        <div class="item history">\
                            <img src="/img/marker-icon.png" />\
                        </div>\
                        <div class="item">\
                            Eigene Position\
                        </div>\
                    </div>\
                </div>\
            ');
            $("#search-suggestions").append(suggestion);
            $(suggestion).click(function(){
                
                $("#search-suggestions").animate({top: "100vh"}, 500, function(){
                    $("#search-addon").css("display", "");
                    $("#search-suggestions").html("");
                    $("#search-suggestions").attr("data-status", "");

                    var id = $(element).attr("id");
                    waypoints[id] = 'gps';
                    refreshUrl();
                });
            });
        }

        var history = getHistory(true);

        if(history.length > 0){
            $.each(history, function(index, value){
                if(typeof(value) !== "undefined"){
                    var distance = "";
                    if(gps){
                        // If we have a gps Position we can show the proximate distance to the object:
                        var pos = [parseFloat(value["lon"]), parseFloat(value["lat"])];
                        var dist = getDistance(gpsLocation, pos);
                        distance = "<p class=\"dist\">~" + parseDistance(dist) + "</p>";
                    }
                    var suggestion = $('\
                        <div class="container-fluid suggestion">\
                            <div class="flex-container">\
                                <div class="item history">\
                                    <span class="glyphicon glyphicon-time"></span>\
                                    ' + distance + '\
                                </div>\
                                <div class="item">\
                                    ' + value["name"] + '\
                                </div>\
                            </div>\
                        </div>\
                        ');
                    $("#search-suggestions").append(suggestion);
                    $(suggestion).click(function(){
                        $("#search-suggestions").animate({top: "100vh"}, 500, function(){
                            $("#search-addon").css("display", "");
                            $("#search-suggestions").html("");
                            $("#search-suggestions").attr("data-status", "");

                            var id = $(element).attr("id");
                            waypoints[id] = [parseFloat(value["lon"]), parseFloat(value["lat"])];
                            refreshUrl();
                        });
                    });
                }
            });
        }

        $("#search-suggestions form").submit(function(evt){
            // The user has probably entered something to search for
            // Make form readonly and disable additional searches while we execute the search
            console.log("haha");
            $("#search-suggestions input[name=query]").attr("readonly", "");
            $("#search-suggestions input[name=query]").blur();
            $("#search-suggestions button[type=submit]").attr("disabled", "");

            $("#sr").remove();

            var freeSearchField = function(){
                $("#search-suggestions input[name=query]").removeAttr("readonly");
                $("#search-suggestions button[type=submit]").removeAttr("disabled");
                $("#loading").remove();
            };


            // Fetch the query:
            var q = $("#search-suggestions input[name=query]").val();
            if(q === ""){
                freeSearchField();
                makeError($("#search-suggestions input[name=query]"), "Bitte Sucheingabe ergänzen!");
                $("#search-suggestions input[name=query]").focus();
                return;
            }

            $(this).after('\
                <div id="loading" class="container-fluid suggestion">\
                    <div class="flex-container">\
                        <div class="item">\
                            <img src="/img/ajax-loader.gif" alt="loading..." />\
                            Lade Suchergebnisse vom Server...\
                        </div>\
                    </div>\
                </div>');
            $(this).after('\
                <div id="sr">\
                </div>');

            // Prepare the URL
            var url = "/route/search/" + encodeURI(q);
            var xhr = $.get(url, function(data){
                if(data.length === 0){
                    makeError($("#search-suggestions input[name=query]"), "Keine Ergebnisse gefunden.");
                }
                $.each(data, function(index, value){
                    var distance = "";
                    if(gps){
                        // If we have a gps Position we can show the proximate distance to the object:
                        var pos = [parseFloat(value["lon"]), parseFloat(value["lat"])];
                        var dist = getDistance(gpsLocation, pos);
                        distance = "<p class=\"dist\">~" + parseDistance(dist) + "</p>";
                        console.log(distance);
                    }
                    var res = $('\
                        <div class="container-fluid suggestion result">\
                            <div class="flex-container">\
                                <div class="item history">\
                                    ' + (index+1) + '\
                                    ' + distance + '\
                                </div>\
                                <div class="item">'
                                     + buildResultFromData(value).html() + '\
                                </div>\
                            </div>\
                        </div>');
                    $("#search-suggestions #sr").append(res);
                    $(res).click(function(){
                        $("#search-suggestions").animate({top: "100vh"}, 500, function(){
                            $("#search-addon").css("display", "");
                            $("#search-suggestions").html("");
                            $("#search-suggestions").attr("data-status", "");

                            var id = $(element).attr("id");
                            waypoints[id] = [parseFloat(value["lon"]), parseFloat(value["lat"])];
                            refreshUrl();
                        });
                    });
                });
                $("#search-suggestions .result a.btn").remove();
            })
            .always(function(){
                freeSearchField();
            });


        });

        $("#search-suggestions").css("padding-top", "15px");
        $("#search-suggestions").animate({top: "0vh"}, 500, function(){
            $("#search-suggestions").attr("data-status", "out");
            $("#search-suggestions input[name=query]").focus();
            $("#exit-suggestions").click(function(){
                $("#search-suggestions").animate({top: "100vh"}, 500, function(){
                    $("#search-addon").css("display", "");
                    $("#search-suggestions").html("");
                    $("#search-suggestions").css("padding-top", "");
                    $("#search-suggestions").attr("data-status", "");
                });
            });
        });
        
    });
}

function addSearchEventDesktop(element){
    $(element).focusin(function() {
        
        $(element).css("border", "");
        $(element).tooltip("destroy");
        var history = getHistory(true);
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