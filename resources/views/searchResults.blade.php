var searchResults = {!! $results !!};

// Remove All Existing Overlays
$.each(overlays, function(index, value) {
	map.removeOverlay(value);
});

// Remove Existing Results
$("#results > .result").remove();

overlays = [];

$.each(searchResults, function(index, value) {
		var el = $('<span id="index" class="marker">'+index+'</span>');
		var pos = ol.proj.transform([parseFloat(value["lon"]), parseFloat(value["lat"])], 'EPSG:4326', 'EPSG:3857');
		var overlay = new ol.Overlay({
            position: pos,
            element: el,
            offset: [-12, -45],
            stopEvent: false,
        });
        map.addOverlay(overlay);
        
        overlays.push(overlay);

        // Push Resultlist
        var type = typeof value["type"] !== 'undefined' ? value["type"] : "";
        type = type.replace("_", " ");
        type = type.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        var road = "";
        var house_number = "";
        var city = "";
        if(typeof value["address"] !== 'undefined'){
	        if (typeof value["address"]["road"] !== 'undefined') {
	            road = value["address"]["road"];
	        } else if (typeof value["address"]["pedestrian"] !== 'undefined') {
	            road = value["address"]["pedestrian"];
	        } else if (typeof value["address"]["footway"] !== 'undefined') {
	            road = value["address"]["footway"];
	        }
    	
	        house_number = typeof value["address"]["house_number"] !== 'undefined' ? value["address"]["house_number"] : "";
	        city = typeof value["address"]["postcode"] !== 'undefined' ? value["address"]["postcode"] + " " : "";
	        city += typeof value["address"]["city"] !== 'undefined' ? value["address"]["city"] : "";
        }

        var opening_hours = "";
        var population = "";
        if(typeof value["extratags"] !== 'undefined'){
	        opening_hours = typeof value["extratags"]["opening_hours"] !== 'undefined' ? value["extratags"]["opening_hours"] : "";
	        opening_hours = opening_hours.replace(/,/g, ",<br />");
	        opening_hours = opening_hours.replace(/;/g, ",<br />");
	        population = typeof value["extratags"]["population"] !== 'undefined' ? " (" + numberWithPoints(value["extratags"]["population"]) + " Einwohner)" : "";
	    }
	    var res = $("<div class=\"result col-sm-12\"><div class=\"col-xs-2\"><span id=\"index\" class=\"marker\">"+index+"</span></div>" + "<div class=\"col-xs-10\"><p class=\"title\">" + value["title"] + "</p>" + "<p class=\"type\">" + type + population + "</p>" + "<p class=\"address\">" + road + " " + house_number + "</p><p class=\"city\">" + city + "</p>" + "<p class=\"opening-hours\">" + opening_hours + "</p>" + "<p class=\"tags\">" + "</p>" + "</div></div>");
        var resPopup = $("<div class=\"result col-sm-12\"> " + "<p class=\"title\">" + value["title"] + "</p>" + "<p class=\"type\">" + type + population + "</p>" + "<p class=\"address\">" + road + " " + house_number + "</p><p class=\"city\">" + city + "</p>" + "<p class=\"opening-hours\">" + opening_hours + "</p>" + "<p class=\"tags\">" + "</p>" + "</div>");
        $("#results").append(res);
        el.click(function(evt){
        	$("#popup-content").html(resPopup);
        	popupOverlay.setPosition(pos);
        });

        $("#results").removeClass("hidden");
});

@if($adjustView === true)
console.log("test");
adjustView(searchResults);
@endif

$("#clearInput").html('<span class="font-bold">X</span>');

function adjustView(results) {
	if(results.length <= 0)
		return;
    var minPosition = [];
    var maxPosition = [];
    for (var i = 0; i < results.length; i++) {
        if (typeof minPosition[0] === 'undefined' || minPosition[0] > parseFloat(results[i]["lon"])) {
            minPosition[0] = parseFloat(results[i]["lon"]);
        }
        if (typeof minPosition[0] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && minPosition[0] > parseFloat(results[i]["boundingbox"][2]))) {
            minPosition[0] = parseFloat(results[i]["boundingbox"][2]);
        }
        if (typeof minPosition[1] === 'undefined' || minPosition[1] > parseFloat(results[i]["lat"])) {
            minPosition[1] = parseFloat(results[i]["lat"]);
        }
        if (typeof minPosition[1] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && minPosition[1] > parseFloat(results[i]["boundingbox"][0]))) {
            minPosition[1] = parseFloat(results[i]["boundingbox"][0]);
        }
        if (typeof maxPosition[0] === 'undefined' || maxPosition[0] < parseFloat(results[i]["lon"])) {
            maxPosition[0] = parseFloat(results[i]["lon"]);
        }
        if (typeof maxPosition[0] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && maxPosition[0] < parseFloat(results[i]["boundingbox"][3]))) {
            maxPosition[0] = parseFloat(results[i]["boundingbox"][3]);
        }
        if (typeof maxPosition[1] === 'undefined' || maxPosition[1] < parseFloat(results[i]["lat"])) {
            maxPosition[1] = parseFloat(results[i]["lat"]);
        }
        if (typeof maxPosition[1] === 'undefined' || (typeof results[i]["boundingbox"] !== 'undefined' && maxPosition[1] < parseFloat(results[i]["boundingbox"][1]))) {
            maxPosition[1] = parseFloat(results[i]["boundingbox"][1]);
        }
        if (typeof results[i]["type"] !== 'undefined' && (results[i]["type"] === 'city' || results[i]["type"] === 'administrative' || results[i]["type"] === 'river')) {
            break;
        }
    }
    minPosition = ol.proj.transform(minPosition, 'EPSG:4326', 'EPSG:3857');
    maxPosition = ol.proj.transform(maxPosition, 'EPSG:4326', 'EPSG:3857');
    map.getView().fitExtent([minPosition[0], minPosition[1], maxPosition[0], maxPosition[1]], map.getSize())
}

