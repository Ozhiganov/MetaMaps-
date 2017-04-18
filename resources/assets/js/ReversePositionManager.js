function ReversePositionManager(interactiveMap){
    // Save the Reference to the map Object
    this.interactiveMap = interactiveMap;

    // Create the overlay for the map
    this.positionOverlay = new ol.Overlay( /** @type {olx.OverlayOptions} */ ({
        element: document.getElementById("popup"),
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));
    // Add the Overlay to the map
    this.interactiveMap.map.addOverlay(this.positionOverlay);
    // Add the Event Handler for the Click
    this.interactiveMap.map.on('singleclick', this.getNearest, this.interactiveMap);
    // Add the close event for the Popup
    $("#popup-closer").click({caller: this}, function(event) {
        event.data.caller.positionOverlay.setPosition(undefined);
        $(this).blur();
        return false;
    });

}
ReversePositionManager.prototype = Object.create(ReversePositionManager.prototype);
ReversePositionManager.prototype.constructor = ReversePositionManager;


/**
 * This function sends a request to our Nominatim instance and evaluates the given coordinates to an adress
 * @param {Float} lon
 * @param {Float} lat
 * @return {Array} adress
 */
ReversePositionManager.prototype.getNearest = function(evt){
    var pos = this.map.transformToWorldCoordinates(evt["coordinate"]);
    var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + pos[1] + "&lon=" + pos[0] + "&zoom=18&extratags=1&addressdetails=1&namedetails=1";
    var interactiveMap = this;
    // Send the Request
    $.get(url, function(data) {
        var popup = new NominatimParser(data).getHTMLResult();
        interactiveMap.reversePositionManager.createPopup(interactiveMap.map.transformToMapCoordinates([parseFloat(data["lon"]), parseFloat(data["lat"])]), popup);
    });
}

ReversePositionManager.prototype.createPopup = function(pos, html) {
    $("#popup-content").html(html);

    this.positionOverlay.setPosition(pos);
}