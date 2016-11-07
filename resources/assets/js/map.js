var map;
var extent;
$(document).ready(function() {
    // Initialize the Map
    initMap();
    receiveLocation();
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
                collapsible: false
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
    map.getView().setZoom(9);
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