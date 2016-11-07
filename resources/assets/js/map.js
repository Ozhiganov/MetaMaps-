var map;
$(document).ready(function() {
    // Initialize the Map
    initMap();
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