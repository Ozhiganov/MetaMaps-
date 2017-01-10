var routeLineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'rgb(255,0,0)',
        width: 5
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,.03)'
    })
});
$(document).ready(function() {
	$.getJSON('/route/' + route, function(response){
		route = response;
	})
	.success(function(){
		// If the Route could be loaded and there is a route between the points we can show it:
		if(typeof route["code"] !== 'undefined' && route["code"] === "Ok" && route["routes"].length >= 1){
			// We collect the minimal Position and the maximum Position within the route so we can Adjust the View:
			var minPos = [];
			var maxPos = [];
			var vectorS = new ol.source.Vector();
			// We will show the first Route:
			$.each(route["routes"][0]["legs"], function(index, value){
				// For each leg we collect all the steps:
				$.each(value["steps"], function(index, value){

					var geojson =  value["geometry"];
					// Let's look through the Points to find the minimal
					$.each(geojson["coordinates"], function(index, value){
						if(typeof minPos[0] === "undefined" || parseFloat(value[0]) < minPos[0]){
							minPos[0] = value[0];
						}else if(typeof maxPos[0] === "undefined" || parseFloat(value[0]) > maxPos[0]){
							maxPos[0] = value[0];
						}
						if(typeof minPos[1] === "undefined" || parseFloat(value[1]) < minPos[1]){
							minPos[1] = value[1];
						}else if(typeof maxPos[1] === "undefined" || parseFloat(value[1]) > maxPos[1]){
							maxPos[1] = value[1];
						}
					});
					var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
			        'dataProjection': 'EPSG:4326',
			        'featureProjection': 'EPSG:3857'
			    	});
			    	var feature = new ol.Feature({
				        'geometry': geom
				    });
				    feature.setStyle(routeLineStyle);
				   // feature.setId(index);
				    vectorS.addFeature(feature);
				});
			});
			adjustViewBoundingBox(minPos, maxPos);
		    // add Features
			var vectorL = new ol.layer.Vector({
			    source: vectorS
			});
			map.addLayer(vectorL);

			// We should add some Pins to the Waypoint Locations
			$.each(route["waypoints"], function(index, value){
				// This will work upto an index of 25
				// Caharacter Representation of the index:
				var chr = String.fromCharCode(65 + index);
				// So now the Pin
				var el = $('<span id="'+chr+'" class="marker">' + chr + '</span>');
				var pos = ol.proj.transform([parseFloat(value["location"][0]), parseFloat(value["location"][1])], 'EPSG:4326', 'EPSG:3857');
				addMarker(el, pos);
			});
		}
	});
});