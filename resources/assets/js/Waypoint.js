/**
 * This Class takes a GeoPosition and a callback in it's constructor
 * It will then evaluate the Position into an Object with a name etc which will require an Ajax call
 * If a callback is given this Class will call it when the Position is evaluated with an Instance of this object as first argument 
**/
function Waypoint(lon, lat, nominatimParser, gpsManager, index, map, callback){
	this.evaluated = false;
	this.callback = callback;
	this.resultHtml = null;
	this.index = index;
	this.charCode = String.fromCharCode(97 + index).toUpperCase();
	if(lon !== undefined && lat !== undefined){
		this.lon = parseFloat(lon);
		this.lat = parseFloat(lat);
	}else if(nominatimParser !== undefined){
		this.lon = parseFloat(nominatimParser.nominatimResult.lon);
		this.lat = parseFloat(nominatimParser.nominatimResult.lat);
		this.data = nominatimParser;
		this.evaluated = true;
	}else if(gpsManager !== undefined){
		this.lon = parseFloat(gpsManager.location[0]);
		this.lat = parseFloat(gpsManager.location[1]);
		this.data = gpsManager;
		this.type = "gps";
		this.evaluated = true;
	}else{
		return;
	}
	this.marker = new ol.Overlay({
			position: map.transformToMapCoordinates([this.lon, this.lat]),
			element: $('<span class="marker" data-resultNumber="'+index+'">' + this.charCode + '</span>').get(0),
			offset: [-12, -45],
			stopEvent: false,
	});
	if(this.callback === undefined){
		this.callback = null;
	}

	if(nominatimParser !== undefined || gpsManager !== undefined){
		if(typeof callback === "function"){
			callback(this);
		} 
	}else{
		this.positionToAdress();
	}
}

Waypoint.prototype.changeIndex = function(newIndex){
	this.index = newIndex;
	this.charCode = String.fromCharCode(97 + newIndex).toUpperCase();
	$(this.resultHtml).find(".marker").html(this.charCode);
	$(this.resultHtml).attr("data-index", newIndex);
	$(this.resultHtml).find(".delete-waypoint").attr("data-index", newIndex);
	this.marker.setElement($('<span class="marker" data-resultNumber="'+this.index+'">' + this.charCode + '</span>').get(0));
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
		if(this.resultHtml === null){
			var description = typeof this.data.getHTMLAddressDetails === "function" ? this.data.getHTMLAddressDetails() : "Eigene Position";
			this.resultHtml = $('\
			<li class="wp" data-index="' + this.index + '">\
				<div class="waypoint">\
					<div class="drag">\
						<img src="/img/anfasser.png" width="30px" alt="drag here" />\
					</div>\
					<div class="marker">\
						' + this.charCode + '\
					</div>\
					<div class="description">\
						' + description + '\
					</div>\
					<div class="delete-waypoint" data-index="' + this.index + '">\
						<span class="glyphicon glyphicon-trash"></span>\
					</div>\
				</div>\
			</li>\
			');
		}
		
		return this.resultHtml;
	}else{
		return "Not Ready Yet";
	}
}