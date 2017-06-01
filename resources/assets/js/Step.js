function Step(stepJson, nextStreet){
	this.json = stepJson;
	this.nextStreet = nextStreet;
}


// Converts this Step into a String(German)
Step.prototype.toString = function(){
	return this.parseManeuver();
}



Step.prototype.parseManeuver = function() {
    var stepString = "";
    var maneuver = this.json.maneuver;
    var type = maneuver["type"];
    var modifier = maneuver["modifier"];

    var targetStreet = "";
    if(typeof this.json.name !== "undefined" && typeof this.json.ref !== "undefined"){
        targetStreet = this.makeTrafficSigns(this.json.ref + ":" + this.json.name);
    }else if(typeof this.json.ref !== "undefined" && typeof this.json.name === "undefined"){
    	targetStreet = this.makeTrafficSigns(this.json.ref + ":");
    }else if(typeof this.json.ref === "undefined" && typeof this.json.name !== "undefined"){
        targetStreet = this.json.name;
    }
    if(typeof targetStreet === "undefined"){
        targetStreet = "";
    }

    var destinations = this.json.destinations;
    if(typeof destinations !== "undefined"){
        destinations = destinations.trim();
        destinations = this.makeTrafficSigns(destinations);
    }else{
        destinations = "";
    }
    
    switch (type) {
        case "depart":
            var direction = this.parseBearing(maneuver["bearing_after"]);
            var start = this.json.name;

            if(typeof start !== "undefined"){
                stepString = "Auf " + start + " nach " + direction;
            }else{
                stepString = "Starte Richtung " + direction;
            }

            var nextStreet = this.nextStreet;
            if (typeof nextStreet !== "undefined" && nextStreet !== start) {
                stepString += " Richtung " + nextStreet + " starten";
            }
            break;
        case "continue":
            var mod = parseModifier(maneuver["modifier"]);
            if(mod === "Uturn"){
            	stepString = "Einen " + mod + " machen um <<TARGETSTREET>> zu kommen";
            }else{
            	stepString = mod + " einordnen um <<TARGETSTREET>> zu kommen";
            }
            break;
        case "roundabout turn":
        case "end of road":
        case "turn":
            var direction = "";
            if (maneuver["modifier"] === "uturn") {
                stepString = "Bei " + targetStreet + " wenden";
            } else {
                var modifier = parseModifier(maneuver["modifier"]);
                if (modifier !== "Weiter") {
                    modifier += " abbiegen";
                }
                stepString = modifier;
                stepString += " <<TARGETSTREET>>"
            }
            break;
        case "roundabout":
        case "rotary":
            stepString = "Im Kreisverkehr ";
            if (maneuver["exit"] !== null) {
                stepString += "die ";
                switch (parseInt(maneuver["exit"])) {
                    case 1:
                        stepString += "erste ";
                        break;
                    case 2:
                        stepString += "zweite ";
                        break;
                    case 3:
                        stepString += "dritte ";
                        break;
                    case 4:
                        stepString += "vierte ";
                        break;
                    case 5:
                        stepString += "fünfte ";
                        break;
                    case 6:
                        stepString += "sechste ";
                        break;
                    case 7:
                        stepString += "siebte ";
                        break;
                    case 8:
                        stepString += "achte ";
                        break;
                    case 9:
                        stepString += "neunte ";
                        break;
                }
                stepString += "Ausfahrt nehmen <<TARGETSTREET>>"
            }
            break;
        case "arrive":
            var mod = parseModifier(modifier);
            if (mod === undefined) {
                stepString = "Sie haben das Ziel erreicht";
            } else {
                stepString = "Das Ziel befindet sich " + mod;
            }
            break;
        case "new name":
            stepString = "Weiter <<TARGETSTREET>>";
            break;
        case "merge":
            var mod = parseModifier(modifier);
            stepString = mod + " auffahren <<TARGETSTREET>>";
            break;
        case "off ramp":
        case "fork":
            var mod = parseModifier(modifier);
            stepString = mod + " halten <<TARGETSTREET>>";
            break;
        case "on ramp":
            var mod = parseModifier(modifier);
            stepString = mod + " auffahren <<TARGETSTREET>>";
            break;
        case "use lane":
            switch(modifier){
                case "left":
                    stepString = "Linke ";
                    break;
                case "right":
                    stepString = "Rechte ";
                    break;
                case "middle":
                case "center":
                    stepString = "Mittlere ";
                    break;
                default:
            }
            if(stepString !== ""){
                stepString += "Spur verwenden <<TARGETSTREET>>";
            }
            break;
        default:
            console.log(this.json);
            stepString = "Konnte diesen Schritt nicht zu einem String auswerten";
    }

    
    // Die Anweisung kann nun noch erweitert werden, um eine Straße auf der weiter gefahren wird, oder um eine Richtung
    if(typeof targetStreet !== "undefined" && targetStreet.length > 0){
    	stepString = stepString.replace("<<TARGETSTREET>>", "auf " + targetStreet);
    }else if(typeof destinations !== "undefined" && destinations.length > 0){
    	stepString = stepString.replace("<<TARGETSTREET>>", "Richtung " + destinations);
    }else{
    	stepString = stepString.replace("<<TARGETSTREET>>", "");
    }
	
    return stepString;
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
                while(destinations.match(/^[^,]+/) !== null){
                    if(destinations.indexOf(",") !== -1){
                        tmpDests.push(destinations.substring(0, destinations.indexOf(",")));
                        destinations = destinations.substring(destinations.indexOf(",")+1);
                    }else{
                        tmpDests.push(destinations);
                        destinations = "";
                    }
                }
                // Generate Output from the generated data
                var tmpClass = "";
                if(track[0].indexOf("A ") === 0){
                    tmpClass = "autobahn";
                }else if(track[0].trim().match(/^\w{0,3}\s*\d/) !== null 
                    || track[0].trim().match(/^Ring\s\d+/) !== null)
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

function parseModifier(modifier) {
    var direction = "";
    switch (modifier) {
        case undefined:
            direction = undefined;
            break;
        case "sharp right":
            direction = "Scharf rechts";
            break;
        case "right":
            direction = "Rechts";
            break;
        case "slight right":
            direction = "Leicht rechts";
            break;
        case "straight":
            direction = "Weiter";
            break;
        case "slight left":
            direction = "Leicht links";
            break;
        case "left":
            direction = "Links";
            break;
        case "sharp left":
            direction = "Scharf links";
            break;
        case "uturn":
        	direction = "Uturn";
        	break;
        default:
            direction = "Konnte Richtungs-Modifizierer nicht auswerten: " + modifier;
    }
    return direction;
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