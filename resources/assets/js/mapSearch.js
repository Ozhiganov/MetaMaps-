

$(document).ready(function() {
    initStartNavigation();
    if (boundings) {
        adjustViewBoundingBox(minPos, maxPos);
    }
    $("#search input[name=q]").on("keydown", function(event) {
        if (event.which == 13) $("#doSearch").click();
    });
    $("#doSearch").click(function() {
        updateMapExtent();
        var q = $("#search input[name=q]").val();
        q = encodeURI(q);
        $("#clearInput").html("<img src=\"/img/ajax-loader.gif\" />");
        var url = '/' + q + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3]);
        $.getScript(url).fail(function(jqxhr, settings, exception) {
            console.log(exception);
        });
        $("#search input[name=q]").blur();
    });
});

function initMap() {
    popupOverlay = new ol.Overlay( /** @type {olx.OverlayOptions} */ ({
        element: document.getElementById("popup"),
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
                            html: '<a href="https://metager.de/impressum">Impressum</a>'
                        }),
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
        }).extend([
            new ol.control.ScaleLine()
        ]),
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
    $("#popup-closer").click(function() {
        popupOverlay.setPosition(undefined);
        $(this).blur();
        return false;
    });
}
/**
 * This function sends a request to our Nominatim instance and evaluates the given coordinates to an adress
 * @param {Float} lon
 * @param {Float} lat
 * @return {Array} adress
 */
function getNearest(lon, lat) {
    var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + lat + "&lon=" + lon + "&zoom=18";
    // Send the Request
    $.get(url, function(data) {
        if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
            // Success we have an address
            var address = data["address"];

            var road = getRoad(address);
            var house_number = getHouseNumber(address);
            var city = getCity(address);
            var id = data["place_id"];

            var url = "";
            if(gps){
                url = "/route/start/foot/gps;"+lon+","+lat;
            }else{
                url = "/route/start/foot/"+lon+","+lat;
            }

            var popup = $("\
                <div class=\"result col-xs-12\">\
                    <p class=\"address\">" + road + " " + house_number + "</p>\
                    <p class=\"city\">" + city + "</p>\
                    <p class=\"address\">Longitude: " + lon + "</p>\
                    <p class=\"address\">Latitude: " + lat + "</p>\
                    <a href=\"https://maps.metager.de/nominatim/details.php?place_id=" + id + "\" target=\"_blank\" class=\"btn btn-default btn-xs\">Details</a>\
                    <a href=\""+url+"\" class=\"btn btn-default btn-xs\">Route berechnen</a>\
                    </div>");

            // And now we can show the Popup where the user clicked
            createPopup(lon, lat, popup);
        }
    });
}

function deinitResults() {
    toggleResults("out");
    $("#results").addClass("hidden");
    $("#closer").addClass("hidden");
    $("#results").html("");
    updateMapSize();
    initStartNavigation();
}