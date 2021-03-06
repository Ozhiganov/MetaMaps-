process.env.DISABLE_NOTIFIER = true;
const elixir = require('laravel-elixir');
require('laravel-elixir-vue-2');
/*js/routing.js
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */
elixir((mix) => {
	mix.styles(['bootstrap.min.css', 'style.css', 'staticPages.css'], 'public/css/staticPages.css');
    mix.styles(['bootstrap.min.css', 'ol.css', 'style.css', 'offline-module.css', 'navigation.css'], 'public/css/general.css');
    mix.styles(['mapSearch.css'], 'public/css/mapSearch.css');
    mix.styles(['bootstrap.min.css', 'ol.css', 'style.css', 'iframeSearch.css'], 'public/css/iframeSearch.css');
    mix.styles(['routing.css'], 'public/css/routing.css');
    mix.scripts(['md5.js', 'jquery.min.js', 'jquery-ui.min.js', 'jquery.ui.touch-punch.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'NominatimParser.js', 'ReversePositionManager.js', 'GpsManager.js',
     'SearchModule.js', 'LocalHistory.js', 'Results.js', 'RouteFinder.js', 'Waypoint.js', 'RouteFinderSearchResults.js', 'Route.js', 'Leg.js', 'Step.js', 'OfflineModule.js', 'NavigationModule.js', 'app.js'], 'public/js/map.js');
   // mix.scripts(['jquery.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'mapSearch.js'], 'public/js/mapSearch.js');
   // mix.scripts(['jquery.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'iframeSearch.js', 'iframeResizer.contentWindow.min.js'], 'public/js/iframeSearch.js');
    //mix.scripts(['jquery.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'mapSearch.js', 'routing.js', 'routeAssistent.js'], 'public/js/routing.js');
   // mix.scripts(['jquery.min.js', 'jquery-ui.min.js', 'jquery.ui.touch-punch.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'mapSearch.js', 'findRoute.js'], 'public/js/findRoute.js');
    mix.version(['public/css/staticPages.css', 'public/css/general.css', 'public/css/mapSearch.css', 'public/css/iframeSearch.css', 'public/css/routing.css', 'public/js/map.js']);
});