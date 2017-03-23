var shouldUpdate = true;
$(document).ready(function(){
    
    if(typeof vehicle === "undefined"){
        map.on("moveend", updateUrl);
        initStartNavigation();
    }

    // Initialize research Button
    var research = $("<div id=\"research-button\" class=\"hidden\"><button type=\"button\" class=\"btn btn-default\">In diesem Bereich erneut Suchen</button></div>")
    $("#map").append(research);
    $(research).find("button").off();
    $(research).find("button").click(function(){
        $("#doSearch").click();
    });

    if(typeof center !== "undefined" && typeof zoom !== "undefined" && typeof vehicle === "undefined"){
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
                map.un("moveend", updateUrl);
                map.on("moveend", updateUrl);
                if($("#search input[name=q]").val() !== ""){
                    $("#doSearch").click();
                }
            }, 500); 
        });
    }

    $("#search input[name=q]").on("keydown", function(event) {
        if (event.which == 13){
            $("#search-addon input[name=q]").blur();
            $("#doSearch").click();
        }
    });

    
    if(typeof vehicle === "undefined"){
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
                            deinitResults();
                        }
                    }, 500); 
                });
            }else{
                // Das sieht merkürdig aus und hat ältere Geräte zum Absturz gebracht-
                //document.location.href = document.location.href;
            }
        });

        $("#doSearch").click(function() {
            deinitStartNavigation();
            executeSearch();
        });
    }

    $("#result-toggler").click(function(){
        toggleResults();
    })
});

function executeSearch(){
    q = $("#search input[name=q]").val();
    if(q === ""){
        $("#search-addon input[name=q]").focus();
        return;
    }
    // we need some Feedback that the search has startet
    // Depending on the search it could last pretty long
    // because our servers aren't that strong so the user
    // has to know what's going on.
    // Let's make the Input Field readonly
    $("#search-addon input[name=q]").attr("readonly", true);
    // Let's hide the search Button and the clear-search button
    $("#search-addon #doSearch").addClass("hidden");
    $("#search-addon #clear-search").addClass("hidden");
    // Let's make a new input-group-addon to cancel the search if it takes too long
    var cancelSearch = $('\
        <div class="input-group-addon" id="cancel-search" title="Suche abbrechen">\
            X\
        </div> \
    ');
    $("#search input[name=q]").after(cancelSearch);
    // Let's add a Loading animation:
    var loading = $('\
        <div class="container-fluid wait-for-search">\
            <p>\
                Ergebnisse werden geladen \
                <img src="/img/ajax-loader.gif" alt="loading..." id="loading-search-results" />\
            </p>\
        </div>\
        ');
    $("#results").html(loading);
    toggleResults("out");
    $("#loading-search-results").load(function(){
        // Calculate the current Extent of the map
        var tmpExtent = map.getView().calculateExtent(map.getSize());
        var extent = ol.proj.transform([tmpExtent[0], tmpExtent[1]], 'EPSG:3857', 'EPSG:4326').concat(ol.proj.transform([tmpExtent[2], tmpExtent[3]], 'EPSG:3857', 'EPSG:4326'));

        var url = '/' + encodeURI(q) + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3]);
        
        // Before we go on -> let's remove the current results
        searchResults = undefined;
        clearPOIS();
        $("#clear-search").remove();
        var markers = [];

        var xhr = $.getScript(url)
            .fail(function(jqxhr, settings, exception) {
                console.log(exception);
                deinitResults();
            })
            .done(function(){
                // We undo the feedback that we created in the beginning
                $("#results > .wait-for-search").remove();
                if($("#results").attr("data-status") === "in"){
                    $("#results").css("max-height", 0);
                }
                $("#cancel-search").remove();
                $("#search-addon #doSearch").removeClass("hidden");
                $("#search-addon #clear-search").removeClass("hidden");
                $("#search-addon input[name=q]").attr("readonly", false);
                if(typeof searchResults === "undefined" || searchResults.length <= 0){
                    console.log("keine Ergebnisse");
                    makeError($("#search-addon input[name=q]"), "Keine Ergebnisse gefunden :(");
                }
            });
        $("#cancel-search").click(function(){
            xhr.abort();
        });
    });
}

function makeError(element, message){
    $(element).css("border", "3px solid red");
    $(element).tooltip({
        placement: 'auto',
        title: message
    }).tooltip('show');

    setTimeout(function(){
        $(element).css("border", "");
        $(element).tooltip('destroy');
    }, 5000);
}

function updateUrl(){

    if(typeof map.getView().getZoom() === "undefined"){
        // If the Zoom is undefined for this resolution, we will round it so it is valid again.
        var resolution = map.getView().getResolution() * 10;    // We'll round to one digit
        resolution = Math.round(resolution) / 10;

        map.getView().setResolution(resolution);

        if(typeof map.getView().getZoom() === "undefined"){
            // If the zoom is undefined again I can't help
            return;
        }     
    }
    if(typeof zoom === "undefined"){
        zoom = map.getView().getZoom();
    }

    if(typeof center === "undefined"){
        center = map.getView().getCenter();
    }

    if(typeof q === "undefined"){
        q = $("#search input[name=q]").val();
    }

    if(map.getView().getCenter() === center && zoom === parseInt(map.getView().getZoom()) && $("#search input[name=q]").val() === q){
        return;
    }

    center = map.getView().getCenter();
    if(parseInt(map.getView().getZoom()) !== "NaN"){
        zoom = parseInt(map.getView().getZoom());
    }
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
    var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + lat + "&lon=" + lon + "&zoom=18&extratags=1&addressdetails=1&namedetails=1";
    // Send the Request
    $.get(url, function(data) {
        var popup = buildResultFromData(data);
        // And now we can show the Popup where the user clicked
        createPopup(lon, lat, popup);
    });
}

function deinitResults() {
    searchResults = undefined;
    toggleResults("in");
    $("#results").html("");
    $("#result-toggler").addClass("hidden");
    $("#search input[name=q]").val("");
    $("#cancel-search").remove();
    $("#search-addon #doSearch").removeClass("hidden");
    $("#search-addon #clear-search").removeClass("hidden");
    $("#search-addon input[name=q]").attr("readonly", false);
    clearPOIS();
    q = "";
    updateUrl();
    initStartNavigation();
    map.on("singleclick", mapClickFunction);
    $("#clear-search").remove();

}