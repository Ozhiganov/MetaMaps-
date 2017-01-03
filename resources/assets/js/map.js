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
var moveFunction = function(){
                var q = $("#search input[name=q]").val();
                if(q !== ""){
                    updateMapExtent();
                    var q = $("#search input[name=q]").val();
                    q = encodeURI(q);
                    $("#clearInput").html("<img src=\"/img/ajax-loader.gif\" />");
                    var url = '/' + q + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3]+'/'+false+'/50');
                    $.getScript(url);
                }
            };
$(document).ready(function() {
    // Initialize the Map
    initMap();
    $("#closer").click(function() {
        toggleResults();
    });
    map.on('singleclick', function(evt) {
        var coordinate = evt.coordinate;
        lastClick = coordinate;
    });
    $(window).resize(function(){
        updateResultsPosition();
        updateCloserPosition();
    });

    $("#follow-location > span.button").click(function(){
        followLocation();
    });
    $("#lock-location > span.button").click(function(){
        toggleViewLock();
    });
});


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    map.getView().setCenter(ol.proj.transform([crd.longitude, crd.latitude], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(12);
    updateMapExtent();
}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

function receiveLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function updateMapExtent() {
    var tmpExtent = map.getView().calculateExtent([$("#map").width(), $("#map").height()]);
    extent = ol.proj.transform([tmpExtent[0], tmpExtent[1]], 'EPSG:3857', 'EPSG:4326').concat(ol.proj.transform([tmpExtent[2], tmpExtent[3]], 'EPSG:3857', 'EPSG:4326'));
}

function numberWithPoints(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function toggleResults(){
    if ($("#results").attr("data-status") === "in") { 
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
}

function updateResultsPosition() {
    if ($("#results").attr("data-status") === "out") {
        $("#results").css("display", "none");
    }else{
        $("#results").css("display", "");
    }
}

function updateCloserPosition() {
    if($("#results").attr("data-status") === "out"){
        $("#closer").css("right", "0px");
    }else{
        var screenWidth = $(window).width();
        var resultsWidth = $("#results").width()-1;
        var closerWidth = $("#closer").width();
        if(screenWidth > (resultsWidth + closerWidth)){
            $("#closer").css("right", resultsWidth + "px");
        }else{
            $("#closer").css("right", (resultsWidth - closerWidth) + "px");
        }        
    }
}

function adjustView(results) {
    if(results.length <= 0)
        return;
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
    map.getView().fitExtent([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], map.getSize());
    updateMapExtent();
}

function adjustViewBoundingBox(minpos,maxpos){
    minPosition = ol.proj.transform(minpos, 'EPSG:4326', 'EPSG:3857');
    maxPosition = ol.proj.transform(maxpos, 'EPSG:4326', 'EPSG:3857');
    map.getView().fitExtent([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], map.getSize());
    updateMapExtent();
}

function clearPOIS(){
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

function centerMap(longitude, latitude){
    var point = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
    map.getView().setCenter(point);
}

/**
* Fügt einen Marker auf die Karte hinzu
* Parameter:
*  el: HTML-Code für das Element, welches den Marker definiert
*  pos: Position, auf der sich der Marker befinden soll int[2] (Lat, Long)
**/
function addMarker(el, pos){
    var overlay = new ol.Overlay({
            position: pos,
            element: el,
            offset: [-12, -45],
            stopEvent: false,
        });
    map.addOverlay(overlay);
        
    return overlay;
}

function followLocation(){
    // Element to be displayed at the user-location
    var el = $('<span id="user-position" class="glyphicon glyphicon-record" style="color: #2881cc;"></span>');
    if(lockViewToPosition)
        $("#lock-location").addClass("active");        
    else
        $("#lock-location").removeClass("active");

    if(id === null){
        id = navigator.geolocation.watchPosition(function(position) {

                // Remove possibly existing User-Location Marker:
                if(userPositionMarker !== null){
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
                var circle = new ol.geom.Circle(
                    ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857'),
                    position.coords.accuracy);
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

                if(lockViewToPosition){
                    // Fit the Extent of the Map to Fit the new Features Exactly
                    map.getView().fitExtent(userPositionMarker.getSource().getExtent(), map.getSize());
                }

                // Change the color of the Icon so the user knows that the position is tracked:
                $("#follow-location").addClass("active");

            }, function(error){}, options);
        // Show the Lock View to Position Button
        $("#lock-location").removeClass("hidden");
        $("#lock-location > span.info").fadeOut(2000);
    }else{
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

function toggleViewLock() {
    if(lockViewToPosition){
        lockViewToPosition = false;
        $("#lock-location").removeClass("active");
        $("#lock-location > span.info").html("Ansicht freigegeben");
        $("#lock-location > span.info").css("display", "");
        $("#lock-location > span.info").fadeOut(2000);
    }else{
        lockViewToPosition = true;
        $("#lock-location").addClass("active");
        $("#lock-location > span.info").html("Ansicht zentriert");
        $("#lock-location > span.info").css("display", "");
        $("#lock-location > span.info").fadeOut(2000);
    }
}
