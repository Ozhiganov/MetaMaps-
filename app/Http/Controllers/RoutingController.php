<?php

namespace App\Http\Controllers;

use Cache;
use Log;
use Response;

class RoutingController extends Controller
{
    public function calcRoute($vehicle, $points)
    {
        // This is the function to calculate the Route from $from to $to with the given vehicle
        $url       = "http://maps.metager.de:5000/route/v1/$vehicle/$points?steps=true&geometries=geojson";
        $cacheHash = md5($url);
        if (Cache::has($cacheHash)) {
            $result = Cache::get($cacheHash);
        } else {
            $result = "";
            try {
                $result = file_get_contents($url);
                $result = base64_encode($result);
                Cache::put($cacheHash, $result, 60);
            } catch (\ErrorException $e) {
                Log::error("Konnte den Routing Server nicht erreichen");
            }
        }

        return view('map')
            ->with('boundings', 'false')
            ->with('getPosition', 'false')
            ->with('route', $cacheHash)
            ->with('css', ['/css/routing.css'])
            ->with('scripts', ['/js/routing.js']);
    }

    public function routingOverviewGeoJson($vehicle, $points)
    {
        // This is the function to calculate the Route from $from to $to with the given vehicle
        $url       = "http://maps.metager.de:5000/route/v1/$vehicle/$points?steps=true&geometries=geojson";
        $cacheHash = md5($url);
        if (Cache::has($cacheHash)) {
            $result = Cache::get($cacheHash);
        } else {
            $result = "";
            try {
                $result = file_get_contents($url);
                $result = base64_encode($result);
                Cache::put($cacheHash, $result, 60);
            } catch (\ErrorException $e) {
                Log::error("Konnte den Routing Server nicht erreichen");
            }
        }

        $result = base64_decode($result);

        $result = json_decode($result, true);

        $duration = $result["routes"][0]["duration"];
        $distance = $result["routes"][0]["distance"];

        // If there is no geometry we will return an empty geojson Object
        $geojson = "{coordinates: [],type: \"LineString\"}";
        if ($result["code"] === "Ok" && sizeof($result["routes"]) >= 1) {
            $geojson = $result["routes"][0]["geometry"];
        }

        $result = ['duration' => $duration, 'distance' => $distance, 'geojson' => $geojson];
        $result = json_encode($result);

        $response = Response::make($result, 200);
        $response->header('Content-Type', 'application/json');

        return $response;
    }
}
