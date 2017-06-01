function Route(waypoints, vehicle, interactiveMap, callback){
	this.waypoints = waypoints;
	this.callback = callback;
	this.interactiveMap = interactiveMap;
	this.informationOverlays = [];
	if(vehicle === undefined){
		this.vehicle = this.estimateVehicle();
	}else{
		this.vehicle = vehicle;
	}
	this.legs = [];	// Value is set in calculateRoute()
	this.route = this.calculateRoute();	

	this.addVehicleChangedEvent();

}

Route.prototype.switchActiveRoute = function(index){
	this.route.activeRoute = index;
	this.legs = this.extractLegs();
}

Route.prototype.extractLegs = function(){
	var result = [];
	var caller = this;
	$.each(this.route.routes[this.route.activeRoute].legs, function(index, value){
		result.push(new Leg(value, caller));
	});
	return result;
}

Route.prototype.addVehicleChangedEvent = function(){
	$("#route-finder-addon #vehicle-chooser input").change({caller: this}, function(event){
		event.data.caller.vehicle = $(this).attr("value");
		event.data.caller.deleteRoute();
		event.data.caller.interactiveMap.module.calculateRoute(event.data.caller.vehicle);
	});
}

Route.prototype.estimateVehicle = function(){
	// This Function estimates the required vehicle for the route
	// All Distances < 2km will be by foot
	// All Distances < 10km by bike
	// All Distances >= 10km by car
	// Let's calculate the distance between Waypoints
	var distance = this.estimateRouteDistance();
	if(distance < 2000) return "foot";
	else if(distance < 10000) return "bicycle";
	else return "car";
}

Route.prototype.estimateRouteDistance = function(){
	// We will calculate the distance between every two waypoints
	var wgs84Sphere = new ol.Sphere(6378137);
	var caller= this;
	var distance = 0;
	$.each(this.waypoints, function(index, value){
		if(caller.waypoints[index+1] === undefined) return 0;
		var c1 = [value.lon, value.lat];
		var c2 = [caller.waypoints[index+1].lon, caller.waypoints[index+1].lat];
		distance += wgs84Sphere.haversineDistance(c1,c2);
	});
	return distance;
}

Route.prototype.calculateRoute = function(){
	if(this.waypoints.length >= 2){
		var url = "";
		$.each(this.waypoints, function(index, value){
			url += value.lon + "," + value.lat + ";";
		});
		url = url.replace(/;+$/, '');

		url = "/route/find/" + this.vehicle + "/" + url;

		var caller = this;
		$.get(url, function(data){
			caller.route = data;
			caller.route.activeRoute = 0;
			console.log(caller.route);
			caller.printRoute();
			caller.updateVehicle();
			caller.updateRouteInformation();
			caller.updateMapExtent();
			// Save the legs
			caller.legs = caller.extractLegs();
			if(typeof caller.callback === "function"){
				caller.callback();
			}
		});


	}
}

Route.prototype.updateMapExtent = function(initPadding){
	if(this.geom !== undefined){
		var padding = [66,25,25,25];
		if(initPadding !== undefined){
			padding = initPadding;
		}else if($(window).outerWidth() <= 767){
			// Padding Top:
			padding[0] += $("#route-finder-addon > form").outerHeight(true);
			padding[0] += $("#route-finder-addon > #vehicle-chooser").outerHeight(true);
			// Padding Bottom:
			padding[2] += $(window).outerHeight(true) - $("#route-finder-addon > form").outerHeight(true) - $("#route-finder-addon > #vehicle-chooser").outerHeight(true) - $("#route-finder-addon #waypoint-list-container .mobiles-window").outerHeight(true);
		}else{
			var paddingRight = 0;
			paddingRight += $("#route-finder-addon").outerWidth(true);
			padding[1] += paddingRight;
		}
		this.interactiveMap.map.getView().fit(this.geom, {
			duration: 750,
			padding: padding
		});
	}
}

Route.prototype.updateRouteInformation = function(){
	var length = this.route.routes[this.route.activeRoute].distance;
	var distanceString = this.distanceString(length);
	$("#route-finder-addon #waypoint-list-container .route-information .length").html(distanceString);

	var duration = this.route.routes[this.route.activeRoute].duration;
	var durationString = this.durationString(duration);
	$("#route-finder-addon #waypoint-list-container .route-information .duration").html(durationString);

	this.interactiveMap.module.updateMobilesWindow();
}

Route.prototype.distanceString = function(length){
	var result = "";
	length = Math.floor(length);

	if(length > 10000){
		// We will only display full km
		result = Math.round(length/1000) + " km";
	}else if(length > 2000){
		// We will display every 100m
		result = (Math.round(length/100) / 10) + "km";
	}else if(length > 1000){
		// We will display every 50m
		length /= 10;
		length = Math.ceil(length/5) * 5;
		length /= 100;
		result = length + " km";
	}else if(length > 500){
		// We will display every 50m but in m instead of km
		length /= 10;
		length = Math.ceil(length/5) * 5;
		length *= 10;
		result = length + " m";
	}else{
		// We will display every 10m but in m instead of km
		length = Math.ceil(length / 10) * 10;
		result = length + " m";
	}

	return result;
}

Route.prototype.durationString = function(duration){
	duration = Math.abs(duration);
	duration = Math.floor(duration);
	var result = "";
	if(duration >= 3600){
		var hours = Math.floor(duration / 3600);
		var minutes = Math.round((duration % 3600) / 60);

		result += hours + " Std " + minutes + " Min";
	}else{
		var minutes = Math.round((duration % 3600) / 60);

		result += minutes + " Min";
	}
	return result;
}

