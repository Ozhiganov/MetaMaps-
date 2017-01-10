/*
 * Different things need to be done to be able to find the points to route to
 * First thinkg would be to prepare the Results Div
 */
var vectorLayerRoutePreview;

 $(document).ready(function(){
	deinitSearchBox();
	initRouteFinder();

	map.un("singleclick", mapClickFunction);
	 map.on('singleclick', function(evt) {
        var pos = ol.proj.transform(evt["coordinate"], 'EPSG:3857', 'EPSG:4326');
        $.each(waypoints, function(index, value){
        	if(value === ''){
        		waypoints[index] = pos;

        		// Generate the new url
        		var uri = '/route/start/' + generateBase64Parameter();

        		var stateObj = {
				    url: uri
				};
				// Change URL
				window.history.pushState(stateObj, '', uri);

        		initRouteFinder();
        		return false;
        	}
        });
        
    });
});


function deinitSearchBox(){
	$("#search").addClass("hidden");
}

function initRouteFinder(){
	$("#results").html("");

	var vehicleChooser = 
	$("<div>\
			<ul class=\"nav nav-tabs\" role=\"tablist\">\
				<li role=\"presentation\" class=\"active\">\
					<a href=\"#foot\" aria-controls=\"foot\" role=\"tab\" data-toggle=\"tab\">\
						<img src=\"/img/silhouette-walk.png\" height=\"20px\" />\
					</a>\
				</li>\
				<li role=\"presentation\" class=\"disabled\">\
					<a href=\"#foot\" aria-controls=\"foot\" role=\"tab\">\
						<img src=\"/img/bike.png\" height=\"20px\" />\
					</a>\
				</li>\
				<li role=\"presentation\" class=\"disabled\">\
					<a href=\"#foot\" aria-controls=\"foot\" role=\"tab\">\
						<img src=\"/img/car.png\" height=\"20px\" />\
					</a>\
				</li>\
			</ul>\
			<div class=\"tab-content\">\
				<div role=\"tabpanel\" class=\"tab-pane active\" id=\"foot\">\
				</div>\
			</div>\
		</div>\
		");
	$("#results").append(vehicleChooser);


	// Let's check for existing waypoints
	if(typeof waypoints !== "undefined"){
		if(waypoints.length === 0){
			waypoints.unshift('','');
		}else if(waypoints.length === 1 ){
			waypoints.unshift('');
		}
		var firstEmpty = false;

		$.each(waypoints, function(index, value){
			var html;
			if(typeof value[0] !== "undefined"){
				html = $("<input id=\""+index+"\" class=\"form-control\" placeholder=\"\" value=\""+value[0]+"\"></input>");
			}else{
				if(!firstEmpty){
					html = $("<input id=\""+index+"\" class=\"form-control\" placeholder=\"Klicke auf die Karte um diesen Wegpunkt einzufügen.\" value=\"\"></input>");
					firstEmpty = true;
				}else{
					html = $("<input id=\""+index+"\" class=\"form-control\" placeholder=\"\" value=\"\"></input>");
				}
			}
			$("#foot").append(html);
			if( typeof value[0] !== "undefined"){
				// Add the correct value:
				positionToAdress(value[0], value[1], html);
				addPositionMarker(value[0], value[1], index);
			}
		});

	}

	// Describes the number of unfilled waypoints
	var unfilled = 0;
	if(waypoints[0] === ''){
		unfilled++;
	}
	if(waypoints[waypoints.length - 1] === ''){
		unfilled++;
	}

	if(typeof waypoints !== "undefined" && (waypoints.length - unfilled ) >= 2){
		var from = waypoints[0][0] + "," + waypoints[0][1];
		var lastIndex = waypoints.length - 1;
		var to = waypoints[lastIndex][0] + "," + waypoints[lastIndex][1];
		var points = "";
		$.each(waypoints, function(index, value){
			if(value === '' || typeof value[0] === "undefined"){
				return;
			}else{
				points += value.toString() + ";";
			}
		});
		points = points.replace(/;+$/,'');
		var startButton = $("<a href=\"/route/foot/"+points+"\" class=\"btn btn-default\">Route berechnen</a>");
		var addWayPoint = $("<a id=\"add-waypoint\" href=\"#\" class=\"btn btn-default\">Wegpunkt hinzufügen</a>");
		$("#foot").append(startButton);
		$("#foot").append(addWayPoint);

		// Add the Listener for adding Waypoints
		$("#add-waypoint").click(function(){
			waypoints.push('');
			initRouteFinder();
		});

		generatePreviewRoute();
	}
	
	

	$("#results").removeClass("hidden");
	$("#closer").removeClass("hidden");
	updateCloserPosition();
}

/*
 * Function to convert lat/lon into an adress String and Put it into the value attribute of the given input-object
 * @param{float} lon
 * @param{float} lat
 * @apram{Input-Object} obj
 */
function positionToAdress(lon, lat, obj){
	var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + lat + "&lon=" + lon + "&zoom=18";
	$.get(url, function(data){
		//console.log(data);
		if(typeof data !== "undefined" && typeof data["display_name"] !== "undefined"){
				obj.val(data["display_name"]);
				obj.attr("readonly", "true");
		}
	});
}

function addPositionMarker(lon, lat, index){
	// This will work upto an index of 25
	// Caharacter Representation of the index:
	var chr = String.fromCharCode(65 + index);
	// So now the Pin
	var el = $('<span id="'+chr+'" class="marker">' + chr + '</span>');
	var pos = ol.proj.transform([parseFloat(lon), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857');
	addMarker(el, pos);
}

/*
 * Generates Parameter to the Route until this point using the global waypoints variable
 * @return{String} QueryParameter
 */
function generateBase64Parameter(){
	if(typeof waypoints === "undefined"){
		return null;
	}else{
		var newWayPoints = [];
		$.each(waypoints, function(index, value){
			if(value !== ''){
				newWayPoints.push(value);
			}
		});
		var points = btoa(waypoints.toString());
		return points;
	}
}

/*
 * This Function generates an Overview of the Route that will be calculated
 * and prints it on the map
 */
function generatePreviewRoute(){
	// First thing is to remove the eventually already existing Layer
	map.removeLayer(vectorLayerRoutePreview);

	var vectorS = new ol.source.Vector();
	var routeLineStyle = new ol.style.Style({
	    stroke: new ol.style.Stroke({
	        color: 'rgb(255,0,0)',
	        width: 5
	    }),
	    fill: new ol.style.Fill({
	        color: 'rgba(255,0,0,.03)'
	    })
	});

	if(waypoints.length < 2 || waypoints[0] === '' || (waypoints[waypoints.length - 1] === '' && waypoints.length === 2)){
		return;
	}else{
		var points = "";
		$.each(waypoints, function(index, value){
			if(value === '' || typeof value[0] === "undefined"){
				return;
			}else{
				points += value.toString() + ";";
			}
		});
		points = points.replace(/;+$/,'');

		// At this Point we can only Route between 2 Points so we have all the Information needed
		var url = '/route/preview/foot/' + points;

		// The Rest will be handled Asynchronious
		$.get(url, function(data){
			var geom = (new ol.format.GeoJSON()).readGeometry(data, {
			        'dataProjection': 'EPSG:4326',
			        'featureProjection': 'EPSG:3857'
			    	});
			var feature = new ol.Feature({
				        'geometry': geom
				    });
			feature.setStyle(routeLineStyle);
			vectorS.addFeature(feature);
			vectorLayerRoutePreview = new ol.layer.Vector({
			    source: vectorS
			});
			map.addLayer(vectorLayerRoutePreview);
		});



	}	

}