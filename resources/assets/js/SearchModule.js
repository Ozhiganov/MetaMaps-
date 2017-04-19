function SearchModule(interactiveMap){
	this.interactiveMap = interactiveMap;
	// Initialize the search Interface
	this.initializeInterface();
	// Add the Listeners
	this.addSearchListeners();
}

SearchModule.prototype.initializeInterface = function(){
	$("#search-addon").removeClass("hidden");
}

SearchModule.prototype.addSearchListeners = function(){
	// When the searchfield got focussed
	// Mainly just displays the history
	$("#search-addon").focusin({caller: this}, function(event){
		event.data.caller.focusSearchInput();
	});

	$("#search").submit({caller: this}, function(event){
		event.data.caller.startSearch(event);
		return false;
	});
}

SearchModule.prototype.startSearch = function(event){
	console.log(event);
}

SearchModule.prototype.focusSearchInput = function(){
	// Read out the locally stored History
	var history = (new LocalHistory()).getFullHistory();

	var caller = this;
	// Add the History entries to the search suggestions:
	var oldHeight = $("#search-addon .results").height();
	// Clear the History Container
	$("#search-addon .results .history-container").html("");
	$.each(history, function(index, value){
		
		var res = "";
		if(typeof value === "object"){
			res =(new NominatimParser(value)).getHTMLResult().html();
		}else if(typeof value === "string"){
			res = value;
		}
		var resHtml = $('\
                        <div class="container-fluid suggestion">\
                            <div class="flex-container">\
                                <div class="item history">\
                                    <span class="glyphicon glyphicon-time"></span>\
                                </div>\
                                <div class="item result">\
                                    ' + res + '\
                                </div>\
                            </div>\
                        </div>\
                        ');
		$("#search-addon .results .history-container").append(resHtml);
	});
	var newHeight = $("#search-addon .results").height();
	$("#search-addon .results").height(oldHeight),
	$("#search-addon .results").animate({height: newHeight}, 'fast', function(){
		$("#search-addon .results").height('auto');
	});
}