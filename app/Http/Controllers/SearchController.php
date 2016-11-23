<?php

namespace App\Http\Controllers;

use Cache;
use Predis\Connection\ConnectionException;
use Response;
use \Illuminate\Http\Request;

class SearchController extends Controller
{

    public function search($search)
    {
        $link          = "https://maps.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=10&polygon_geojson=1&format=json&extratags=1&addressdetails=1";
        $searchResults = $this->makeSearch($link);
        return $searchResults;
    }

    public function boundingBoxSearch(Request $request, $search, $latMin, $lonMin, $latMax, $lonMax, $adjustView = true, $limit = 50)
    {
        $exactSearch = filter_var($request->input('exactSearch', 'false'), FILTER_VALIDATE_BOOLEAN);
        $adjustLink  = filter_var($request->input('adjustLink', 'true'), FILTER_VALIDATE_BOOLEAN);
        $search      = urldecode($search);
        $adjustView  = filter_var($adjustView, FILTER_VALIDATE_BOOLEAN);
        $search      = urldecode($search);

        // Gibt an, ob die Suche im angezeigten Bereich erfolgreich war:
        $boundingSuccess = true;
        # Get The Search Results
        $link    = "https://maps.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=$limit&bounded=1&polygon_geojson=1&viewbox=$latMin,$lonMin,$latMax,$lonMax&format=json&extratags=1&addressdetails=1";
        $results = $this->makeSearch($link, $exactSearch);

        if (!$results && $latMin && $lonMin && $latMax && $lonMax) {
            $boundingSuccess = false;
            $link            = "https://maps.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=$limit&polygon_geojson=1&format=json&extratags=1&addressdetails=1";
            $results         = $this->makeSearch($link);
        }

        # Wir erstellen die Ergebnisseite (JavaScipt)
        $response = Response::make(view('searchResults')->with("results", json_encode($results))->with('adjustView', $adjustView)->with('boundingSuccess', $boundingSuccess)->with('bounds', [$latMin, $lonMin, $latMax, $lonMax])->with('search', $search)->with('adjustLink', $adjustLink), 200);
        $response->header('Content-Type', 'application/javascript');
        return $response;
    }

    private function makeSearch($link, $exactSearch = false)
    {

        $results = [];
        if ($this->canCache()) {
            $hash = md5($link);
            if (Cache::has($hash)) {
                $results = unserialize(base64_decode(Cache::get($hash)));
            } else {
                $results = json_decode(file_get_contents($link), true);
                Cache::put($hash, base64_encode(serialize($results)), 10080);
            }
        } else {
            # If the Cache is not there we can just execute a search
            $results = json_decode(file_get_contents($link), true);
        }

        $searchResults = [];
        if ($results) {
            foreach ($results as $result) {
                if ($exactSearch) {
                    $searchWords = explode(" ", $search);
                    $match       = false;
                    foreach ($searchWords as $word) {
                        foreach ($result["address"] as $key => $value) {
                            if (($key === "hamlet" || $key === "village" || $key === "suburb" || $key === "subdistrict" || $key === "district" || $key === "province" || $key === "state" || $key === "city" || $key === "place" || $key === "street" || $key === "country" || $key === "housename") && stripos($value, $word) !== false) {
                                $match = true;
                                break 2;
                            }
                        }
                    }
                    if (!$match) {
                        continue;
                    }
                }
                $tmp = [];
                # Marker
                $tmp["lon"] = $result["lon"];
                $tmp["lat"] = $result["lat"];

                $tmp["title"]       = substr($result["display_name"], 0, strpos($result["display_name"], ","));
                $tmp["type"]        = $result["type"];
                $tmp["address"]     = $result["address"];
                $tmp["extratags"]   = $result["extratags"];
                $tmp["boundingbox"] = $result["boundingbox"];
                $tmp["geojson"]     = $result["geojson"];
                $tmp["huerotate"]   = hexdec(substr(md5(serialize($result)), 0, 5)) % 360;
                $tmp["place_id"]    = $result["place_id"];

                $searchResults[] = $tmp;
            }
        }
        return $searchResults;
    }

    private function canCache()
    {
        # Cachebarkeit testen
        try {
            Cache::has('test');
            return true;
        } catch (ConnectionException $e) {
            return false;
        }
    }

    public function iframeSearch($search)
    {
        # Bei der Iframe Suche begrenzen wir die Ergebniszahl auf 3
        $link          = "https://maps.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=3&polygon_geojson=1&format=json&extratags=1&addressdetails=1";
        $results       = json_decode(file_get_contents($link), true);
        $searchResults = [];
        if ($results) {
            foreach ($results as $result) {
                $tmp = [];
                # Marker
                $tmp["lon"] = $result["lon"];
                $tmp["lat"] = $result["lat"];

                $tmp["title"]       = substr($result["display_name"], 0, strpos($result["display_name"], ","));
                $tmp["type"]        = $result["type"];
                $tmp["address"]     = $result["address"];
                $tmp["extratags"]   = $result["extratags"];
                $tmp["boundingbox"] = $result["boundingbox"];
                $tmp["geojson"]     = $result["geojson"];
                $tmp["huerotate"]   = hexdec(substr(md5(serialize($result)), 0, 5)) % 360;
                $tmp["place_id"]    = $result["place_id"];

                $searchResults[] = $tmp;
            }
        }
        # Wir erstellen die Ergebnisseite (JavaScipt)
    }
}
