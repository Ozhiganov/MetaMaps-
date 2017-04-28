function Map(type) {}

function InteractiveMap() {
    Map.call(this);
    // Initialize the Map With Controls to change the view
    this.map = this.initMap();
    this.module = null;
    // Initialize the Positions gathering on click on the Map
    this.reversePositionManager = new ReversePositionManager(this); // This is the Overlay that displays informations about a position where the user has clicked.
    // Initialize the GPS Module
    this.GpsManager = new GpsManager(this.map);
    // The default Module is the search Module
    // Let's start that:
    this.switchModule("search");
}
InteractiveMap.prototype = Object.create(Map.prototype);
InteractiveMap.prototype.constructor = InteractiveMap;
InteractiveMap.prototype.initMap = function() {
    /**
     * Add prototypes to the map that can convert coordinates
     */
    /**
     * transformToMapCoordinates()
     * Transforms a point [lon, lat] from 'EPSG:4326' (World-Coordinates) to 'EPSG:3857' (Map-Coordinates)
     * @param point  : Input Point in EPSG:4326 format
     * @return point : returns the point in EPSG:3857
     **/
    ol.Map.prototype.transformToMapCoordinates = function(point) {
        return ol.proj.transform(point, 'EPSG:4326', 'EPSG:3857');
    }
    /**
     * transformToWorldCoordinates()
     * Transforms a point [lon, lat] from 'EPSG:3857' (Map-Coordinates) to 'EPSG:4326' (World-Coordinates)
     * @param point  : Input Point in EPSG:3857 format
     * @return point : returns the point in EPSG:4326
     **/
    ol.Map.prototype.transformToWorldCoordinates = function(point) {
        return ol.proj.transform(point, 'EPSG:3857', 'EPSG:4326');
    }
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                preload: Infinity,
                source: new ol.source.OSM({
                    attributions: [
                        new ol.Attribution({
                            html: '&copy; ' + '<a href="https://metager.de/">MetaGer.de</a>'
                        }),
                        new ol.Attribution({
                            html: '| <a href="https://metager.de/impressum">Impressum</a>'
                        }),
                        new ol.Attribution({
                            html: '| &copy; ' + '<a href="http://nominatim.openstreetmap.org/">Nominatim</a>'
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
        }).extend([
            new ol.control.ScaleLine()
        ]),
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
    return map;
}
InteractiveMap.prototype.switchModule = function(name, args){

    // Todo remove when development of Route Finder finished
    this.module = new RouteFinder(this, [[9.71802887131353, 52.3454087]]);
    return;

    if(this.module !== null){
        // Every Module must implement this method for deinitialization
        this.module.exit();
        this.module = null;
    }
    switch(name){
        case "search":
            this.module = new SearchModule(this);
            break;
        case "route-finding":
            this.module = new RouteFinder(this, [[parseFloat(args.lon), parseFloat(args.lat)]]);
            break;
        default:
            return;
    }
}

function StaticMap() {
    Map.call(this);
}