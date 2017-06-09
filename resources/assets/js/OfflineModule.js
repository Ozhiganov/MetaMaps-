function OfflineModule(interactiveMap){
	this.interactiveMap = interactiveMap;

	this.initializeInterface();
	this.addListeners();
}

OfflineModule.prototype.addListeners = function(){
	var caller = this;
	$("#offline-addon .add-area").click(function(){
		caller.startAreaSelection();
	});
}

OfflineModule.prototype.areaSelected = function(){
	// This next job is gonna be quite tricky
	// We need to get the exact boundings of the rectangle that shows the selected area
	// To do so we need to get the Pixel coordinates of the top-left and the bottom-right corner
	// This is gonna be the result
	var p1 = p2 = 0;
	// Let's begin with the top-left
	// X-Value
	var x = $("body > #selector > rect.selected-area").attr("x");
	// This value is a string and percentage i.e. "12.5%"
	// Cut the "%" and parse the float
	x = parseFloat(x.substring(0, x.indexOf("%")));
	// Now we need to know how much pixels that value is
	// The box is the same height/width as the screen so that's quite easy
	x = ($(window).outerWidth() / 100) * x;
	// Y-Value: Same method as with the x value
	var y = $("body > #selector > rect.selected-area").attr("y");
	y = parseFloat(y.substring(0, y.indexOf("%")));
	y = ($(window).outerHeight() / 100) * y;
	p1 = [x, y];
	p1 = this.interactiveMap.map.getCoordinateFromPixel(p1);
	p1 = this.interactiveMap.map.transformToWorldCoordinates(p1);

	// Now The Bottom Right Point. It's gonna be the same method 
	// X-Value
	var x = $("body > #selector > rect.selected-area").attr("x");
	x = parseFloat(x.substring(0, x.indexOf("%")));
	// We need to add the width to this value
	var width = $("body > #selector > rect.selected-area").attr("width");
	width = parseFloat(width.substring(0, width.indexOf("%")));
	x += width;
	// Now we need to know how much pixels that value is
	// The box is the same height/width as the screen so that's quite easy
	x = ($(window).outerWidth() / 100) * x;
	// Y-Value: Same method as with the x value
	var y = $("body > #selector > rect.selected-area").attr("y");
	y = parseFloat(y.substring(0, y.indexOf("%")));
	// We need to add the width to this value
	var height = $("body > #selector > rect.selected-area").attr("height");
	height = parseFloat(height.substring(0, height.indexOf("%")));
	y += height;
	// Now we need to know how much pixels that value is
	// The box is the same height/width as the screen so that's quite easy
	y = ($(window).outerHeight() / 100) * y;
	p2 = [x,y];
	p2 = this.interactiveMap.map.getCoordinateFromPixel(p2);
	p2 = this.interactiveMap.map.transformToWorldCoordinates(p2);


	// Now we need to get the Tile Numbers for the specified coordinates on the current zoom Level
	// This is needes so we can correct the lat lon to be exactly on the edge of a tile
	var targetZoom = 9;
	var xTile = this.long2tile(p1[0], targetZoom);
	var yTile = this.lat2tile(p1[1], targetZoom);

	p1 =[xTile, yTile];
	console.log("P1", p1);

	// And convert that tile back to coordinates
	p1 = [ this.tile2long(p1[0], targetZoom), this.tile2lat(p1[1], targetZoom)];
	console.log(p1);
	xTile = this.long2tile(p2[0], targetZoom) + 1;
	yTile = this.lat2tile(p2[1], targetZoom) + 1;

	p2 =[xTile, yTile];
	console.log("P2", p2);
	p2 = [ this.tile2long(p2[0], targetZoom), this.tile2lat(p2[1], targetZoom)];
	console.log(p1, p2);
	
	// We now have the exact Bounding Box of the selected area that got widened to the next tile border of zoom level 9 (from where on we will render offline data)
	

}

OfflineModule.prototype.long2tile = function(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
OfflineModule.prototype.lat2tile = function(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
OfflineModule.prototype.tile2long = function(x,z) { return (x/Math.pow(2,z)*360-180); }
OfflineModule.prototype.tile2lat = function(y,z) { var n=Math.PI-2*Math.PI*y/Math.pow(2,z); return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n)))); }

OfflineModule.prototype.startAreaSelection = function(){
	$("#offline-addon .results").hide("slow");
	var svg = $('\
			<svg id="selector">\
				<rect width="100%" height="12.5%" x="0" y="0" stroke="" fill="rgb(231, 231, 231);" stroke-width="4" fill-opacity=".7"></rect>\
  				<rect width="12.5%" height="87.5%" x="0" y="12.5%" stroke="" fill="rgb(231, 231, 231);" stroke-width="4" fill-opacity=".7"></rect>\
  				<rect width="87.5%" height="12.5%" x="12.5%" y="87.5%" stroke="" fill="rgb(231, 231, 231);" stroke-width="4" fill-opacity=".7"></rect>\
  				<rect width="12.5%" height="75%" x="87.5%" y="12.5%" stroke="" fill="rgb(231, 231, 231);" stroke-width="4" fill-opacity=".7"></rect>\
  				<rect class="selected-area" width="75%" height="75%" x="12.5%" y="12.5%" stroke="rgb(255,128,0)" stroke-width="4" fill="transparent"></rect>\
			</svg>\
			<div id="selector-accept"><span class="glyphicon glyphicon-ok"></span></div>');
	$("body").append(svg);
	var caller = this;
	$("body > #selector-accept").click(function(){
		caller.areaSelected();
	});
	$("#offline-addon").animate({margin: 0, width: "100%"}, 'slow', function(){
		$("body > #selector, body > #selector-accept").show('slow');
	});

	// We need to constrain the zoom of the map to help the user selecting the right area
	// Min Zoom is gonna be 9; Max Zoom Remains 18
	var currentZoom = this.interactiveMap.map.getView().getZoom();
	// If the current Zoom is lower we will change that:
	if(currentZoom < 9){
		this.interactiveMap.map.getView().setMinZoom(9);
		this.interactiveMap.map.getView().animate({zoom: 9});
	}
}

OfflineModule.prototype.endAreaSelection = function(){
	$("#offline-addon .results").show("slow");
}

OfflineModule.prototype.initializeInterface = function(){
	// Hide everything from Map that is not needed:
	$(".ol-zoom, .ol-zoomslider").hide("slow");
	this.interactiveMap.reversePositionManager.setActive(false);
	$("#offline-addon").show("slow");
}

OfflineModule.prototype.exit = function(){
	// Show everything again that got hidden on intialization
	$(".ol-zoom, .ol-zoomslider").show("slow");
	this.interactiveMap.reversePositionManager.setActive(true);
	$("#offline-addon").hide("slow");
}

OfflineModule.prototype.enableGps = function(){

}

OfflineModule.prototype.disableGps = function(){

}