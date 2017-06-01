function Leg(legJson, route){
	this.route = route;
	this.json = legJson;
	this.hash = md5(JSON.stringify(this.json));
	this.steps = [];
	var caller = this;
	$.each(this.json.steps, function(index, value){
		var nextStreet = undefined;
		if(caller.json.steps.length > (index+1) && caller.json.steps[index+1].name !== undefined) 
			nextStreet = caller.json.steps[index+1].name;
		caller.steps.push(new Step(value, nextStreet));
	});
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
		$($(result).get(2)).find(">ul").append($('<li><div><img src="' + value.parseImg() + '" alt=" " /></div><div class="step-string">' + value.toString() + '</div><div class="step-length">' + caller.route.distanceString(value.json.distance) + '</div></li>'));
	})
	return result;
}