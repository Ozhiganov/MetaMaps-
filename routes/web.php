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
    return redirect('map');

});

Route::group(['prefix' => 'map'], function () {
    Route::get('/', function () {
        return view('map')->with('boundings', 'false')->with('getPosition', 'true')->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/mapSearch.css')]);
    });
    Route::get('{position}', function ($position) {
        $positionData = explode(",", $position);
        if (sizeof($positionData) === 3) {
            $center = [$positionData[0], $positionData[1]];
            $zoom   = $positionData[2];
            return view('map')->with('boundings', 'false')->with('getPosition', 'false')->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/mapSearch.css')])->with("vars", ["center" => $center, "zoom" => $zoom]);
        } else {
            return redirect('/');
        }
    });
    Route::get('{search}/{position}', function ($search, $position) {
        $positionData = explode(",", $position);
        if (sizeof($positionData) === 3) {
            $center = [$positionData[0], $positionData[1]];
            $zoom   = $positionData[2];
            return view('map')->with('boundings', 'false')->with('getPosition', 'false')->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/mapSearch.css')])->with("vars", ["center" => $center, "zoom" => $zoom, "query" => $search]);
        } else {
            return redirect('/');
        }
    });
});

Route::group(['prefix' => 'hilfe'], function () {
    Route::get('gps', function () {
        return view('gps')->with('css', [elixir('css/staticPages.css')]);
    });
    Route::get('routen-assistent', function () {
        return view('routen-assistent')->with('css', [elixir('css/staticPages.css')]);
    });
});

Route::group(['prefix' => 'route'], function () {
    Route::get('preview/{vehicle}/{points}', 'RoutingController@routingOverviewGeoJson');
    Route::get('find/{vehicle}/{points}/{hints?}', 'RoutingController@routingGeoJson');
    Route::get('match/{vehicle}/{points}/{timestamp}/{radiuses}', 'RoutingController@match');
    Route::get('start/{vehicle}/{points?}', function ($vehicle, $points = "") {
        $waypoints = [];
        if ($points !== "") {
            // Let's Convert
            $points = explode(";", $points);
            foreach ($points as $index => $value) {
                if ($value === '') {
                    $waypoints[] = '';
                } elseif ($value === "gps") {
                    $waypoints[] = 'gps';
                } else {
                    $pos         = explode(',', $value);
                    $pos[0]      = floatval($pos[0]);
                    $pos[1]      = floatval($pos[1]);
                    $waypoints[] = $pos;
                }
            }
        }
        return response(view('map')->with('boundings', 'false')->with('getPosition', 'true')->with('scripts', [elixir('js/findRoute.js')])->with("vars", ["waypoints" => $waypoints, 'vehicle' => $vehicle])->with('css', [elixir('css/routing.css')]))->header('Vary', 'Accept');
    });
    Route::get('search/{search}', function ($search) {
        $url      = "https://maps.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=5&polygon_geojson=0&format=json&extratags=0&addressdetails=0";
        $content  = file_get_contents($url);
        $response = Response::make($content, 200);
        $response->header('Content-Type', 'application/json');
        return $response;
    });
    Route::get('{vehicle}/{points}', 'RoutingController@calcRoute');
});

Route::get('map/{search}/{latMin}/{lonMin}/{latMax}/{lonMax}', function ($search, $latMin, $lonMin, $latMax, $lonMax) {
    return view('map')->with('javascript', "/$search/$latMin/$lonMin/$latMax/$lonMax")->with('search', $search)->with('boundings', 'true')->with('getPosition', 'false')->with('minPos', json_encode([floatval($latMin), floatval($lonMin)]))->with('maxPos', json_encode([floatval($latMax), floatval($lonMax)]))->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/mapSearch.css')]);
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
