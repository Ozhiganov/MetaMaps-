var map;
var extent;
var overlays = [];
var vectorSource = new ol.source.Vector();
var lastClick;
var popupOverlay;
var vectorLayer;
var id = null;
var userPositionMarker = null;
var lockViewToPosition = true;
var gps = false;
var gpsLocation = null;
var featureStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgb(153,39,208)',
        lineDash: [4, 8]
    }),
    fill: new ol.style.Fill({
        color: 'rgba(153,39,208,.03)'
    })
});
var mapClickFunction = function(evt) {
    var pos = ol.proj.transform(evt["coordinate"], 'EPSG:3857', 'EPSG:4326');
    lastClick = pos;
    getNearest(pos[0], pos[1]);
};

var clearInputFunction = function() {
    $("#search input[name=q]").val('');
    $("#search input[name=q]").focus();
    clearPOIS();
    $.each(overlays, function(index, value) {
        map.removeOverlay(value);
        $("#popup-closer").click();
    });
    deinitResults();
    $("#clearInput").off();
    searchResults = null;
    if(typeof updateUrl === "function"){
        updateUrl();
    }
};
var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };
$(document).ready(function() {
    // Initialize the Map
    initMap();

    if(getPosition){
        checkGPS(startApplication);
    }else{
        startApplication();
    }

    map.on('singleclick', mapClickFunction);
    $("#follow-location > span.button").click(function() {
        followLocation();
    });
    $("#lock-location > span.button").click(function() {
        toggleViewLock();
    });
});

function updateMapExtent() {
    var tmpExtent = map.getView().calculateExtent(map.getSize());
    extent = ol.proj.transform([tmpExtent[0], tmpExtent[1]], 'EPSG:3857', 'EPSG:4326').concat(ol.proj.transform([tmpExtent[2], tmpExtent[3]], 'EPSG:3857', 'EPSG:4326'));
}

function numberWithPoints(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function deinitSearchBox() {
    $("#search").remove();
}

function initStartNavigation() {
    $("#clearInput").html('<a href="/route/start/foot" target="_self"><img src="/img/navigation-arrow.svg" height="20px"></a>');
    $("#clearInput").off();
    $("#clearInput").attr("title", "Routenplaner starten");
}

function initClearInput() {
    $("#clearInput").html('<span class="font-bold">X</span>');
    $("#clearInput").off();
    $("#clearInput").click(clearInputFunction);
    $("#clearInput").attr("title", "Sucheingabe löschen");
}

var resultsHeight = $(window).height() - 80;
function toggleResults(status) {
    var currentStatus = $("#results").attr("data-status");
    if (typeof status === "undefined") {
        status = currentStatus;
        if(status === "in")
            status = "out";
        else if(status === "out")
            status = "in";
        else
            status = "in";
    } else if (status !== "in" && status !== "out") {
        status = "in";
    }
    if (status === "in" && currentStatus !== "in") {
        $("#results").attr("data-status", "in");
        $("#result-toggler").html("Liste anzeigen")
        $("#results").animate({"max-height": 0}, 600);
    } else if(status === "out" && currentStatus !== "out"){
        $("#results").attr("data-status", "out");
        $("#result-toggler").html("Liste ausblenden")
        $("#results").animate({"max-height": resultsHeight}, 600);
        if($("#result-toggler").hasClass("hidden")){
            $("#result-toggler").removeClass("hidden");
        }
    }
}

function adjustView(results, limit) {
    if(limit === null){
        limit = results.length;
    }
    if (results.length <= 0) return;
    var minPosition = [];
    var maxPosition = [];
    for (var i = 0; i < limit; i++) {
        if (typeof minPosition[0] === 'undefined' || minPosition[0] > parseFloat(results[i]["lon"])) {
            minPosition[0] = parseFloat(results[i]["lon"]);
        }
        if (typeof minPosition[0] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && minPosition[0] > parseFloat(results[i]["boundingbox"][2]))) {
            minPosition[0] = parseFloat(results[i]["boundingbox"][2]);
        }
        if (typeof minPosition[1] === 'undefined' || minPosition[1] > parseFloat(results[i]["lat"])) {
            minPosition[1] = parseFloat(results[i]["lat"]);
        }
        if (typeof minPosition[1] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && minPosition[1] > parseFloat(results[i]["boundingbox"][0]))) {
            minPosition[1] = parseFloat(results[i]["boundingbox"][0]);
        }
        if (typeof maxPosition[0] === 'undefined' || maxPosition[0] < parseFloat(results[i]["lon"])) {
            maxPosition[0] = parseFloat(results[i]["lon"]);
        }
        if (typeof maxPosition[0] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && maxPosition[0] < parseFloat(results[i]["boundingbox"][3]))) {
            maxPosition[0] = parseFloat(results[i]["boundingbox"][3]);
        }
        if (typeof maxPosition[1] === 'undefined' || maxPosition[1] < parseFloat(results[i]["lat"])) {
            maxPosition[1] = parseFloat(results[i]["lat"]);
        }
        if (typeof maxPosition[1] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && maxPosition[1] < parseFloat(results[i]["boundingbox"][1]))) {
            maxPosition[1] = parseFloat(results[i]["boundingbox"][1]);
        }
        /*if (typeof results[i]["type"] !== 'undefined' && (results[i]["type"] === 'city' || results[i]["type"] === 'administrative' || results[i]["type"] === 'river')) {
            break;
        }*/
    }
    minPosition = ol.proj.transform(minPosition, 'EPSG:4326', 'EPSG:3857');
    maxPosition = ol.proj.transform(maxPosition, 'EPSG:4326', 'EPSG:3857');

    if(minPosition.length === 2 && maxPosition.length === 2){
        // If this is not on a mobile AND the Results are Visible, we fit the Results to the left of the List
        var paddingRight = 0;
        if(parseInt( $(document).outerWidth()) > 768 && $("#results").attr("data-status") === "out" ){
            paddingRight = $("#search-addon").outerWidth();
        }

        map.getView().fit([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], { duration: 1500, nearest: true, maxZoom: 18, padding: [0, paddingRight, 0, 0]});
    }
}
/**
 * Parsesan OSM-Address-Object for the Road-Name
 * @param {Array} address
 * @return {String} roadname
 */
