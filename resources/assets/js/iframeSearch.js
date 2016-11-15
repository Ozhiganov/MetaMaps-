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
        controls: [],
            interactions: ol.interaction.defaults({
                doubleClickZoom: false,
                dragAndDrop: false,
                dragPan: false,
                dragBox: false,
                dragRotate: false,
                dragRotateAndZoom: false,
                dragZoom: false,
                draw: false,
                extent: false,
                interaction: false,
                pointer: false,
                keyboardPan: false,
                keyboardZoom: false,
                modify: false,
                pinchRotate: false,
                pinchZoom: false,
                snap: false,
                translate: false,
                mouseWheelZoom: false,
                pointer: false,
                select: false
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