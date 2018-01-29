let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/modules.js', 'public/js')
	.scripts(['resources/assets/js/md5.js', 'resources/assets/js/jquery.min.js', 'resources/assets/js/jquery-ui.min.js', 'resources/assets/js/jquery.ui.touch-punch.min.js', 
		'resources/assets/js/bootstrap.min.js', 'resources/assets/js/ol.js', 'resources/assets/js/map.js', 'resources/assets/js/NominatimParser.js', 
		'resources/assets/js/ReversePositionManager.js', 'resources/assets/js/GpsManager.js', 'resources/assets/js/SearchModule.js', 'resources/assets/js/LocalHistory.js', 
		'resources/assets/js/Results.js', 'resources/assets/js/RouteFinder.js', 'resources/assets/js/Waypoint.js', 'resources/assets/js/RouteFinderSearchResults.js', 
		'resources/assets/js/Route.js', 'resources/assets/js/Leg.js', 'resources/assets/js/Step.js', 'resources/assets/js/OfflineModule.js', 
		'resources/assets/js/NavigationModule.js', 'resources/assets/js/app.js'], 'public/js/map.js').version()
	.styles(['resources/assets/css/bootstrap.min.css', 'resources/assets/css/style.css', 'resources/assets/css/staticPages.css'], 'public/css/staticPages.css')
    .styles(['resources/assets/css/bootstrap.min.css', 'resources/assets/css/ol.css', 'resources/assets/css/style.css', 'resources/assets/css/offline-module.css', 'resources/assets/css/navigation.css'], 'public/css/general.css')
    .styles(['resources/assets/css/mapSearch.css'], 'public/css/mapSearch.css')
    .styles(['resources/assets/css/bootstrap.min.css', 'resources/assets/css/ol.css', 'resources/assets/css/style.css', 'resources/assets/css/iframeSearch.css'], 'public/css/iframeSearch.css')
    .styles(['resources/assets/css/routing.css'], 'public/css/routing.css');