Route.prototype.updateVehicle = function(){
	// Uncheck the current vehicle
	$("#vehicle-chooser input[checked]").prop("checked", false);
	// Check the new one
	$("#vehicle-chooser input[value=" + this.vehicle + "]").prop("checked", true);
}

Route.prototype.printRoute = function(){
	this.deleteRoute();

    var vectorS = new ol.source.Vector();
    
    // Geometry of the active route
    var  geojson = this.route.routes[this.route.activeRoute].geometry;
	this.geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });


    // Let's print alternative routes, first
    if(this.route.routes.length > 1){
    	var alternativerouteLineStyle = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(121,121,121)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(121,121,121,.03)'
	        })
	    });
	    var alternativerouteLineHoverStyle = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(255,0,0)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(255,0,0,.03)'
	        })
	    });
    	for(var i = 0; i < this.route.routes.length; i++){
    		if(i === this.route.activeRoute) continue;
    		var  altgeojson = this.route.routes[i].geometry;
    		var geom = (new ol.format.GeoJSON()).readGeometry(altgeojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
		    var feature = new ol.Feature({
		        'geometry': geom
		    });
		    feature.setStyle(alternativerouteLineStyle);
		    vectorS.addFeature(feature);

		    // For each alternative Route we will create a popup saying how much longer that route 
		    // would need to drive
		    // The most complicated part about that is to calculate the correct position for this information
		    var pos = this.calculateAlternativeRoutePopupPosition(this.route.routes[i]);
		    var time = this.route.routes[i].duration - this.route.routes[this.route.activeRoute].duration;
		    var timeString = this.durationString(time);
		    var informationOverlay = new ol.Overlay({
		    	element: $('\
		    		<div id="popup" class="ol-popup alternative-route" title="Klicken zum Auswählen der Alternativroute.">\
		    			<div id="popup-content">\
		    				<font color="' + (time > 0 ? "red" : "green") + '">' + (time > 0 ? "+" : "-") + timeString + '</font> <br /> <nobr>' + this.route.routes[i].legs[0].summary + '</nobr>\
		    			</div>\
		    		</div>').get(0),
		    	autopan: false,
		    	position: pos
		    });
		    $(informationOverlay.getElement()).mouseover({feature: feature}, function(event){
		    	event.data.feature.setStyle(alternativerouteLineHoverStyle);
		    });
		    $(informationOverlay.getElement()).mouseout({feature: feature}, function(event){
		    	event.data.feature.setStyle(alternativerouteLineStyle);
		    });
		    $(informationOverlay.getElement()).click({caller: this, index: i}, function(event){
		    	event.data.caller.switchActiveRoute(event.data.index);
		    	event.data.caller.printRoute();	
		    	event.data.caller.updateRouteInformation();	  
		    	event.data.caller.interactiveMap.module.addLegDescriptions(); 
		    });
		    this.interactiveMap.map.addOverlay(informationOverlay);
		    this.informationOverlays.push(informationOverlay);
    	}
    }

    // This is gonna be the main route
	var routeLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(255,128,0)',
            width: 5
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,128,0,.03)'
        })
    });

	
    var feature = new ol.Feature({
        'geometry': this.geom
    });
    feature.setStyle(routeLineStyle);
    vectorS.addFeature(feature);

    this.vectorLayerRoutePreview = new ol.layer.Vector({
        source: vectorS
    });
    
    this.interactiveMap.map.addLayer(this.vectorLayerRoutePreview);
}

/**
 * This Function takes an alternative Route as an argument.
 * It will then compare that route to the currently active route
 * and determine all parts of the route of the alternative route that are
 * different to the currently active one.
 * From all calculated parts It'll take the longest one and calculate the Point
 * that is exactly in the center of that route part.
 * This will be the Position where we will display the Information for this alternative Route
**/
Route.prototype.calculateAlternativeRoutePopupPosition = function(alternativeRoute){
	var parts = [];
	var tmpLineString = undefined;

	// We will use copies of the array because we will delete a whole ton of waypoints from it.
	// Because that will significantly speed up our process
	var ar1 = alternativeRoute.geometry.coordinates.slice();
	var caller = this;
	var pos = [];
	$.each(ar1, function(index, value){
		if(value[0] !== caller.route.routes[caller.route.activeRoute].geometry.coordinates[index][0] || value[1] !== caller.route.routes[caller.route.activeRoute].geometry.coordinates[index][1] ){
			pos = caller.interactiveMap.map.transformToMapCoordinates(value.slice());
			return false;
		}
	});

	return pos;
}

Route.prototype.deleteRoute = function(){
	if(this.vectorLayerRoutePreview !== undefined){
		this.interactiveMap.map.removeLayer(this.vectorLayerRoutePreview);
		this.vectorLayerRoutePreview = undefined;
		this.geom = undefined;
	}
	if(this.informationOverlays !== undefined && this.informationOverlays.length > 0){
		var caller = this;
		$.each(this.informationOverlays, function(index, value){
			$(value).off();
			caller.interactiveMap.map.removeOverlay(value);
		});
		this.informationOverlays = [];
	}
}

Route.prototype.exit = function(){
	this.deleteRoute();
	// Remove the change Listener
	$("#route-finder-addon #vehicle-chooser input").off();
}