function getRoad(address) {
    var road = "";
    if (typeof address["road"] !== 'undefined') {
        road = address["road"];
    } else if (typeof address["pedestrian"] !== 'undefined') {
        road = address["pedestrian"];
    } else if (typeof address["path"] !== 'undefined') {
        road = address["path"];
    } else if (typeof address["footway"] !== 'undefined') {
        road = address["footway"];
    }
    return road;
}
/**
 * Parse an OSM-Address-Object for the House Number
 * @param {Array} address
 * @return {String} Housenumber
 */
function getHouseNumber(address) {
    var house_number = typeof address["house_number"] !== 'undefined' ? address["house_number"] : "";
    return house_number;
}
/**
 * Parse an OSM-Address-Object for the City (including Zip-Code)
 * @param {Array} address
 * @return {String} City
 */
function getCity(address) {
    var city = typeof address["postcode"] !== 'undefined' ? address["postcode"] + " " : "";
    if (typeof address["city"] !== "undefined") {
        city += address["city"];
    } else if (typeof address["town"] !== "undefined") {
        city += address["town"];
    } else if (typeof address["village"] !== "undefined") {
        city += address["village"];
    }
    return city;
}

function adjustViewBoundingBox(minpos, maxpos, padding) {
    minPosition = ol.proj.transform(minpos, 'EPSG:4326', 'EPSG:3857');
    maxPosition = ol.proj.transform(maxpos, 'EPSG:4326', 'EPSG:3857');
    if(typeof padding === "undefined"){
        padding = [5,5,5,5];
    }
    map.getView().fit([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], {"padding": padding, duration: 1500});
    updateMapExtent();
}
/*
 * This Function takes an array of Positions and adjusts the view of the map so everything is visible
 * @param positions{Array} - Array with Position Objects ([lon,lat])
 */
function adjustViewPosList(positions, padding) {
    var minpos = [null, null];
    var maxpos = [null, null];
    $.each(positions, function(index, value) {
        if(value === ""){
            return;
        }
        if (minpos[0] === null || value[0] < minpos[0]) {
            minpos[0] = value[0];
        }
        if (maxpos[0] === null || value[0] > maxpos[0]) {
            maxpos[0] = value[0];
        }
        if (minpos[1] === null || value[1] < minpos[1]) {
            minpos[1] = value[1];
        }
        if (maxpos[1] === null || value[1] > maxpos[1]) {
            maxpos[1] = value[1];
        }
    });
    adjustViewBoundingBox(minpos, maxpos, padding);
}

function clearPOIS() {
    // Remove All Existing Overlays
    $.each(overlays, function(index, value) {
        map.removeOverlay(value);
    });
    map.removeLayer(vectorLayer);
    vectorSource = new ol.source.Vector();
    // Remove Existing Results
    $("#results > .result-container").remove();
    overlays = [];
}

function centerMap(longitude, latitude) {
    var point = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
    map.getView().setCenter(point);
}
/**
 * Fügt einen Marker auf die Karte hinzu
 * Parameter:
 *  el: HTML-Code für das Element, welches den Marker definiert
 *  pos: Position, auf der sich der Marker befinden soll int[2] (Lat, Long)
 **/
