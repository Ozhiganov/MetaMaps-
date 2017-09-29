<?php

namespace App\Http\Controllers;

use Cache;
use Illuminate\Http\Request;
use Log;
use Response;

class RoutingController extends Controller
{
    public function calcRoute(Request $request, $vehicle, $points)
    {
        $debug = false;
        if ($request->has("debug")) {
            $debug = true;
        }
        return view('map')
            ->with('boundings', 'false')
            ->with('getPosition', 'false')
            ->with('vars', ['vehicle' => $vehicle, 'points' => $points, 'debug' => $debug])
            ->with('css', [elixir('/css/routing.css')])
            ->with('scripts', [elixir('js/routing.js')])
            ->with('getPosition', 'true');
    }

    public function routingOverviewGeoJson($vehicle, $points)
    {
        // This is the function to calculate the Route from $from to $to with the given vehicle
        $port = 0;
        switch ($vehicle) {
            case "bicycle":
                $port = 5001;
                break;
            case "car":
                $port = 5002;
                break;
            default:
                $port = 5000;
        }
        $url       = "http://maps.metager.de:$port/route/v1/$vehicle/$points?steps=true&geometries=geojson";
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

    public function routingGeoJson($vehicle, $points, $bearingStartPoint = "")
    {
        // This is the function to calculate the Route from $from to $to with the given vehicle
        $port = 0;
        switch ($vehicle) {
            case "bicycle":
                $port = 5001;
                break;
            case "car":
                $port = 5002;
                break;
            default:
                $port = 5000;
        }
        $url = "http://maps.metager.de:$port/route/v1/$vehicle/$points?steps=true&alternatives=true&geometries=geojson&overview=full&annotations=true";

        # Maybe we need to add Bearings:
        if ($bearingStartPoint !== "") {
            $bearing = $bearingStartPoint . ",90";
            # We got the starting Bearing submitted but we need to add bearings for the rest of the points, too
            $remainingPoints = sizeof(explode(";", $points)) - 1;
            for ($i = $remainingPoints; $i > 0; $i--) {
                # For each remaining Point we are gonna add a bearing of 0 with a range of 180°
                # Hopefully this will nullify the value
                $bearing .= ";0,180";
            }
            $url .= "&bearings=" . $bearing;
        }

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

        if ($result["code"] === "Ok") {
            $result   = json_encode($result);
            $response = Response::make($result, 200);
            $response->header('Content-Type', 'application/json');

            return $response;
        } else {

            abort(404);
        }

    }

    public function match($vehicle, $points, $timestamp, $radiuses)
    {
        // This is the function to calculate the Route from $from to $to with the given vehicle
        $port = 0;
        switch ($vehicle) {
            case "bicycle":
                $port = 5001;
                break;
            case "car":
                $port = 5002;
                break;
            default:
                $port = 5000;
        }
        $url = 'http://maps.metager.de:' . $port . '/match/v1/' . $vehicle . '/' . $points . '?steps=true&geometries=geojson&timestamps=' . $timestamp . '&radiuses=' . $radiuses;

        // make request
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);

        $response = Response::make($output, 200);
        $response->header('Content-Type', 'application/json');

        return $response;
    }

}
