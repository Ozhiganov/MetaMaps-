function SearchModule(interactiveMap){
	this.interactiveMap = interactiveMap;	
	// Initialize the search Interface
	this.initializeInterface();
	// Add the Listeners
	this.addSearchListeners();
}

SearchModule.prototype.initializeInterface = function(){
	$("#search-addon").show('slow');
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

SearchModule.prototype.removeSearchListeners = function(){
	$("#search-addon").off();
	$("#search").off();
}

SearchModule.prototype.startSearch = function(event){
	this.query = $("#search input[name=q]").val();
	var caller = this;
	// Conditions for not executing the search
	if(this.query === ""){
		$("#search input[name=q]").focus();
		return;
	}

	var lockSearchFunctions = function(){
		// Prevent Additional searches until this one finishes
		$("#search button[type=submit]").attr("disabled", true);
		$("#search input[name=q]").attr("readonly", true);

	    // Let's add a Loading animation:
	    var loading = $('\
	        <div class="container-fluid wait-for-search">\
	            <p>\
	                Ergebnisse werden geladen \
	                <img src="/img/ajax-loader.gif" alt="loading..." id="loading-search-results" />\
	            </p>\
	        </div>\
	        ');
	    $(".results .results-container").before(loading);
	    $(".results .wait-for-search").show('fast');

	    // Let's make a new input-group-addon to cancel the search if it takes too long
	    var cancelSearch = $('\
	        <div class="input-group-addon" id="cancel-search" title="Suche abbrechen">\
	            X\
	        </div> \
	    ');
	    $("#search input[name=q]").after(cancelSearch);

	};
	var unlockSearchFunctions = function(){
		// Prevent Additional searches until this one finishes
		$("#search button[type=submit]").attr("disabled", false);
		$("#search input[name=q]").attr("readonly", false);

	    // Let's add a Loading animation:
	    $(".results .wait-for-search").hide('fast', function(){
	    	$(".results .wait-for-search").remove();
	    });

	    $("#search #cancel-search").remove();
	};

	// Generate the Url for the Search Results
	var map = this.interactiveMap.map;
	var tmpExtent = map.getView().calculateExtent(map.getSize());
	var extent = map.transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(map.transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
	var url = '/' + encodeURI(this.query) + '/' + encodeURI(String(extent[0])) + '/' + encodeURI(String(extent[1])) + '/' + encodeURI(String(extent[2])) + '/' + encodeURI(String(extent[3]));
	lockSearchFunctions();	
	// Query the Search:
	$.get(url, function(data){
		caller.results = new Results(caller.interactiveMap, data, caller.query);
		//caller.updateInterface();
	})
	.always(function(){
		unlockSearchFunctions();
	});	

}

SearchModule.prototype.focusSearchInput = function(){
	return;
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

	this.adjustResultBoxHeight(oldHeight, newHeight);
}

SearchModule.prototype.exit = function(){
	this.results.deleteSearch();
	this.removeSearchListeners();
	$("#search-addon").hide('slow');
}
