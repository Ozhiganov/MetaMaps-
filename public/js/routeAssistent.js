function startAssistent(){
	if(gps){
		prepareInterface();
	}
}

function prepareInterface(){
	// Hide Navigation Bar
	$("nav").addClass("hidden");
	//Hide Results
	deinitResults();

	// Remove Zoom Bar
	$(".ol-zoom, .ol-zoomslider, #location-tool").remove();

	//Update Map Size
	updateMapSize();
}
//# sourceMappingURL=routeAssistent.js.map
