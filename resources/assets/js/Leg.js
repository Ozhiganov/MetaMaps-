function Leg(legJson, route, legIndex, legSize){
	this.route = route;
	this.json = legJson;
	this.hash = md5(JSON.stringify(this.json));
	this.steps = [];
	var caller = this;
	$.each(this.json.steps, function(index, value){
		var nextStreet = undefined;
		if(caller.json.steps.length > (index+1) && caller.json.steps[index+1].name !== undefined) 
			nextStreet = caller.json.steps[index+1].name;
		caller.steps.push(new Step(value, nextStreet, legIndex, legSize));
	});
}

Leg.prototype.getDuration = function(){
	// Returns the approximate duration left for this Leg
	var duration = this.json.duration;
	return duration;
}

Leg.prototype.shiftStep = function(){
	if(this.steps.length == 0) return;
	var step = this.steps.shift();

	// Calculate how many of the annotations need to get removed
	// A step can have multiple Lines. The length of the Waypoints of this step -1 is how many annotations need to get removed
	var count = step.json.geometry.coordinates.length - 1;
	var i = 0;
	while(i != count){
		// We need to remove this step from the json
		var distance = this.json.annotation.distance.shift();
		var duration = this.json.annotation.duration.shift();
		this.json.annotation.datasources.shift();
		this.json.annotation.nodes.shift();
		this.json.distance -= distance;
		this.json.duration -= duration;
		i--;
	}
	return count;
}

Leg.prototype.generateRouteDescriptionHtml = function(){
	var summary = this.json.summary;
	summary = summary.replace(",", " , ");
	sumamry = summary.replace(/\s+/, " ");
	summary = summary.replace(",", "und");
	var result = $('\
		<button class="btn btn-primary leg-description-toggle" type="button" data-toggle="collapse" data-target="#' + this.hash + '" aria-expanded="false" aria-controls="collapseExample">\
		  <div class="summary">\
		  	über ' + summary + '\
		  </div>\
		  <div class="information">\
		  	<div class="dur">\
		  		' + this.route.durationString(this.json.duration) + '\
		  	</div>\
		  	<div class="dist">\
		  		' + this.route.distanceString(this.json.distance) + '\
		  	</div>\
		  </div>\
		</button>\
		<div class="collapse" id="' + this.hash + '">\
		  <ul>\
		  </ul>\
		</div>\
		');
	var caller = this;
	$.each(this.steps, function(index, value){
		var img = value.parseImg();
		if(img == ""){
			$($(result).get(2)).find(">ul").append($('<li><div class="step-image"></div><div class="step-string">' + value.toString() + '</div><div class="step-length">' + caller.route.distanceString(value.json.distance) + '</div></li>'));
		}else{
			$($(result).get(2)).find(">ul").append($('<li><div class="step-image"><img src="' + value.parseImg() + '" alt=" " /></div><div class="step-string">' + value.toString() + '</div><div class="step-length">' + caller.route.distanceString(value.json.distance) + '</div></li>'));
		}		
	})
	return result;
}

