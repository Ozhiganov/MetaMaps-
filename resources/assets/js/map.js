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
var moveFunction = function() {
    var q = $("#search input[name=q]").val();
    if (q !== "" && $("#search input[name=q]").attr("data-move-search") === "") {
        updateMapExtent();
        var q = $("#search input[name=q]").val();
        q = encodeURI(q);
        $("#clearInput").html("<img src=\"/img/ajax-loader.gif\" />");
        var url = '/' + q + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3] + '/' + false + '/50');
        $.getScript(url);
    }
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
};
var options = {
            enableHighAccuracy: true,
            maximumAge: 3000
        };
$(document).ready(function() {
    // Initialize the Map
    initMap();
    
    $("#closer").click(function() {
        toggleResults();
    });
    map.on('singleclick', mapClickFunction);
    if(getPosition){
        checkGPS(startApplication);
    }else{
        startApplication();
    }
    $(window).resize(function() {
        updateResultsPosition();
        updateCloserPosition();
        updateMapSize();
    });
    $("#follow-location > span.button").click(function() {
        followLocation();
    });
    $("#lock-location > span.button").click(function() {
        toggleViewLock();
    });
});

function updateMapExtent() {
    var tmpExtent = map.getView().calculateExtent([$("#map").width(), $("#map").height()]);
    extent = ol.proj.transform([tmpExtent[0], tmpExtent[1]], 'EPSG:3857', 'EPSG:4326').concat(ol.proj.transform([tmpExtent[2], tmpExtent[3]], 'EPSG:3857', 'EPSG:4326'));
}

function numberWithPoints(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function deinitSearchBox() {
    $("#search").addClass("hidden");
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

function toggleResults(status) {
    if (status === undefined) {
        status = $("#results").attr("data-status");
    } else if (status !== "in" && status !== "out") {
        status = "in";
    }
    if (status === "in") {
        $("#closer").html("<");
        $("#results").attr("data-status", "out");
        $("#closer").attr("title", "Ergebnisse ausklappen");
        updateResultsPosition();
        updateCloserPosition();
    } else {
        $("#closer").html(">");
        $("#results").attr("data-status", "in");
        $("#closer").attr("title", "Ergebnisse einklappen");
        updateResultsPosition();
        updateCloserPosition();
    }
    updateMapSize();
}

function updateMapSize() {
    var resultsWidth = parseInt($("#results").width());
    if ($("#results").hasClass("hidden")) {
        resultsWidth = 0;
    }
    $("#search input[name=q]").attr("data-move-search", "false");
    var displayWidth = $(window).width();
    // Change Map Width
    $("#map").width(displayWidth - resultsWidth);
    var navBarHeight = $("nav").height();
    if($("nav").hasClass("hidden")){
        navBarHeight = 0;
    }
    var displayHeight = $(window).height();
    // Change The Map Height
    // It's possible that the <main> element has a max-height defined
    if($("main").css("max-height") !== "none"){
        $("#map").height($("main").css("max-height"));
    }else{
        $("#map").css("margin-top", navBarHeight);
        $("#map").height(displayHeight - navBarHeight);
    }

    map.updateSize();
    setTimeout(function() {
        $("#search input[name=q]").attr("data-move-search", "");
    }, 1500);
}

function updateResultsPosition() {
    if ($("#results").attr("data-status") === "out") {
        $("#results").addClass("hidden");
    } else {
        $("#results").removeClass("hidden");
    }
}

function updateCloserPosition() {
    if($("#closer").hasClass("hidden")){
        $("#closer").removeClass("hidden");
    }
    if ($("#results").attr("data-status") === "out") {
        $("#closer").css("right", "0px");
    } else {
        var screenWidth = $(window).width();
        var resultsWidth = $("#results").width() - 1;
        var closerWidth = $("#closer").width();
        if (screenWidth > (resultsWidth + closerWidth)) {
            $("#closer").css("right", resultsWidth + "px");
        } else {
            $("#closer").css("right", (resultsWidth - closerWidth) + "px");
        }

        var top = 0;
        if(!$("nav").hasClass("hidden")){
            top = $("nav").height();
        }
        $("#closer").css("top", top);
    }
}

function adjustView(results) {
    if (results.length <= 0) return;
    var minPosition = [];
    var maxPosition = [];
    for (var i = 0; i < results.length; i++) {
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
        if (typeof results[i]["type"] !== 'undefined' && (results[i]["type"] === 'city' || results[i]["type"] === 'administrative' || results[i]["type"] === 'river')) {
            break;
        }
    }
    minPosition = ol.proj.transform(minPosition, 'EPSG:4326', 'EPSG:3857');
    maxPosition = ol.proj.transform(maxPosition, 'EPSG:4326', 'EPSG:3857');
    map.getView().fit([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], map.getSize());
    updateMapExtent();
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

function adjustViewBoundingBox(minpos, maxpos) {
    minPosition = ol.proj.transform(minpos, 'EPSG:4326', 'EPSG:3857');
    maxPosition = ol.proj.transform(maxpos, 'EPSG:4326', 'EPSG:3857');
    map.getView().fit([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], map.getSize());
    updateMapExtent();
}
/*
 * This Function takes an array of Positions and adjusts the view of the map so everything is visible
 * @param positions{Array} - Array with Position Objects ([lon,lat])
 */
function adjustViewPosList(positions) {
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
    adjustViewBoundingBox(minpos, maxpos);
}

function clearPOIS() {
    // Remove All Existing Overlays
    $.each(overlays, function(index, value) {
        map.removeOverlay(value);
    });
    map.removeLayer(vectorLayer);
    vectorSource = new ol.source.Vector();
    // Remove Existing Results
    $("#results > .result").remove();
    $("#results > h4").remove();
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
            if(position.coords.accuracy > 500){
                gps = false;
                toggleGPSLocator(false);
                lon = parseFloat(position.coords.longitude);
                lat = parseFloat(position.coords.latitude);
                gpsLocation = [lon, lat];
                toggleGpsWarning();
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
            
        }, function(error){
            gps = false;
            toggleGPSLocator(false);
            toggleGpsWarning();
            if(typeof callback === "function"){
                callback();
            }
        },{enableHighAccuracy: true, timeout: 1500});
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

function followLocation() {
    // Element to be displayed at the user-location
    var el = $('<span id="user-position" class="glyphicon glyphicon-record" style="color: #2881cc;"></span>');
    if (lockViewToPosition) $("#lock-location").addClass("active");
    else $("#lock-location").removeClass("active");
    if (id === null) {
        id = navigator.geolocation.watchPosition(function(position) {
            // Remove possibly existing User-Location Marker:
            if (userPositionMarker !== null) {
                map.removeLayer(userPositionMarker);
                userPositionMarker = null;
            }
            // Create User Position
            var point_geom = new ol.geom.Point(ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'));
            var point_feature = new ol.Feature({
                name: "Position",
                geometry: point_geom
            });
            // Create the accuracy Circle:
            var circle = new ol.geom.Circle(ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'), position.coords.accuracy);
            var accuracy_feature = new ol.Feature({
                name: "Accuracy",
                geometry: circle
            });
            userPositionMarker = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [point_feature, accuracy_feature]
                })
            });
            map.addLayer(userPositionMarker);
            if (lockViewToPosition) {
                // Fit the Extent of the Map to Fit the new Features Exactly
                map.getView().fit(userPositionMarker.getSource().getExtent(), map.getSize());
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