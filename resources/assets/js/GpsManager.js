function GpsManager(interactiveMap) {
    this.map = interactiveMap.map;
    this.interactiveMap = interactiveMap;
    this.gps = false // Boolean which declares whether gps is available or not so we don't have to check against the API everytime
    this.location = null; // Array with Position data of the Last Position we retrieved
    this.lockViewToPosition = true; // Whether the view should be locked when the current Location is shown.
    this.id = null; // ID of the process that follow the Location
    this.userPositionMarker = null; // Marker that displays the user Position
    this.point_geom = null; // Geomatry of the exact Point of the user
    this.circle = null; // Geometry of the accuracy of the user position
    this.options = {
        enableHighAccuracy: true,
        maximumAge: 0
    };
    this.checkGps(); // This function will set the value of "this.gps" it check gps availability asynchronious
    // Add the Event Listeners to enable Location Following on the map
    this.addLocationEventListeners();
    // Be carefull we will not know if we have GPS or not directly after this constructor
    // because the validation is done asynchroniously.
}
GpsManager.prototype.checkGps = function() {
    if (navigator.geolocation) {
        var caller = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            caller.toggleGpsLocator(true);
            caller.location = [position.coords.longitude, position.coords.latitude];
            caller.accuracy = position.coords.accuracy;

            caller.gps = true;
            caller.enableGpsFeatures();
        }, function(error) {
            caller.gps = false;
            caller.toggleGpsLocator(false);
            caller.toggleGpsWarning();
            caller.disableGpsFeatures();
        }, {
            enableHighAccuracy: true,
            maximumAge: 0
        });
    } else {
        this.gps = false;
        this.toggleGpsLocator(false);
        this.toggleGpsWarning();
        this.disableGpsFeatures();
    }
}
GpsManager.prototype.enableGpsFeatures = function() {
    this.interactiveMap.module.enableGps();
}
GpsManager.prototype.disableGpsFeatures = function() {
    this.interactiveMap.module.disableGps();
}
/**
 * Toggles the Map Feature (GpsLocation)
 * It's a button on the map to display your own Position
 * @param visible - Boolean whether GPS is available or not
 **/
GpsManager.prototype.toggleGpsLocator = function(visible) {
    if (visible) {
        $("#location-tool").removeClass("hidden");
        $("#start-navigation > a").attr("href", "/route/start/foot/gps;");
    } else {
        $("#location-tool").addClass("hidden");
        $("#start-navigation > a").attr("href", "/route/start/foot");
    }
}
/**
 * If the retrieval of GPS Position fails on mobile devices we will show a small warning for a 
 * period of time.
 **/
GpsManager.prototype.toggleGpsWarning = function() {
    $("#gps-error").addClass("visible-xs");
    $("#gps-error").removeClass("hidden");
    setTimeout(function() {
        $("#gps-error").addClass("hidden");
        $("#gps-error").removeClass("visible-xs");
    }, 5000);
}
GpsManager.prototype.addLocationEventListeners = function() {
    $("#follow-location > span.button").click({
        caller: this
    }, function(event) {
        event.data.caller.followLocation();
    });
    $("#lock-location > span.button").click({
        caller: this
    }, function(event) {
        var current = event.data.caller.lockViewToPosition;
        if (current) {
            $("#location-tool #lock-location").removeClass("active");
        } else {
            $("#location-tool #lock-location").addClass("active");
        }
        event.data.caller.lockViewToPosition = !event.data.caller.lockViewToPosition;
    });
}
GpsManager.prototype.followLocation = function() {
    // Element to be displayed at the user-location
    var el = $('<span id="user-position" class="glyphicon glyphicon-record" style="color: #2881cc;"></span>');
    if (this.lockViewToPosition) $("#lock-location").addClass("active");
    else $("#lock-location").removeClass("active");
    if (this.id === null) {
        var caller = this;
        this.id = navigator.geolocation.watchPosition(function(position) {
            var center = caller.map.transformToMapCoordinates([parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)]);
            var accuracy = parseFloat(position.coords.accuracy);
            console.log(accuracy);
            if (caller.userPositionMarker === null) {
                // Create User Position
                caller.point_geom = new ol.geom.Point(center);
                point_feature = new ol.Feature({
                    name: "Position",
                    geometry: caller.point_geom
                });
                // Create the accuracy Circle:
                caller.circle = new ol.geom.Circle(center, accuracy);
                accuracy_feature = new ol.Feature({
                    name: "Accuracy",
                    geometry: caller.circle
                });
                caller.userPositionMarker = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [point_feature, accuracy_feature]
                    })
                });
                caller.map.addLayer(caller.userPositionMarker);
            } else {
                caller.point_geom.setCoordinates(center);
                caller.circle.setCenter(center);
                caller.circle.setRadius(accuracy);
            }
            if (caller.lockViewToPosition) {
                // Fit the Extent of the Map to Fit the new Features Exactly
                caller.map.getView().fit(caller.userPositionMarker.getSource().getExtent(), {
                    padding: [5, 5, 5, 5],
                    duration: 600
                });
            }
            // Change the color of the Icon so the user knows that the position is tracked:
            $("#follow-location").addClass("active");
        }, function(error) {}, this.options);
        // Show the Lock View to Position Button
        $("#lock-location").removeClass("hidden");
        $("#lock-location > span.info").fadeOut(2000);
    } else {
        this.map.removeLayer(this.userPositionMarker);
        this.userPositionMarker = null;
        this.point_geom = null;
        this.circle = null;
        navigator.geolocation.clearWatch(this.id);
        this.id = null;
        // Clear the color of the Icon so the user knows that the position is no longer tracked
        $("#follow-location").removeClass("active");
        // Hide the lock View to Position Button
        $("#lock-location").addClass("hidden");
        $("#lock-location > span.info").css("display", "");
    }
}
