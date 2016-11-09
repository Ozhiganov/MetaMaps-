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
    receiveLocation();
    $("#clearInput").click(function() {
        $("#search input[name=q]").val('');
        $("#search input[name=q]").focus();
        $("#results > .result").remove();
        $("#results").addClass("hidden");
        $.each(overlays, function(index, value){
            map.removeOverlay(value);
            $("#popup-closer").click();
        });
    });
    $( "#search input[name=q]" ).on( "keydown", function(event) {
      if(event.which == 13) 
         $("#doSearch").click();
    });
    $("#doSearch").click(function() {
        updateMapExtent();
        var q = $("#search input[name=q]").val();
        q = encodeURI(q);
        $("#clearInput").html("<img src=\"/img/ajax-loader.gif\" />");
        var url = '/' + q + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3]);
        console.log(url);
        $.getScript(url).fail(function(jqxhr, settings, exception){
            console.log(exception);
        });
        $("#search input[name=q]").blur();
    });
    $("#closer").click(function() {
        if ($("#results").attr("data-status") === "in") {
            var width = $("#results").outerWidth() * -1;
            $("#results").css("right", width + "px");
            $("#closer").html("<");
            $("#results").attr("data-status", "out");
            $("#closer").attr("title", "Ergebnisse ausklappen");
            $("#closer").css("right", "0px");
        } else {
            $("#results").css("right", 0);
            $("#closer").html(">");
            $("#results").attr("data-status", "in");
            $("#closer").attr("title", "Ergebnisse einklappen");

            $("#closer").css("right", ($("#results").width()-1) + "px");
        }
    });

    // Register Map Changed Event
    map.on("moveend", function(){
        var q = $("#search input[name=q]").val();
        if(q !== ""){
            updateMapExtent();
        var q = $("#search input[name=q]").val();
        q = encodeURI(q);
        $("#clearInput").html("<img src=\"/img/ajax-loader.gif\" />");
        var url = '/' + q + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3]+'/false');
        $.getScript(url);
        }
    }, map);
    map.on('singleclick', function(evt) {
        var coordinate = evt.coordinate;
        lastClick = coordinate;
    });
});

function initMap() {

    popupOverlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element: $("#popup"),
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));
    map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                preload: Infinity,
                source: new ol.source.OSM({
                    attributions: [
                        new ol.Attribution({
                            html: 'All search results &copy; ' + '<a href="http://nominatim.openstreetmap.org/">Nominatim</a>'
                        }),
                        ol.source.OSM.ATTRIBUTION,
                    ],
                    url: 'https://maps.metager.de/osm_tiles/{z}/{x}/{y}.png'
                })
            })
        ],
        target: 'map',
        controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: true
            })
        }),
        overlays: [popupOverlay],
        view: new ol.View({
            maxZoom: 18,
            minZoom: 6,
            center: ol.proj.transform(
                [10.06897, 51.37247], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
        }),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true
    });
    map.addControl(new ol.control.ZoomSlider());
    $("#popup-closer").click(function(){
        popupOverlay.setPosition(undefined);
        $(this).blur();
        return false;
    });
}
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
    map.getView().fitExtent([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], map.getSize())
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