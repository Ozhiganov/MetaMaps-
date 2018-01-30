function Step(stepJson, nextStreet, legIndex, legSize){
	this.json = stepJson;
	this.nextStreet = nextStreet;
    var language = osrmTextInstructions.getBestMatchingLanguage('de-DE');
    this.instruction = osrmTextInstructions.compile(language, stepJson, {"legCount": legSize, "legIndex": legIndex});
}


// Converts this Step into a String(German)
Step.prototype.toString = function(){
	return this.instruction;
}

Step.prototype.parseImg = function() {
	var step = this.json;
    switch (step["maneuver"]["type"]) {
        case "depart":
        case "new name":
            return "/img/straight.png";
        case "roundabout turn":
        case "continue":
        case "end of road":
        case "turn":
            switch (step["maneuver"]["modifier"]) {
                case "left":
                    return "/img/turn-left.png";
                case "sharp left":
                    return "/img/turn-sharp-left.png";
                case "right":
                    return "/img/turn-right.png";
                case "sharp right":
                    return "/img/turn-sharp-right.png";
                case "uturn":
                    return "/img/uturn.png";
                case "slight right":
                    return "/img/fork-slight-right.png";
                case "slight left":
                    return "/img/fork-slight-left.png";
                case "straight":
                    return "/img/straight.png";
                default:
            }
            break;
        case "roundabout":
        case "rotary":
            return "/img/roundabout.png";
        case "on ramp":
            return "/img/auffahren.png";
        case "merge":
        case "off ramp":
        case "fork":
            switch (step["maneuver"]["modifier"]) {
                case "left":
                    return "/img/fork-left.png";
                case "right":
                    return "/img/fork-right.png";
                case "slight right":
                    return "/img/fork-slight-right.png";
                case "slight left":
                    return "/img/fork-slight-left.png";
                case "straight":
                    return "/img/straight.png";
                default:
            }
        default:
    }
    return "";
}

Step.prototype.makeTrafficSigns = function(destinations){
    var tmp = "";
        while(destinations.length > 0){
            // Let's check what kind of destination we have:
            if(destinations.match(/^[^,]+?:/)){
                var track = destinations.substring(0, destinations.indexOf(":")).trim();
                track = track.split(/;/g);
                destinations = destinations.substr(destinations.indexOf(":") + 1);
                // No we get the destinations of this track an make them to a traffic sign
                var tmpDests = [];
                while(destinations.match(/^[^,]+/) != null){
                    if(destinations.indexOf(",") != -1){
                        tmpDests.push(destinations.substring(0, destinations.indexOf(",")));
                        destinations = destinations.substring(destinations.indexOf(",")+1);
                    }else{
                        tmpDests.push(destinations);
                        destinations = "";
                    }
                }
                // Generate Output from the generated data
                var tmpClass = "";
                if(track[0].indexOf("A ") == 0){
                    tmpClass = "autobahn";
                }else if(track[0].trim().match(/^\w{0,3}\s*\d/) != null 
                    || track[0].trim().match(/^Ring\s\d+/) != null)
                    {
                    tmpClass = "landstrasse";
                }
                tmp += "<span class=\"" + tmpClass + " schild\">";
                $.each(track, function(index, value){
                    tmp += "<span class=\"highway-number\">" + value + "</span>";
                });
                tmp += " <span class=\"dests\">" +tmpDests + "</span></span>";
            }else{
                if(destinations.match(/^\w+?,/)){
                    tmp += destinations.substring(0, destinations.indexOf(","));
                    destinations = destinations.substring(destinations.indexOf(",")+1);
                }else if(destinations.match(/^\w+?;/)){
                    tmp += destinations.substring(0, destinations.indexOf(";"));
                    destinations = destinations.substring(destinations.indexOf(";")+1);
                }else{
                    tmp += destinations;
                    destinations = "";
                }
            }
        }
        return tmp;
}

Step.prototype.parseBearing = function(bearing) {
    bearing = parseFloat(bearing);
    if ((bearing >= 0 && bearing < 22.5) || bearing >= 337.5) {
        return "Norden";
    } else if (bearing >= 22.5 && bearing < 67.5) {
        return "Nordosten";
    } else if (bearing >= 67.5 && bearing < 112.5) {
        return "Osten";
    } else if (bearing >= 112.5 && bearing < 157.5) {
        return "Südosten";
    } else if (bearing >= 157.5 && bearing < 202.5) {
        return "Süden";
    } else if (bearing >= 202.5 && bearing < 247.5) {
        return "Südwesten";
    } else if (bearing >= 247.5 && bearing < 292.5) {
        return "Westen";
    } else if (bearing >= 292.5 && bearing < 337.5) {
        return "Nordwesten";
    }
}


Step.prototype.toHTML = function(distTraveled){
    console.log(this.json.distance, distTraveled);
    distTraveled = Math.max(distTraveled, 0);
    var imgSrc = this.parseImg();
    if(imgSrc.length >= 0){
        var html = $('\
            <div class="step">\
                <div class="image">\
                    <img src="' + imgSrc + '" alt="noimage" />\
                </div>\
                <div class="step-string">\
                    ' + this.toString() + '\
                </div>\
                <div class="step-length">\
                    ' + this.distanceString(this.json.distance - distTraveled) + '\
                </div>\
            </div>');
    }else{
        var html = $('\
            <div class="step">\
                <div class="image">\
                </div>\
                <div class="step-string">\
                    ' + this.toString() + '\
                </div>\
                <div class="step-length">\
                    ' + this.distanceString(this.json.distance - distTraveled) + '\
                </div>\
            </div>');
    }
    return html;
}

Step.prototype.getDistance = function(){
    return this.json.distance;
}

Step.prototype.distanceString = function(length){
    var result = "";
    length = Math.floor(length);

    if(length > 10000){
        // We will only display full km
        result = Math.round(length/1000) + " km";
    }else if(length > 2000){
        // We will display every 100m
        result = (Math.round(length/100) / 10) + "km";
    }else if(length > 1000){
        // We will display every 50m
        length /= 10;
        length = Math.ceil(length/5) * 5;
        length /= 100;
        result = length + " km";
    }else if(length > 500){
        // We will display every 50m but in m instead of km
        length /= 10;
        length = Math.ceil(length/5) * 5;
        length *= 10;
        result = length + " m";
    }else{
        // We will display every 10m but in m instead of km
        length = Math.ceil(length / 10) * 10;
        result = length + " m";
    }

    return result;
}