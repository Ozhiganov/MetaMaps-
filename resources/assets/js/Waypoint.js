/**
 * This Class takes a GeoPosition and a callback in it's constructor
 * It will then evaluate the Position into an Object with a name etc which will require an Ajax call
 * If a callback is given this Class will call it when the Position is evaluated with an Instance of this object as first argument 
**/
function Waypoint(lon, lat, index, map, callback){
	this.lon = parseFloat(lon);
	this.lat = parseFloat(lat);
	this.index = index;
	this.charCode = String.fromCharCode(97 + index).toUpperCase();
	this.marker = new ol.Overlay({
			position: map.transformToMapCoordinates([this.lon, this.lat]),
			element: $('<span class="marker" data-resultNumber="'+index+'">' + this.charCode + '</span>').get(0),
			offset: [-12, -45],
			stopEvent: false,
	});
	this.callback = callback;
	this.evaluated = false;
	if(this.callback === undefined){
		this.callback = null;
	}

	this.positionToAdress();
}

Waypoint.prototype.positionToAdress = function() {
	var pos = [this.lon, this.lat];
    if (pos === 'gps') {
        //obj.html('Eigener Standort');
        //obj.attr('title', 'Eigener Standort');
    } else {
    	var url = "/reverse/" + pos[0] + "/" + pos[1];
        //var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + pos[1] + "&lon=" + pos[0] + "&zoom=18";
        var caller = this;
        $.get(url, function(data) {
        	caller.data = new NominatimParser(data);
        	caller.evaluated = true;

        	if(typeof caller.callback === "function"){
        		caller.callback(caller);
        	}
        });
    }
}

Waypoint.prototype.getHtml = function() {
	if(this.evaluated){
		var res = '\
		<div class="waypoint">\
				<div class="marker">\
					' + this.charCode + '\
				</div>\
				<div class="description">\
					' + this.data.getHTMLAddressDetails() + '\
				</div>\
				<div class="delete-waypoint" data-index="' + this.index + '">\
					<span class="glyphicon glyphicon-trash"></span>\
				</div>\
			</div>\
			';
		return res;
	}else{
		return "Not Ready Yet";
	}
}