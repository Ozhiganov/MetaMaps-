var CACHE_STATIC = 'cache-and-update';
var CACHE_TILES = 'cache-or-fetch';

self.addEventListener('install', function(evt){
	console.log('The service worker is being installed');
	evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt){

	var url = evt.request.url;
	if(url.lastIndexOf("/map")  === (url.length - 4)  || url.indexOf('/build/') > -1 || url.indexOf('/img/') > -1 || url.indexOf('/fonts/') > -1){
		console.log('The service worker is serving the asset.', evt.request.url);
		evt.respondWith(fromCache(evt.request));
		evt.waitUntil(update(evt.request));
	}else if(url.indexOf("/osm_tiles/") > -1){
		evt.respondWith(fromTileCache(evt.request));
	}else{
		evt.respondWith(fetch(evt.request));
	}

	
	//
});

function precache() {
	return caches.open(CACHE_STATIC).then(function (cache) {
		return cache.addAll([
			'/map'
		]);
	});
}
/*
 * This is the function that serves Requests for tiles
 * It will check if the reqeusted Tile is in the Cache
 * If so then it'll return the tile and do nothing else
 * If not then it'll fetch the Tile but won't put it into the cache
*/
function fromTileCache(request){

	

	if(typeof android === "undefined"){
		console.log("Nicht in der App");
		return caches.open(CACHE_TILES).then(function(cache){
			return cache.match(request).then(function(matching){
				if(matching) return matching;
				return fetch(request);
			});
		});
    }else{
    	var matches = request.url.match(/\/(\d+)\/(\d+)\/(\d+)\.png/i);

		var x = parseInt(matches[2]);
		var y = parseInt(matches[3]);
		var z = parseInt(matches[1]);
    	var pngContent = android.generateTile(x,y,z);

    	// We retrieved some PNG content as String from the APP
    	// Let's generate a response of of that and return it:
    	return new Response(pngContent, {
    		headers: {
    			'access-control-allow-origin': '*',
    			'cache-control': 'max-age=14685',
    			'content-length': pngContent.length + "",
    			'content-type': 'image/png'
    		}
    	});
    }

	
}

function fromCache(request) {
	return caches.open(CACHE_STATIC).then(function(cache) {
		return cache.match(request).then(function(matching){
			if(matching) return matching;

			// The requested Resource is not in our Cache
			// We will Fetch it now and then put it in the Cache
			var fetchRequest = request.clone();

			return fetch(fetchRequest).then(function(response){
				// We are returning the freshly fetched Request
				// And additionally we are putting it into the cache now
				if(!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				var responseToCache = response.clone();

				caches.open(CACHE_STATIC).then(function(cache){
					cache.put(request, responseToCache);
				});
				return response;
			});
		});
	});
}

function update(request) {
	return caches.open(CACHE_STATIC).then(function(cache){
		return fetch(request).then(function(response){
			cache.put(request, response);
			return response;
		});
	});
}