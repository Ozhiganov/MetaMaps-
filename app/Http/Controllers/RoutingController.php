<?php

namespace App\Http\Controllers;

use Cache;
use Log;

class RoutingController extends Controller
{
    public function calcRoute($vehicle, $from, $to)
    {
        // This is the function to calculate the Route from $from to $to with the given vehicle
        $url       = "http://maps.metager.de:5000/route/v1/$vehicle/$from;$to?steps=true&geometries=geojson";
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
            ->with('scripts', ['/js/routing.js']);
    }
}
