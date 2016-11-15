<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('map');
});

Route::get('{search}/{latMin}/{lonMin}/{latMax}/{lonMax}/{adjustView?}', 'SearchController@boundingBoxSearch');

Route::get('metager/{search}', 'SearchController@iframeSearch');
