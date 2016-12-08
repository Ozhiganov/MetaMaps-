var map;
var extent;
var overlays = [];
var vectorSource = new ol.source.Vector();
var lastClick;
var popupOverlay;
var vectorLayer;
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
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

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
        var width = $("#results").outerWidth() * -1;
        $("#results").css("right", width + "px");
    }else{
        $("#results").css("right", 0);
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
        
    overlays.push(overlay);
}