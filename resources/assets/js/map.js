function Map(type) {}

function InteractiveMap() {
    Map.call(this);
    this.updateMapPositionOnGps = true;
    // Initialize the Map With Controls to change the view
    this.map = this.initMap();
    this.module = null;
    this.GpsManager = null;
    // Initialize the Positions gathering on click on the Map
    this.reversePositionManager = new ReversePositionManager(this); // This is the Overlay that displays informations about a position where the user has clicked. 
}
InteractiveMap.prototype = Object.create(Map.prototype);
InteractiveMap.prototype.constructor = InteractiveMap;

InteractiveMap.prototype.enableGPSManager = function(){
    // Initialize the GPS Module
    this.GpsManager = new GpsManager(this);
}

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
    var source = null;
    if(typeof android === "undefined"){
        // We are not serving this for the app so we'll use our regular Tile-Serve
        source = new ol.source.OSM({
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
                        //url: 'https://tiles.metager.de/{z}/{x}/{y}.png'
                        url: '/tile_cache/{z}/{x}/{y}.png'
                    });
    }else{
        // This is for our Android App we'll use another Tile-Server that has it's cache Disabled
        // The App will Cache the Tiles for us that's why we don't need the browser to do it.
        source = new ol.source.OSM({
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
                        //url: 'https://tiles.metager.de/{z}/{x}/{y}.png'
                        url: '/tile_cache/{z}/{x}/{y}.png'
                    });
    }
    var initPos = [9.841943417968748,52.18082778659789];
    var initZoom = 8;
    if(typeof pos != "undefined" && typeof zoom != "undefined"){
        initPos = pos;
        initZoom = zoom;
        pos = null;
        zoom = null;
        this.updateMapPositionOnGps = false;
    }
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                preload: 0,
                source: source
            }),/*
            new ol.layer.Tile({
                source: new ol.source.TileDebug({
                  projection: 'EPSG:3857',
                  tileGrid:  source.getTileGrid()
                })
              })*/
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
                //[9.45824, 52.48812], 'EPSG:4326', 'EPSG:3857'),
                initPos, 'EPSG:4326', 'EPSG:3857'),
            zoom: initZoom
        }),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true
    });
    map.addControl(new ol.control.ZoomSlider());
    return map;
}
InteractiveMap.prototype.switchModule = function(name, args){

    if(this.module !== null){
        // Every Module must implement this method for deinitialization
        this.module.exit();
        this.module = null;
    }
    switch(name){
        case "search":
            // The search Module can be started with or without a search term
            if(typeof args == "string"){
                this.module = new SearchModule(this, args);
            }else{
                this.module = new SearchModule(this);
            }
            break;
        case "route-finding":
            this.module = new RouteFinder(this, args.waypoints, args.vehicle);
            break;
        case "navigatiion":
            break;
        case "offline-karten":
            this.module = new OfflineModule(this);
            break;
        case "navigation":
            this.module = new NavigationModule(this, args);
        default:
            return;
    }
}

function StaticMap() {
    Map.call(this);
}