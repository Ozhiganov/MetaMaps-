function SearchModule(interactiveMap, query){
	this.interactiveMap = interactiveMap;	
	// Initialize History Objects
	this.searchHistory = new LocalHistory("suche");
	this.resultsHistory = new LocalHistory("results");
	// Add the Listener for the routing button
	$("#start-navigation").show();
	$("#start-navigation").click($.proxy(function(){
		this.interactiveMap.switchModule("route-finding", {waypoints: [], vehicle: "car"});
	}, this));
	// Initialize the search Interface
	this.initializeInterface();
	// Add the History Items to the Interface
	this.updatePastSearchContainer();
	// Add the Listeners
	this.addSearchListeners();
	// Add Options Menu
	this.addOptionsMenu();
	// Add the Url Updater
	this.addURLUpdater();
	// Start the Search already if the query variable is defined
	if(typeof query != "undefined"){
		// Update the user Interface with this search
		$("#search input[name=q]").val(query);
		// And trigger the event
		this.startSearch(true);
		this.updatePastSearchContainer();
	}else{
		this.updateURL();
	}
}

SearchModule.prototype.initializeInterface = function(){
	$("#search-addon").show('slow');
}

SearchModule.prototype.addOptionsMenu = function(){
	var caller = this;
	// If this is the App in the correct version we will show the Offline Module
	if(typeof(android) != "undefined" && android.getVersionCode() >= 13){
		$("#search-addon #options").show("slow");
		$("#options > ul > li").click(function(){
			caller.interactiveMap.switchModule('offline-karten');
		});
	}
}

SearchModule.prototype.removeOptionsMenu = function(){
	$("#options > ul > li").off();
	$("#search-addon #options").hide("slow");
}

SearchModule.prototype.addSearchListeners = function(){
	// When the searchfield got focussed
	// Mainly just displays the history
	$("#search-addon").focusin({caller: this}, function(event){
		event.data.caller.focusSearchInput();
	});
	$("#search-addon").focusout({caller: this}, function(event){
		event.data.caller.unfocusSearchInput();
	});

	$("#search").submit({caller: this}, function(event){
		event.data.caller.startSearch();
		return false;
	});
}
 
SearchModule.prototype.removeSearchListeners = function(){
	$("#search-addon").off();
	$("#search").off();
}

