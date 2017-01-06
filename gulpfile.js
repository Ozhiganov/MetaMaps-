const elixir = require('laravel-elixir');
require('laravel-elixir-vue-2');
/*
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
    mix.styles(['bootstrap.min.css', 'ol.css', 'style.css', 'mapSearch.css'], 'public/css/mapSearch.css');
    mix.styles(['bootstrap.min.css', 'ol.css', 'style.css', 'iframeSearch.css'], 'public/css/iframeSearch.css');
    mix.scripts(['jquery.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'mapSearch.js'], 'public/js/mapSearch.js');
    mix.scripts(['jquery.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'iframeSearch.js', 'iframeResizer.contentWindow.min.js'], 'public/js/iframeSearch.js');
    mix.scripts(['jquery.min.js', 'bootstrap.min.js', 'ol.js', 'map.js', 'mapSearch.js', 'routing.js'], 'public/js/routing.js');
});