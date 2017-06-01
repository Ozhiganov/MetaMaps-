$(document).ready(function() {
    var map = new InteractiveMap();

    var height = (typeof window.outerHeight != 'undefined')?Math.max(window.outerHeight, $(window).height()):$(window).height();

    $("div.map").css("max-height", height);
    $("body").css("max-height", height);
    $("body").css("overflow", "hidden");
});