function addMarker(el, pos) {
    var overlay = new ol.Overlay({
        position: pos,
        element: el.get(0),
        offset: [-12, -45],
        stopEvent: false,
    });
    map.addOverlay(overlay);
    return overlay;
}

function toggleGpsWarning(){
    $("#gps-error").addClass("visible-xs");
    $("#gps-error").removeClass("hidden");
    setTimeout(function(){
        $("#gps-error").addClass("hidden");
        $("#gps-error").removeClass("visible-xs");
    }, 5000);
}

function checkGPS(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            if(position.coords.accuracy > 1500){
                gps = false;
                toggleGPSLocator(true);
                lon = parseFloat(position.coords.longitude);
                lat = parseFloat(position.coords.latitude);
                gpsLocation = [lon, lat];
            }else{
                gps = gps = true;
                lon = parseFloat(position.coords.longitude);
                lat = parseFloat(position.coords.latitude);
                gpsLocation = [lon, lat];
                toggleGPSLocator(true);
            }
            if(gpsLocation !== null){
                map.getView().setCenter(ol.proj.transform(gpsLocation, 'EPSG:4326', 'EPSG:3857'));
                map.getView().setZoom(12);
            }
            if(typeof callback === "function"){
                callback();
            }
        }, function(error){
            gps = false;
            toggleGPSLocator(false);
            toggleGpsWarning();
            if(typeof callback === "function"){
                callback();
            }
        },{enableHighAccuracy: true, maximumAge: 0 });
        if(typeof callback === "function"){
            callback();
        }
    } else {
        gps = false;
        toggleGPSLocator(false);
        toggleGpsWarning();
        if(typeof callback === "function"){
            callback();
        }
    }
}

function startApplication(){
    if(typeof start === "function"){
        start();
    }
}

function toggleGPSLocator(visible){
    if(visible){
        $("#location-tool").removeClass("hidden");
    }else{
        $("#location-tool").addClass("hidden");
    }
}

var point_geom = null;  // Point displaying the center where the user possibly is
var point_feature = null;
var circle = null;      // Circle displaying the accuracy
var accuracy_feature = null;
function followLocation() {
    // Element to be displayed at the user-location
    var el = $('<span id="user-position" class="glyphicon glyphicon-record" style="color: #2881cc;"></span>');
    if (lockViewToPosition) $("#lock-location").addClass("active");
    else $("#lock-location").removeClass("active");
    if (id === null) {
        id = navigator.geolocation.watchPosition(function(position) {
            var center = ol.proj.transform([parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)], 'EPSG:4326', 'EPSG:3857');
            var accuracy = parseFloat(position.coords.accuracy);
            if(userPositionMarker === null){
                // Create User Position
                point_geom = new ol.geom.Point(center);
                point_feature = new ol.Feature({
                    name: "Position",
                    geometry: point_geom
                });
                // Create the accuracy Circle:
                circle = new ol.geom.Circle(center, accuracy);
                accuracy_feature = new ol.Feature({
                    name: "Accuracy",
                    geometry: circle
                });
                userPositionMarker = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [point_feature, accuracy_feature]
                    })
                });
                map.addLayer(userPositionMarker);
            }else{
                point_geom.setCoordinates(center);
                circle.setCenter(center);
                circle.setRadius(accuracy);
            }
            if (lockViewToPosition) {
                // Fit the Extent of the Map to Fit the new Features Exactly
                map.getView().fit(userPositionMarker.getSource().getExtent(), {padding: [5,5,5,5], duration: 1500});
            }
            // Change the color of the Icon so the user knows that the position is tracked:
            $("#follow-location").addClass("active");
        }, function(error) {}, options);
        // Show the Lock View to Position Button
        $("#lock-location").removeClass("hidden");
        $("#lock-location > span.info").fadeOut(2000);
    } else {
        map.removeLayer(userPositionMarker);
        userPositionMarker = null;
        point_geom = null;
        point_feature = null;
        circle = null;
        accuracy_feature = null;
        navigator.geolocation.clearWatch(id);
        id = null;
        // Clear the color of the Icon so the user knows that the position is no longer tracked
        $("#follow-location").removeClass("active");
        // Hide the lock View to Position Button
        $("#lock-location").addClass("hidden");
        $("#lock-location > span.info").css("display", "");
    }
}

function updateCurrentLocation(callback) {
    var lon = "";
    var lat = "";
    if (gps) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lon = parseFloat(position.coords.longitude);
            lat = parseFloat(position.coords.latitude);
            gpsLocation = [lon, lat];
            if(typeof callback === "function"){
                callback();
            }
        }, function(error) {
            checkGPS(callback);
        });

        
    } else {
        return null;
    }
}

