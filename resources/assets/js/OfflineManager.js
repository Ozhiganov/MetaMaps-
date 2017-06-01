function OfflineManager(interactiveMap){
	this.interactiveMap = interactiveMap;

	this.registerSW();
}

OfflineManager.prototype.registerSW = function(){
	navigator.serviceWorker.register('/cache-sw.js', {
		scope: '/'
	});
}