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

Route::get('map/{search}/{latMin}/{lonMin}/{latMax}/{lonMax}', function ($search, $latMin, $lonMin, $latMax, $lonMax) {
    return view('map')->with('javascript', "/$search/$latMin/$lonMin/$latMax/$lonMax")->with('search', $search);
});

Route::get('{search}/{latMin}/{lonMin}/{latMax}/{lonMax}/{adjustView?}', 'SearchController@boundingBoxSearch');

Route::get('metager/{search}', 'SearchController@iframeSearch');
