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
	console.log(p1,p2);
}

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