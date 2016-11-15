var searchResults = {!! $results !!};

clearPOIS();

@if($boundingSuccess === false)
$("#results").append('<div class="result col-xs-12"><div class="col-xs-2"></div><div class="col-xs-10"><p class="title">Keine Ergebnisse gefunden</p></div></div><div class="clearfix result"></div><h4>Ergebnisse außerhalb des angezeigten Bereichs:<small><a id="showResults" href="#">(anzeigen)</a></small></h4>');
$("#showResults").click(function(){
	adjustView(searchResults);
});
@endif



$.each(searchResults, function(index, value) {
		console.log(value);
		var el = $('<span id="index" class="marker" style="filter: hue-rotate('+value["huerotate"]+'deg);">'+index+'</span>');
		var pos = ol.proj.transform([parseFloat(value["lon"]), parseFloat(value["lat"])], 'EPSG:4326', 'EPSG:3857');
	
		addMarker(el, pos);

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
	        if(typeof value["address"]["city"] !== "undefined"){
	        	city += value["address"]["city"];
	        }else if(typeof value["address"]["town"] !== "undefined"){
	        	city += value["address"]["town"];
	        }else if(typeof value["address"]["village"] !== "undefined"){
	        	city += value["address"]["village"];
	        }
        }

        var opening_hours = "";
        var population = "";
        if(typeof value["extratags"] !== 'undefined'){
	        opening_hours = typeof value["extratags"]["opening_hours"] !== 'undefined' ? value["extratags"]["opening_hours"] : "";
	        opening_hours = opening_hours.replace(/,/g, ",<br />");
	        opening_hours = opening_hours.replace(/;/g, ",<br />");
	        population = typeof value["extratags"]["population"] !== 'undefined' ? " (" + numberWithPoints(value["extratags"]["population"]) + " Einwohner)" : "";
	    }
	    var res = $("<div class=\"result col-xs-12\" id=\"result-"+index+"\"><div class=\"col-xs-2\"><span class=\"marker\" style=\"filter: hue-rotate("+value["huerotate"]+"deg);\">"+index+"</span></div>" + "<div class=\"col-xs-10\"><p class=\"title\">" + value["title"] + "</p>" + "<p class=\"type\">" + type + population + "</p>" + "<p class=\"address\">" + road + " " + house_number + "</p><p class=\"city\">" + city + "</p>" + "<p class=\"opening-hours\">" + opening_hours + "</p>" + "<p class=\"tags\">" + "</p><a href=\"https://maps.metager.de/nominatim/details.php?place_id="+value["place_id"]+"\" target=\"_blank\" class=\"btn btn-default btn-xs\">Details</a></div></div>");
        var resPopup = $("<div class=\"result col-xs-12\"> " + "<p class=\"title\">" + value["title"] + "</p>" + "<p class=\"type\">" + type + population + "</p>" + "<p class=\"address\">" + road + " " + house_number + "</p><p class=\"city\">" + city + "</p>" + "<p class=\"opening-hours\">" + opening_hours + "</p>" + "<p class=\"tags\">" + "</p>" + "<a href=\"https://maps.metager.de/nominatim/details.php?place_id="+value["place_id"]+"\" target=\"_blank\" class=\"btn btn-default btn-xs\">Details</a></div>");
        $("#results").append(res);
        el.click(function(evt){
        	$("#popup-content").html(resPopup);
        	popupOverlay.setPosition(pos);
        });

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

//var stateObj = { url: '/{{$search . "/" . $bounds[0] . "/" . $bounds[1] . "/" . $bounds[2] . "/" . $bounds[3]}}'};
// Change URL
//window.history.pushState(stateObj, '', '/map/{{$search . "/" . $bounds[0] . "/" . $bounds[1] . "/" . $bounds[2] . "/" . $bounds[3]}}');

