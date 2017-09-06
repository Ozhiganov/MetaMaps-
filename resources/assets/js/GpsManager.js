function GpsManager(interactiveMap) {
    this.map = interactiveMap.map;
    this.interactiveMap = interactiveMap;
    this.gps = null // Boolean which declares whether gps is available or not so we don't have to check against the API everytime
    this.location = null; // Array with Position data of the Last Position we retrieved
    this.bearing = null;
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

GpsManager.prototype.constructor = GpsManager;

GpsManager.prototype.loadingGps = function(){
    // Returns a boolean so you can check whether this Manager is finished loading Gps
    if(this.gps == null)
        return true;
    else
        return false;
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

// The GpsManager can call the predefined Functions of the current module
// If it finishes too fast with fetching the position it can cause troubles thats why we add a timeout
GpsManager.prototype.enableGpsFeatures = function() {
    window.setTimeout($.proxy(function(){
        this.interactiveMap.module.enableGps()
    }, this), 100);
    //setTimeout(this.interactiveMap.module.enableGps(), 10000);
}
GpsManager.prototype.disableGpsFeatures = function() {
    window.setTimeout($.proxy(function(){
        this.interactiveMap.module.disableGps();
    }, this), 100);
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

GpsManager.prototype.stopWatch = function(){
    if(typeof this.followId != "undefined"){
        navigator.geolocation.clearWatch(this.followId);
        this.followId = undefined;
        console.log("Watch stopped");
    }
}

GpsManager.prototype.watchPosition = function(callback, options){
    if(typeof options == "undefined"){
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3000
        };
    }
    if(typeof callback != "function")
        return;
    this.followId = navigator.geolocation.watchPosition($.proxy(function(position){
        // We have a new Position
        var long = parseFloat(position.coords.longitude);
        var lat = parseFloat(position.coords.latitude);
        this.location[0] = long;
        this.location[1] = lat;
        this.accuracy = parseFloat(position.coords.accuracy);
        this.timestamp = Math.floor(position.timestamp / 1000);
        // We can calculate the possible Heading if this is not the first Position we retrieve
        if(typeof this.bearingPos == "object" && this.bearingPos.length == 2 && this.getDistance(this.bearingPos, this.location) > this.accuracy){
            this.bearing = this.getBearing(this.bearingPos, this.location);
            this.bearingPos = [long, lat];
        }else{
            this.bearingPos = [long, lat];
            this.bearing = null;
        }
        callback(position);
    }, this), function(error) {
            // Follow Location couldn't be started. Abort now
            deinitAssistent();
        }, options);
    console.log(this.followId);
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

GpsManager.prototype.getBearing = function(p1, p2){
    // Takes to Points in World Coordinates and calculates the Bearing of the connection Line
    var p1r = [this.toRadians(p1[0]), this.toRadians(p1[1])];
    var p2r = [this.toRadians(p2[0]), this.toRadians(p2[1])];
    var x = Math.cos(p2r[1]) * Math.sin(p2r[0] - p1r[0]);
    var y = Math.cos(p1r[1]) * Math.sin(p2r[1]) - Math.sin(p1r[1]) * Math.cos(p2r[1]) * Math.cos(p2r[0] - p1r[0]);
    var bearing = Math.atan2(x, y);
    bearing = this.toDegrees(bearing);
    if(bearing < 0){
        bearing += 360;
    }
    return bearing;
}

GpsManager.prototype.toRadians = function(angle) {
    return angle * (Math.PI / 180);
}

GpsManager.prototype.toDegrees = function(radians) {
    return radians * 180 / Math.PI;
}

GpsManager.prototype.getDistance = function(p1, p2){
    var wgs84Sphere = new ol.Sphere(6378137);
    return wgs84Sphere.haversineDistance(p1, p2);
}
