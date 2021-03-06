var searchResults = {!!$results!!};
var exactMatches = {{$exactMatches}};
clearPOIS();
$("#clear-search").remove();
var markers = [];

$.each(searchResults, function(index, value) {
    var el = $('<span id="index" class="marker" style="filter: hue-rotate(' + value["huerotate"] + 'deg);">' + index + '</span>');
    markers.push(el);
    var pos = ol.proj.transform([parseFloat(value["lon"]), parseFloat(value["lat"])], 'EPSG:4326', 'EPSG:3857');
    overlays.push(addMarker(el, pos));
    // Push Resultlist
    var type = typeof value["type"] !== 'undefined' ? value["type"] : "";
    type = type.replace("_", " ");
    type = type.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    var road = "";
    var house_number = "";
    var city = "";
    if (typeof value["address"] !== 'undefined') {
        road = getRoad(value["address"]);
        house_number = getHouseNumber(value["address"]);
        city = getCity(value["address"]);
    }
    var opening_hours = "";
    var population = "";
    if (typeof value["extratags"] !== 'undefined') {
        opening_hours = typeof value["extratags"]["opening_hours"] !== 'undefined' ? value["extratags"]["opening_hours"] : "";
        opening_hours = opening_hours.replace(/,/g, ",<br />");
        opening_hours = opening_hours.replace(/;/g, ",<br />");
        population = typeof value["extratags"]["population"] !== 'undefined' ? " (" + numberWithPoints(value["extratags"]["population"]) + " Einwohner)" : "";
    }
    var routingUrl = "";
    if(gps){
        routingUrl = "/route/start/foot/" + "gps;" + value["lon"]+","+value["lat"];
    }else{
        routingUrl = "/route/start/foot/" + ";" + value["lon"]+","+value["lat"];
    }
    var targetForRouting = "_self";
    if(window!=window.top){
        targetForRouting = "_blank";
    }

    var resultHtml = buildResultFromData(value);

    var res = $("\
        <div class=\"container-fluid result-container\" id=\"result-" + index + "\">\
            <div class=\"col-xs-2\">\
                <span class=\"marker\" style=\"filter: hue-rotate(" + value["huerotate"] + "deg);\">" + index + "</span>\
            </div>\
            <div class=\"col-xs-10 result-html\">\
            </div>\
        </div>");
    $(res).find(".result-html").append(resultHtml);
    var resPopup = buildResultFromData(value);
    $("#results").append(res);
    el.click(function(evt) {
        createPopup(value["lon"], value["lat"], resPopup);
    });
    var resultHoverIn = function() {
        // Wenn du Maus auf das Ergebnis fährt:
        $.each(markers, function(index, value) {
            if (value !== el) {
                value.css("filter", value.css("filter") + " grayscale(1)");
            }
        });
        el.css("transform", "scale(1.2)");
        el.parent().css("z-index", "20000");
        res.css("background-color", "#f2dede");
        res.css("border-color", "#a94442");
    };
    var resultHoverOut = function() {
        // Wenn die Maus das Ergebnis verlässt:
        $.each(markers, function(index, value) {
            if (value !== el) {
                var css = value.css("filter");
                css = css.replace(" grayscale(1)", "");
                value.css("filter", css);
            }
        });
        el.css("transform", "scale(1)");
        el.parent().css("z-index", "0");
        res.css("background-color", "");
        res.css("border-color", "");
    };
    res.hover(resultHoverIn, resultHoverOut);
    el.hover(resultHoverIn, resultHoverOut);

    // Add Features
    var geom = (new ol.format.GeoJSON()).readGeometry(value["geojson"], {
        'dataProjection': 'EPSG:4326',
        'featureProjection': 'EPSG:3857'
    });
    var feature = new ol.Feature({
        'geometry': geom
    });
    feature.setStyle(featureStyle);
    feature.setId(index);
    vectorSource.addFeature(feature);
});
// add Features
vectorLayer = new ol.layer.Vector({
    source: vectorSource
});
map.addLayer(vectorLayer)

initClearInput();

$("#research-button").addClass("hidden");
map.un("moveend", showResearchButton);
map.on("moveend", toggleResearchButtonMoveEvent);

@if($adjustView === true)
// Extra Small devices start with hidden results list
// all others with visible
$("#result-toggler").removeClass("hidden");
if($("#map").width() < 576){
    console.log("in");
    toggleResults("in");
}else{
    toggleResults("out");
}
adjustView(searchResults, exactMatches);
@endif

// Deinit the Click Funktion for the map
map.un('singleclick', mapClickFunction);
if(typeof deinitResults === "function"){
    // Give the user the possibility to delete his search.
    var deleteSearch = $('\
        <div class="input-group-addon" id="clear-search">\
            X\
        </div> \
        ');
    $(deleteSearch).click(deinitResults);
    $("#search input[name=q]").after(deleteSearch);
}

