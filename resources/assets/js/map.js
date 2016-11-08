var map;
var extent;
var overlays = [];
$(document).ready(function() {
    // Initialize the Map
    initMap();
    receiveLocation();
    $("#search").submit(function() {
        $("#search button[type=submit]").addClass("disabled");
        var location = document.location.href;
        location = location
        return false;
    });
    $("#clearInput").click(function() {
        $("#search input[name=q]").val('');
        $("#search input[name=q]").focus();
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
        $.getScript(url);
        $("#search input[name=q]").blur();
    });
    $("#results > #closer").click(function() {
        if ($("#results").attr("data-status") === "in") {
            var width = $("#results").outerWidth() * -1;
            $("#results").css("right", width + "px");
            $("#results > #closer").html("<");
            $("#results").attr("data-status", "out");
            $("#results > #closer").attr("title", "Ergebnisse ausklappen");
        } else {
            $("#results").css("right", 0);
            $("#results > #closer").html(">");
            $("#results").attr("data-status", "in");
            $("#results > #closer").attr("title", "Ergebnisse einklappen");
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
});

function initMap() {
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