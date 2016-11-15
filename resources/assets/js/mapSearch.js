$(document).ready(function() {
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
        $.getScript(url).fail(function(jqxhr, settings, exception){
            console.log(exception);
        });
        $("#search input[name=q]").blur();
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