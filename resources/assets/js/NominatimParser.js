/**
 * This Class provides Methods to evaluate the Results that Nominatim gives us
 * 
 **/
function NominatimParser(nominatimResult) {
    this.nominatimResult = nominatimResult;
}
/**
 * This function creates a HTML Object with the most important Informations of the Result
 * @param gps - Boolean whether gps in enabled or not (creates)
 **/
NominatimParser.prototype.getHTMLResult = function() {
    var data = this.nominatimResult;
    if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
        // Success we have an address
        var address = data["address"];
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        var city = this.getCity(address);
        var id = data["place_id"];
        var html = "<div class=\"result\">\n";
        html += "<div class=\"result-information\">";
        // Wir extrahieren noch einen Namen
        if (typeof data["namedetails"]["name"] !== "undefined") {
            html += "<div class=\"title\">" + data["namedetails"]["name"] + "</div>\n";
        }
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        if (road !== "") {
            html += "<div class=\"address\">" + road;
            if (house_number !== "") {
                html += " " + house_number;
            }
            html += "</div>\n";
        }
        var city = this.getCity(address);
        if (city !== "") {
            html += "<div class=\"city\">" + city + "</div>\n";
        }
        var phone = "";
        if (typeof data["extratags"]["contact:phone"] !== "undefined") {
            phone = data["extratags"]["contact:phone"];
        } else if (typeof data["extratags"]["phone"] !== "undefined") {
            phone = data["extratags"]["phone"];
        }
        if (phone !== "") {
            html += "<div class=\"phone\"><a href=\"tel:" + phone + "\" onclick=\"event.stopPropagation();\" target=_blank><span class=\"glyphicon glyphicon-earphone\"></span> " + phone + "</a></div>\n";
        }
        if (typeof data["extratags"]["website"] !== "undefined") {
            var url = data["extratags"]["website"];
            if (url.lastIndexOf("http", 0) !== 0) {
                url = "http://" + url;
            }
            html += "<div class=\"website\"><a href=\"" + url + "\" onclick=\"event.stopPropagation();\" target=_blank><span class=\"glyphicon glyphicon-globe\"></span> " + url + "</a></div>\n";
        }
        if (typeof data["extratags"]["wikipedia"] !== "undefined") {
            var url = "https://de.wikipedia.org/wiki/" + data["extratags"]["wikipedia"];
            html += "<div class=\"wikipedia\"><a href=\"" + url + "\" onclick=\"event.stopPropagation();\" target=_blank><img src=\"/img/wiki.svg\" alt=\"wikipedia\" width=\"20px\"> Wikipedia</a></div>\n";
        }
        // Add possible Opening Hours:
        if (typeof data["extratags"]["opening_hours"] !== "undefined") {
            html += "<div class=\"opening-hours\">" + data["extratags"]["opening_hours"] + "</div>\n";
        }
        if (typeof data["extratags"]["description"] !== "undefined") {
            html += "<div class=\"description\">" + data["extratags"]["description"] + "</div>\n";
        }
        html += "</div><div class=\"result-actions\">";
        // Update Address details
        lon = parseFloat(data["lon"]);
        lat = parseFloat(data["lat"]);
        // Now the two Links
        var url = "";
        url = "/route/start/foot/" + lon + "," + lat;
        html += '<a class="start-route-service" data-lon="'+lon+'" data-lat="'+lat+'" href="#" onclick="event.stopPropagation();">Route berechnen</a>';
        // And the Link to the MetaGer Search
        // build the search query
        var query = "";
        if (typeof data["namedetails"]["name"] !== "undefined") {
            query += data["namedetails"]["name"];
        }
        query += " " + road;
        query += " " + city;
        query = query.trim();
        if (query.length > 0) {
            var url = 'https://metager.de/meta/meta.ger3?focus=web&eingabe=' + encodeURIComponent(query) + '&encoding=utf8&lang=all';
            html += '<a href=\"' + url + '\" onclick="event.stopPropagation();" target=_blank>MetaGer Suche</a>';
        }
        html += "</div></div>";
        var popup = $(html);
        return popup;
    } else {
        return null;
    }
}

NominatimParser.prototype.getRouteFinderHtml = function(){
    var data = this.nominatimResult;
    if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
        // Success we have an address
        var address = data["address"];
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        var city = this.getCity(address);
        var id = data["place_id"];
        var html = "<div class=\"result\">\n";
        html += "<div class=\"result-information\">";
        // Wir extrahieren noch einen Namen
        if (typeof data["namedetails"]["name"] !== "undefined") {
            html += "<div class=\"title\">" + data["namedetails"]["name"] + "</div>\n";
        }
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        if (road !== "") {
            html += "<div class=\"address\">" + road;
            if (house_number !== "") {
                html += " " + house_number;
            }
            html += "</div>\n";
        }
        var city = this.getCity(address);
        if (city !== "") {
            html += "<div class=\"city\">" + city + "</div>\n";
        }

        if (typeof data["extratags"]["description"] !== "undefined") {
            html += "<div class=\"description\">" + data["extratags"]["description"] + "</div>\n";
        }
        html += "</div></div>";
        var popup = $(html);
        return popup;
    } else {
        return null;
    }
}

NominatimParser.prototype.getHTMLAddressDetails = function(){
    var data = this.nominatimResult;
    if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
        // Success we have an address
        var address = data["address"];
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        var city = this.getCity(address);
        var id = data["place_id"];
        var html = "<div class=\"result\">\n";
        html += "<div class=\"result-information\">";
        // Wir extrahieren noch einen Namen
        if (typeof data["namedetails"]["name"] !== "undefined") {
            html += "<div class=\"title\">" + data["namedetails"]["name"] + "</div>\n";
        }
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        if (road !== "") {
            html += "<div class=\"address\">" + road;
            if (house_number !== "") {
                html += " " + house_number;
            }
            html += "</div>\n";
        }
        var city = this.getCity(address);
        if (city !== "") {
            html += "<div class=\"city\">" + city + "</div>\n";
        }
        html += "</div></div>";
        return html;
    }else{
        return null;
    }
}

/**
 * Parsesan OSM-Address-Object for the Road-Name
 * @param {Array} address
 * @return {String} roadname
 */
NominatimParser.prototype.getRoad = function(address) {
    var road = "";
    if (typeof address["road"] !== 'undefined') {
        road = address["road"];
    } else if (typeof address["pedestrian"] !== 'undefined') {
        road = address["pedestrian"];
    } else if (typeof address["path"] !== 'undefined') {
        road = address["path"];
    } else if (typeof address["footway"] !== 'undefined') {
        road = address["footway"];
    }
    return road;
}
/**
 * Parse an OSM-Address-Object for the House Number
 * @param {Array} address
 * @return {String} Housenumber
 */
NominatimParser.prototype.getHouseNumber = function(address) {
    var house_number = typeof address["house_number"] !== 'undefined' ? address["house_number"] : "";
    return house_number;
}
/**
 * Parse an OSM-Address-Object for the City (including Zip-Code)
 * @param {Array} address
 * @return {String} City
 */
NominatimParser.prototype.getCity = function(address) {
    var city = typeof address["postcode"] !== 'undefined' ? address["postcode"] + " " : "";
    if (typeof address["city"] !== "undefined") {
        city += address["city"];
    } else if (typeof address["town"] !== "undefined") {
        city += address["town"];
    } else if (typeof address["village"] !== "undefined") {
        city += address["village"];
    }
    return city;
}