function toggleViewLock() {
    if (lockViewToPosition) {
        lockViewToPosition = false;
        $("#lock-location").removeClass("active");
        $("#lock-location > span.info").html("Ansicht freigegeben");
        $("#lock-location > span.info").css("display", "");
        $("#lock-location > span.info").fadeOut(2000);
    } else {
        lockViewToPosition = true;
        $("#lock-location").addClass("active");
        $("#lock-location > span.info").html("Ansicht zentriert");
        $("#lock-location > span.info").css("display", "");
        $("#lock-location > span.info").fadeOut(2000);
    }
}

function createPopup(lon, lat, html) {
    var pos = ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857');
    $("#popup-content").html(html);
    popupOverlay.setPosition(pos);
}

function buildResultFromData(data){
    if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
            // Success we have an address
            var address = data["address"];

            var road = getRoad(address);
            var house_number = getHouseNumber(address);
            var city = getCity(address);
            var id = data["place_id"];

            

            var html = "<div class=\"result col-xs-12\">\n";

            // Wir extrahieren noch einen Namen
            if(typeof data["namedetails"]["name"] !== "undefined"){
                html += "<p class=\"title\">" + data["namedetails"]["name"] + "</p>\n";
            }

            var road = getRoad(address);
            var house_number = getHouseNumber(address);
            if(road !== ""){
                html += "<p class=\"address\">" + road;
                if(house_number !== ""){
                    html += " " + house_number;
                }
                html += "</p>\n";
            }

            var city = getCity(address);
            if(city !== ""){
                html += "<p class=\"city\">" + city + "</p>\n";
            }

            var phone = "";
            if(typeof data["extratags"]["contact:phone"] !== "undefined"){
                phone = data["extratags"]["contact:phone"];
            }else if(typeof data["extratags"]["phone"] !== "undefined"){
                phone = data["extratags"]["phone"];
            }
            if(phone !== ""){
                html += "<p class=\"opening-hours\"><a href=\"tel:" + phone + "\" target=_blank><span class=\"glyphicon glyphicon-earphone\"></span> " + phone + "</a></p>\n";
            }

            if(typeof data["extratags"]["website"] !== "undefined"){
                var url = data["extratags"]["website"];
                if(url.lastIndexOf("http", 0) !== 0){
                    url = "http://" + url;
                }
                html += "<p class=\"opening-hours\"><a href=\"" + url + "\" target=_blank><span class=\"glyphicon glyphicon-globe\"></span> " + url + "</a></p>\n";
            }

            if(typeof data["extratags"]["wikipedia"] !== "undefined"){
                var url = "https://de.wikipedia.org/wiki/" + data["extratags"]["wikipedia"];
                html += "<p class=\"opening-hours\"><a href=\"" + url + "\" target=_blank>Wikipedia</a></p>\n";
            }

            // Add possible Opening Hours:
            if(typeof data["extratags"]["opening_hours"] !== "undefined"){
                html += "<p class=\"opening-hours\">" + data["extratags"]["opening_hours"] + "</p>\n";
            }

            if(typeof data["extratags"]["description"] !== "undefined"){
                html += "<p class=\"opening-hours\">" + data["extratags"]["description"] + "</p>\n";
            }

            // Update Address details
            lon = parseFloat(data["lon"]);
            lat = parseFloat(data["lat"]);
            //html += "<div class=\"geo-position container-fluid\"><div class=\"row\">\n";
            //html += "<div class=\"col-xs-6\">Lon: " + lon + "</div>\n";
            //html += "<div class=\"col-xs-6\">Lat: " + lat + "</div>\n"; 
            //html += "</div></div>";

            // Now the two Links
            var url = "";
            if(gps){
                url = "/route/start/foot/gps;"+lon+","+lat;
            }else{
                url = "/route/start/foot/"+lon+","+lat;
            }
            html += '<a href=\"'+url+'\" class=\"btn btn-default btn-xs\">Route berechnen</a>';

            // And the Link to the MetaGer Search
            if(typeof data["namedetails"]["name"] !== "undefined"){
                var url = 'https://metager.de/meta/meta.ger3?focus=web&eingabe=' + encodeURIComponent(data["namedetails"]["name"]) + '&encoding=utf8&lang=all';
                html += '<a href=\"'+url+'\" class=\"btn btn-default btn-xs\" target=_blank>MetaGer Suche</a>';
            }

            var popup = $(html);
            return popup;
            
        }else{
            return null;
        }
}

function showResearchButton(){
    if($("#research-button").hasClass("hidden")){
        $("#research-button").removeClass("hidden");
    }
}

function toggleResearchButtonMoveEvent(){
    map.un("moveend", toggleResearchButtonMoveEvent);
    map.on("moveend", showResearchButton);
}