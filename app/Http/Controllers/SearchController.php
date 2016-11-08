<?php

namespace App\Http\Controllers;

use Response;

class SearchController extends Controller
{
    //
    public function boundingBoxSearch($search, $latMin, $lonMin, $latMax, $lonMax, $adjustView = true)
    {
        $search = urldecode($search);

        # Get The Search Results
        $link    = "https://maps.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=1000&bounded=1&polygon_geojson=1&viewbox=$latMin,$lonMin,$latMax,$lonMax&format=json&extratags=1&addressdetails=1";
        $results = json_decode(file_get_contents($link), true);

        if (!$results && $latMin && $lonMin && $latMax && $lonMax) {
            $link    = "https://maps.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=1000&polygon_geojson=1&format=json&extratags=1&addressdetails=1";
            $results = json_decode(file_get_contents($link), true);
        }

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
                $searchResults[]    = $tmp;
            }
        }
        # Wir erstellen die Ergebnisseite (JavaScipr)
        $response = Response::make(view('searchResults')->with("results", json_encode($searchResults))->with('adjustView', $adjustView), 200);
        $response->header('Content-Type', 'application/javascript');
        return $response;
    }
}
