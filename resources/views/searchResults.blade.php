var searchResults = {!!$results!!};
map.un("moveend", moveFunction, map);
clearPOIS();
var markers = [];
@if($boundingSuccess === false)
$("#results").append('<div class="result col-xs-12"><div class="col-xs-2"></div><div class="col-xs-10"><p class="title">Keine Ergebnisse gefunden</p></div></div><div class="clearfix result"></div><h4>Ergebnisse außerhalb des angezeigten Bereichs:<small><a id="showResults" href="#">(anzeigen)</a></small></h4>');
$("#showResults").click(function() {
    adjustView(searchResults);
});
@endif

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
    var res = $("<div class=\"result col-xs-12\" id=\"result-" + index + "\"><div class=\"col-xs-2\"><span class=\"marker\" style=\"filter: hue-rotate(" + value["huerotate"] + "deg);\">" + index + "</span></div>" + "<div class=\"col-xs-10\"><p class=\"title\">" + value["title"] + "</p>" + "<p class=\"type\">" + type + population + "</p>" + "<p class=\"address\">" + road + " " + house_number + "</p><p class=\"city\">" + city + "</p>" + "<p class=\"opening-hours\">" + opening_hours + "</p>" + "<p class=\"tags\">" + "</p><a href=\"https://maps.metager.de/nominatim/details.php?place_id=" + value["place_id"] + "\" target=\"_blank\" class=\"btn btn-default btn-xs\">Details</a></div></div>");
    var resPopup = $("<div class=\"result col-xs-12\"> " + "<p class=\"title\">" + value["title"] + "</p>" + "<p class=\"type\">" + type + population + "</p>" + "<p class=\"address\">" + road + " " + house_number + "</p><p class=\"city\">" + city + "</p>" + "<p class=\"opening-hours\">" + opening_hours + "</p>" + "<p class=\"tags\">" + "</p>" + "<a href=\"https://maps.metager.de/nominatim/details.php?place_id=" + value["place_id"] + "\" target=\"_blank\" class=\"btn btn-default btn-xs\">Details</a></div>");
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
    $("#results").removeClass("hidden");
    $("#closer").removeClass("hidden");
    updateCloserPosition();
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
@if($adjustView === true)
adjustView(searchResults);
@endif
// Hide Navbar if expanded
$(".collapse").collapse("hide");
$("#clearInput").html('<span class="font-bold">X</span>');
@if($adjustLink)
var stateObj = {
    url: '/{{$search . "/" . $bounds[0] . "/" . $bounds[1] . "/" . $bounds[2] . "/" . $bounds[3]}}'
};
// Change URL
window.history.pushState(stateObj, '', '/map/{{$search . "/" . $bounds[0] . "/" . $bounds[1] . "/" . $bounds[2] . "/" . $bounds[3]}}');
// Add the research function after the map moved
map.on("moveend", moveFunction, map);
@endif