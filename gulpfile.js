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
    mix.styles(['bootstrap.min.css', 'ol.css', 'style.css']);
    mix.scripts(['jquery.min.js', 'bootstrap.min.js', 'iframeResizer.contentWindow.min.js', 'ol.js', 'map.js']);
});