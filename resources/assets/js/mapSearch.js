var shouldUpdate = true;
$(document).ready(function(){
    initStartNavigation();

    map.on("moveend", updateUrl);

    // Initialize research Button
    var research = $("<div id=\"research-button\" class=\"hidden\"><button type=\"button\" class=\"btn btn-default\">In diesem Bereich erneut Suchen</button></div>")
    $("#map").append(research);
    $(research).find("button").click(function(){
        $("#doSearch").click();
    });

    if(typeof center !== "undefined" && typeof zoom !== "undefined"){
        if(typeof query !== "undefined"){
            $("#search input[name=q]").val(query);
        }
        
        map.un("moveend", updateUrl);
        map.getView().animate({
            zoom: parseInt(zoom),
            center: center,
            duration: 1500
        }, function(){
            setTimeout(function(){
                map.on("moveend", updateUrl);
                if($("#search input[name=q]").val() !== ""){
                    $("#doSearch").click();
                }
            }, 500); 
        });
    }

    $("#search input[name=q]").on("keydown", function(event) {
        if (event.which == 13) $("#doSearch").click();
    });

    

    // Put the Popstate Event:
    $(window).unbind('popstate');
    $(window).bind('popstate', function(event) {
        var state = event.originalEvent.state;
        if (state !== null && state["center"] !== undefined && state["zoom"] !== undefined) {
            center = state["center"].split(",");
            zoom = state["zoom"];
            q = state["q"];
            var shouldSearch = false;
            var shouldClear = false;
            if($("#search input[name=q]").val() !== state["q"] && state["q"] !== ""){
                shouldSearch = true;
            }
            $("#search input[name=q]").val(state["q"]);
            if(typeof searchResults !== "undefined" && $("#search input[name=q]").val() === ""){
                shouldClear = true;
            }
            
            map.un("moveend", updateUrl);
            map.getView().animate({
                zoom: parseInt(zoom),
                center: center,
                duration: 1500
            }, function(){
                setTimeout(function(){
                    map.on("moveend", updateUrl);
                    if(shouldSearch){
                        $("#doSearch").click();
                    }else if(shouldClear){
                        $("#clearInput").click();
                    }
                }, 500); 
            });
        }else{
            document.location.href = document.location.href;
        }
    });

    $("#doSearch").click(function() {

        var navbarCollapsed = $("#navbar-collapse").hasClass("in");

        // If the Navbar is collapsed we need to pull it in before we search because it takes too much space
        if(navbarCollapsed){
            // Start Search when the navbar is hidden
            $("#navbar-collapse").on("hidden.bs.collapse", executeSearch);
            // Hide Navbar
            $(".collapse").collapse("hide");
        }else{
            executeSearch();
        }
    });
});

function executeSearch(){
    q = $("#search input[name=q]").val();
    $("#clearInput").html("<img src=\"/img/ajax-loader.gif\" />");

    // Calculate the current Extent of the map
    var tmpExtent = map.getView().calculateExtent(map.getSize());
    var extent = ol.proj.transform([tmpExtent[0], tmpExtent[1]], 'EPSG:3857', 'EPSG:4326').concat(ol.proj.transform([tmpExtent[2], tmpExtent[3]], 'EPSG:3857', 'EPSG:4326'));

    var url = '/' + encodeURI(q) + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3]);
    $.getScript(url).fail(function(jqxhr, settings, exception) {
        console.log(exception);
    });
    $("#navbar-collapse").off("hidden.bs.collapse");
    $("#search input[name=q]").blur();
}

function updateUrl(){

    if(typeof center === "undefined"){
        center = map.getView().getCenter();
    }
    if(typeof zoom === "undefined"){
        zoom = map.getView().getZoom();
    }
    if(typeof q === "undefined"){
        q = $("#search input[name=q]").val();
    }

    if(map.getView().getCenter() === center && zoom === parseInt(map.getView().getZoom()) && $("#search input[name=q]").val() === q){
        return;
    }

    center = map.getView().getCenter();
    zoom = parseInt(map.getView().getZoom());
    q = $("#search input[name=q]").val();

    var uri = '/map/';

    var query = "";
    if(typeof q !== "undefined" && q !== ""){
        query = q;
        uri += query + "/";
    }

    uri += center.toString() + "," + zoom;

    var stateObj = {
        center: center.toString(),
        zoom: zoom,
        q: query
    };
    // Change URL
    window.history.pushState(stateObj, '', uri);
}

function toggleResearchButtonMoveEvent(){
    map.un("moveend", toggleResearchButtonMoveEvent);
    map.on("moveend", showResearchButton);
}

function showResearchButton(){
    if($("#research-button").hasClass("hidden")){
        $("#research-button").removeClass("hidden");
    }
}

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