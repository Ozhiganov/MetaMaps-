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
    return view('map')->with('boundings', 'false');
});

Route::get('map/{search}/{latMin}/{lonMin}/{latMax}/{lonMax}', function ($search, $latMin, $lonMin, $latMax, $lonMax) {
    return view('map')->with('javascript', "/$search/$latMin/$lonMin/$latMax/$lonMax")->with('search', $search)->with('boundings', 'true');
});

Route::get('{search}/{latMin}/{lonMin}/{latMax}/{lonMax}/{adjustView?}/{limit?}', 'SearchController@boundingBoxSearch');

Route::get('{search}', 'SearchController@search');

Route::group(['prefix' => 'metager'], function () {
    Route::get('{search}', function ($search) {
        # Let's get some Searchresults if existent
        $searchResults = app('\App\Http\Controllers\SearchController')->search($search);
        if (sizeof($searchResults) > 0) {
            $javaScript = view('searchResults')->with("results", json_encode($searchResults))->with('adjustView', true)->with('boundingSuccess', true)->with('search', $search)->with('adjustLink', false);

            # Wir erstellen die Ergebnisseite (JavaScipt)
            return view('mapIframe')->with('search', $search)->with('script', $javaScript);
        } else {
            return view('empty');
        }
    });
});
