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

Route::get('download/{minx}/{miny}/{maxx}/{maxy}/{zoomstart}/{zoomend}', 'DownloadController@downloadArea');

Route::group(['prefix' => 'map'], function () {
    Route::get('/', function () {
        return view('map')->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/general.css'), elixir('css/mapSearch.css'), elixir('css/routing.css')]);
    });
    Route::get('{position}', function ($position) {
        $positionData = explode(",", $position);
        if (sizeof($positionData) === 3) {
            $center = [$positionData[0], $positionData[1]];
            $zoom   = $positionData[2];
            return view('map')->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/general.css'), elixir('css/mapSearch.css'), elixir('css/routing.css')])
                ->with("vars", ["center" => $center, "zoom" => $zoom]);
        } else {
            return redirect('/');
        }
    });
    Route::get('{search}/{position}', function ($search, $position) {
        $positionData = explode(",", $position);
        if (sizeof($positionData) === 3) {
            $center = [$positionData[0], $positionData[1]];
            $zoom   = $positionData[2];
            return view('map')->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/general.css'), elixir('css/mapSearch.css'), elixir('css/routing.css')])
                ->with("vars", ["center" => $center, "zoom" => $zoom, "query" => $search]);
        } else {
            return redirect('/');
        }
    });
});

Route::group(['prefix' => 'reverse'], function () {
    Route::get('{lon}/{lat}', function ($lon, $lat) {
        $link = "https://tiles.metager.de/nominatim/reverse.php?format=json&lat=$lat&lon=$lon&zoom=18&extratags=1&addressdetails=1&namedetails=1";
        $resContent = file_get_contents($link);
        $response = Response::make($resContent, 200);
        $response->header("Content-Type", "application/json");
        return $response;
    });
});
Route::get('hilfe', function () {
    return view('help');
});
/*
Route::group(['prefix' => 'hilfe'], function () {

    Route::get('routen-assistent', function () {
        return view('routen-assistent')->with('css', [elixir('css/staticPages.css')]);
    });
});
*/
Route::group(['prefix' => 'route'], function () {
    Route::get('preview/{vehicle}/{points}', 'RoutingController@routingOverviewGeoJson');
    Route::get('find/{vehicle}/{points}/{startBearing?}', 'RoutingController@routingGeoJson');
    Route::get('match/{vehicle}/{points}/{timestamp}/{radiuses}', 'RoutingController@match');
    Route::get('start/{vehicle}/{points?}', function ($vehicle, $points = "") {
        $waypoints = "[]";
        if ($points !== "") {
            // Let's Convert
            $points = explode(";", $points);
            $waypoints = "[";
            foreach ($points as $index => $value) {
                if ($value === "gps") {
                    $waypoints .= '["gps"],';
                } else {
                    $pos         = explode(',', $value);
                    $waypoints .= "[" . $pos[0] . "," . $pos[1] . "],";
                }
            }
            $waypoints = rtrim($waypoints, ",");
            $waypoints .= "]";
        }
        return view('map')->with('scripts', [elixir('js/mapSearch.js')])->with('css', [elixir('css/general.css'), elixir('css/mapSearch.css'), elixir('css/routing.css')])
                ->with("vars", ["waypoints" => $waypoints, 'vehicle' => $vehicle]);
    });
    Route::get('search/{search}', function ($search) {
        $url      = "https://tiles.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=5&polygon_geojson=0&format=json&dedupe=1&extratags=1&addressdetails=1&namedetails=1";
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
    Route::get('{search}', 'SearchController@iframeSearch');
});

Route::get('tile_cache/{z}/{x}/{y}.png', function($z, $x, $y){

    // The request is sent we'll wait up to 10 seconds for the png to be generated
    $filepath =  public_path() . DIRECTORY_SEPARATOR . "tiles" . DIRECTORY_SEPARATOR . $z . DIRECTORY_SEPARATOR . $x . DIRECTORY_SEPARATOR . "$y.png";

    if(file_exists($filepath)){

        $content = file_get_contents($filepath);
        $response = Response::make($content, 200);
        $response->header('Content-Type', 'image/png');
        $response->header('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
        $response->header('Pragma', 'no-cache');
        $response->header('Expires', 'Wed, 11 Jan 1984 05:00:00 GMT');
        return $response;
    }else{
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_connect($socket, "127.0.0.1", 63825);

        socket_write($socket, "$z;$x;$y\n", strlen("$z;$x,$y\n"));

        $content = "";
        while(true){
            $tmp = socket_read($socket, 4096);
            if($tmp == "") break;
            else $content .= $tmp;
        }
        $response = Response::make($content, 200);
        $response->header('Content-Type', 'image/png');
        $response->header('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
        $response->header('Pragma', 'no-cache');
        $response->header('Expires', 'Wed, 11 Jan 1984 05:00:00 GMT');
        return $response;
    }

});