SearchModule.prototype.startSearch = function(moveMap){
	this.query = $("#search input[name=q]").val();
	var caller = this;
	// Conditions for not executing the search
	if(this.query == ""){
		$("#search input[name=q]").focus();
		return;
	}

	// Hide every History Item Container
	$("#search-addon .results .history-container .item").hide();

	if(this.results != null && this.results != undefined){
		this.results.deleteSearch();
		this.results = null;
	}

	// Generate the Url for the Search Results
	var map = this.interactiveMap.map;
	var tmpExtent = map.getView().calculateExtent(map.getSize());
	var extent = map.transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(map.transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
	var url = '/' + encodeURI(this.query) + '/' + encodeURI(String(extent[0])) + '/' + encodeURI(String(extent[1])) + '/' + encodeURI(String(extent[2])) + '/' + encodeURI(String(extent[3]));
	this.lockSearchFunctions();	
	// Query the Search:
	var timeout = 10; // 10 seconds Timeout for this request
	this.searching = $.ajax({
		url: url,
		dataType: 'json',
		success: $.proxy(function(data){
			if(typeof moveMap == "boolean")
				this.results = new Results(this.interactiveMap, data, this.query, moveMap, this.resultsHistory);
			else
				this.results = new Results(this.interactiveMap, data, this.query, undefined, this.resultsHistory);
			if(data.length > 0){
				this.updateURL();
				// This was a succesfull
				this.searchHistory.addItem({query: this.query});
				$("#search input[name=q]").blur();
			}
			this.unlockSearchFunctions();
		}, this),
		timeout: (timeout*1000),
		error: $.proxy(function(jqxr){
			// We encountered an error while trying to fetch the search results.
			// It can be an abortion error in case the user clicked abort, or a timeout/connection error
			// Only in the latter case we'll retry the search
			if(jqxr.statusText != "abort"){
				// This probably means that either the internet connection is bad or non existent at the moment
				// We'll retry in a second and repeat until either the user aborts searching, or we succeed
				// Show the user informations that we encountered network problems:
				$("#search-addon .results .wait-for-search > p").hide("slow"); // Hide the currently displayed information
				$("#search-addon .results .wait-for-search .no-internet").show("slow");
				$("#search input[name=q]").val(this.query);
				this.retrySearch = window.setTimeout($.proxy(function(){
					this.retrySearch = undefined;
					this.startSearch();
				}, this), 1000);
			}
		}, this)
	}).always($.proxy(function(){
		this.searching = undefined;
	}, this));

}

SearchModule.prototype.lockSearchFunctions = function(){
		if(this.searchFunctionsLocked == undefined || this.searchFunctionsLocked == false){
			this.searchFunctionsLocked = true;
			// Prevent Additional searches until this one finishes
			$("#search button[type=submit]").attr("disabled", true);
			$("#search input[name=q]").attr("readonly", true);

		    // Let's add a Loading animation:
		    $(".results .wait-for-search").show('fast');

		    // Let's make a new input-group-addon to cancel the search if it takes too long
		    var cancelSearch = $('\
		        <div class="input-group-addon" id="cancel-search" title="Suche abbrechen">\
		            X\
		        </div> \
		    ');
		    $(cancelSearch).click($.proxy(function(){
		    	console.log("aborting");
		    	if(this.retrySearch != undefined){
		    		window.clearTimeout(this.retrySearch);	// We retry fetching search results with a window.setTimeout() which needs to get cleared when we abort
		    	}
		    	if(this.searching != undefined){
		    		this.searching.abort();
		    	}
		    	this.unlockSearchFunctions();
		    }, this));
		    $("#search input[name=q]").after(cancelSearch);
		}
	};
SearchModule.prototype.unlockSearchFunctions = function(){
		if(this.searchFunctionsLocked != undefined && this.searchFunctionsLocked == true){
			// Prevent Additional searches until this one finishes
			$("#search button[type=submit]").attr("disabled", false);
			$("#search input[name=q]").attr("readonly", false);

		    // Let's add a Loading animation:
		    $("#search-addon .results .wait-for-search > p").show("fast");
		    $("#search-addon .results .wait-for-search .no-internet").hide("fast");
		    $(".results .wait-for-search").hide('fast');

		    $("#search #cancel-search").remove();
		    this.searchFunctionsLocked = false;
		}
	};

SearchModule.prototype.enableGps = function(){
	if(typeof this.query == "undefined" && this.interactiveMap.updateMapPositionOnGps){
    	this.interactiveMap.map.getView().setCenter(this.interactiveMap.map.transformToMapCoordinates(this.interactiveMap.GpsManager.location));
    	this.interactiveMap.map.getView().setZoom(12);
    }
}

SearchModule.prototype.disableGps = function(){
	
}

SearchModule.prototype.focusSearchInput = function(){
	// Add the Listener for the SearchBox
	$("#search-addon input[name=q]").keyup(function(){
		var value = $(this).val().toLowerCase();
		// Each past search:
		$("#search-addon .history-container .searches > .item").each(function(index, item){
			var query = $(item).find(".search-query").html().toLowerCase();
			if(value.length > 0 && query.indexOf(value) > -1){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
}

SearchModule.prototype.unfocusSearchInput = function(){
	// Add the Listener for the SearchBox
	$("#search-addon input[name=q]").off();
	$("#search-addon .history-container .item").hide();
}

SearchModule.prototype.addURLUpdater = function(){
	// Add the moveend event to the map
	this.interactiveMap.map.on("moveend", this.updateURL, this);
	$(window).on("popstate", $.proxy(this.popUrl, this));
}

SearchModule.prototype.updateURL = function(){
	// Register the Popstate Listener if not already done
		var pos = this.interactiveMap.map.getView().getCenter();
		pos = this.interactiveMap.map.transformToWorldCoordinates(pos);
		var zoom = this.interactiveMap.map.getView().getZoom();

		var results = this.results;
		if(typeof results != "undefined"){
			var data = results.results;
			var query = results.query;
		}
		var currentState = window.history.state;
		if(typeof query != "undefined"){
			if(currentState == null || typeof currentState.pos == "undefined" ||
				(currentState.pos[0] != pos[0] ||
				currentState.pos[1] != pos[1] ||
				currentState.zoom != zoom ||
				typeof currentState.query == "undefined" ||
				currentState.query != query)){
				var url = window.location.origin + "/map/" + query + "/" + pos[0] + "," + pos[1] + "," + zoom;
				window.history.pushState({"pos" : pos, "zoom" : zoom, "query" : query, "data" : data}, "", url);
			}
		}else if(currentState == null || typeof currentState.pos == "undefined" || currentState.query != undefined ||
			(currentState.pos[0] != pos[0] ||
				currentState.pos[1] != pos[1] ||
				currentState.zoom != zoom)){
			var url = window.location.origin + "/map/" + pos[0] + "," + pos[1] + "," + zoom;
			window.history.pushState({"pos" : pos, "zoom" : zoom}, "", url);
		}
}
			

SearchModule.prototype.popUrl = function(e){
	var state = e.originalEvent.state;
	if(state != null){
		// We need to determine if the state was produced by the Route Finder
		// If so, we need to switch to it.
		if(typeof state.waypoints != "undefined" && typeof state.vehicle != "undefined"){
			// Switch to the route finder
			this.interactiveMap.switchModule("route-finding", {waypoints: state.waypoints, vehicle: state.vehicle});
		}else if(typeof state.pos != "undefined" && typeof state.zoom != "undefined"){
			if(this.results !== null && this.results !== undefined){
				this.results.deleteSearch();
				this.results = null;
			}	
			// We will go back to the last Position
			if(typeof state.query != "undefined"){
				this.results = new Results(this.interactiveMap, state.data, state.query, false, this.resultsHistory);
			}
			this.interactiveMap.map.getView().animate({
				center: this.interactiveMap.map.transformToMapCoordinates(state.pos),
				zoom: state.zoom,
				duration: 250
			});
		}
	}
}

SearchModule.prototype.updatePastSearchContainer = function(){
	// Clear current Content
	$("#search-addon .history-container > .searches").html("");
	$.each(this.searchHistory.results, $.proxy(function(index, value){
		var item = $('\
			<div class="item inactive">\
				<div class="icon"><span class="glyphicon glyphicon-time"></span></div>\
				<div class="search-query">' + value.query + '</div>\
			</div>');
		$("#search-addon .history-container > .searches").append(item);
		$(item).mousedown({caller: this}, function(event){
			// Add the query to the Input Field and start a search
			$("#search-addon input[name=q]").val($(this).find(".search-query").html());
			event.data.caller.startSearch();
		});
	}, this));

	$("#search-addon .history-container > .searches > .inactive").hide();
}

SearchModule.prototype.removeURLUpdater = function(){
	// Add the moveend event to the map
	this.interactiveMap.map.un("moveend", this.updateURL, this);
	$(window).off("popstate", $.proxy(this.popUrl, this));
}

SearchModule.prototype.exit = function(){
	if(this.results !== null && this.results !== undefined)	this.results.deleteSearch();
	$("#popup-closer").click();
	$("#start-navigation").hide();
	$("#start-navigation").off();
	this.removeSearchListeners();
	$("#search-addon").hide('slow');
	this.removeOptionsMenu();
	this.removeURLUpdater();
}
