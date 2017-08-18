var map = null;
$(document).ready(function() {
	$(".inactive").hide();
    map = new InteractiveMap();

    var height = (typeof window.outerHeight != 'undefined')?Math.max(window.outerHeight, $(window).height()):$(window).height();

    $("div.map").css("max-height", height);
    $("body").css("max-height", height);
    $("body").css("overflow", "hidden");

    // Start the correct module now:
    if(typeof query != "undefined"){
    	map.switchModule("search", query);
        query = undefined;
    }else if(typeof waypoints != undefined && typeof vehicle != "undefined"){
        map.switchModule("route-finding", {waypoints: waypoints, vehicle: vehicle});
        waypoints = undefined;
        vehicle = undefined;
    }
    else
    	map.switchModule("search");

    map.enableGPSManager();
    if(typeof android != "undefined" && typeof android.pageFinished == "function") android.pageFinished();
});