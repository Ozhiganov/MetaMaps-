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
        $link          = "https://tiles.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=10&polygon_geojson=1&format=json&extratags=1&addressdetails=1&namedetails=1";
        $searchResults = $this->makeSearch($link, $search, true);
        return $searchResults;
    }

    public function boundingBoxSearch(Request $request, $search, $latMin, $lonMin, $latMax, $lonMax, $adjustView = true, $limit = 10)
    {
        $exactSearch  = filter_var($request->input('exactSearch', 'false'), FILTER_VALIDATE_BOOLEAN);
        $adjustLink   = filter_var($request->input('adjustLink', 'true'), FILTER_VALIDATE_BOOLEAN);
        $search       = urldecode($search);
        $adjustView   = filter_var($adjustView, FILTER_VALIDATE_BOOLEAN);
        $search       = urldecode($search);
        $exactMatches = 0;
        $results      = [];
        # Eine Suche in den gesamten Kartendaten führen wir nur durch, wenn keine View-Spezifische Suche durchgeführt werden soll
        if ($adjustView) {
            # Wir werden zunächst eine Suche ohne das übergebene Gebiet als Begrenzung durchführen.
            $link         = "https://tiles.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=$limit&polygon_geojson=1&format=json&dedupe=1&extratags=1&addressdetails=1&namedetails=1";
            $results      = $this->makeSearch($link, $search, false);
            $exactMatches = $this->getExactMatchesCount($search, $results);
        }

        # Wir wollen nun wissen, wie viele von den Ergebnissen genau auf die Suchanfrage passen

        if ($exactMatches >= 10) {
            # Okay, das sind ganz schön viele Ergebnisse
            # Es würde sich wohl lohnen die Suche doch auf das angegebene Gebiet zu begrenzen
            $link       = "https://tiles.metager.de/nominatim/search.php?q=" . urlencode($search) . "&limit=$limit&dedupe=1&bounded=1&polygon_geojson=1&viewbox=$latMin,$lonMin,$latMax,$lonMax&format=json&extratags=1&addressdetails=1&namedetails=1";
            $tmpResults = $this->makeSearch($link, $search, false);
            # Wenn In diesem Bereich Ergebnisse gefunden wurden, nehmen wir diese an Stelle der anderen:
            if (sizeof($tmpResults) > 0) {
                $results      = $tmpResults;
                $exactMatches = $this->getExactMatchesCount($search, $results);
            }
        }

        // Gibt an, ob die Suche im angezeigten Bereich erfolgreich war:
        $boundingSuccess = true;

        $response = Response::make($results, 200);
        $response->header("Content-Type", "application/json");
        return $response;

        # Wenn wir keine Ergebnisse haben, müssen wir auch nichts anzeigen:
        if (sizeof($results) === 0) {
            $response = Response::make('', 200);
            $response->header("Content-Type", "application/javascript");
            return $response;
        } else {
            # Wir erstellen die Ergebnisseite (JavaScipt)
            $response = Response::make(view('searchResults')->with("results", json_encode($results))->with('adjustView', $adjustView)->with('boundingSuccess', $boundingSuccess)->with('bounds', [$latMin, $lonMin, $latMax, $lonMax])->with('search', $search)->with('adjustLink', $adjustLink)->with("exactMatches", $exactMatches), 200);
            $response->header('Content-Type', 'application/javascript');
            return $response;
        }
    }

    private function makeSearch($link, $search, $exactSearch = false)
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
                    $match = false;
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
                # Marker
                $result["title"]        = substr($result["display_name"], 0, strpos($result["display_name"], ","));
                $result["huerotate"]    = hexdec(substr(md5(serialize($result)), 0, 5)) % 360;

                $searchResults[] = $result;
            }
        }
        return $searchResults;
    }

    private function getExactMatchesCount($search, $results)
    {
        $exactMatches  = 0;
        $wordsInSearch = [];
        if (preg_match_all('/([a-zA-Z]|\xC3[\x80-\x96\x98-\xB6\xB8-\xBF]|\xC5[\x92\x93\xA0\xA1\xB8\xBD\xBE]){4,}/', $search, $match_arr)) {
            $wordsInSearch = $match_arr[0];
            $result        = [];
            foreach ($wordsInSearch as $word) {
                $result[] = preg_quote($word, "/");
            }
            $wordsInSearch = $result;
        }

        foreach ($results as $result) {
            $n_words = preg_match_all('/([a-zA-Z]|\xC3[\x80-\x96\x98-\xB6\xB8-\xBF]|\xC5[\x92\x93\xA0\xA1\xB8\xBD\xBE]){4,}/', $result["display_name"], $match_arr);
            if ($n_words) {
                $hasEveryWord = true;
                foreach ($wordsInSearch as $word) {
                    $hasThisWord = false;
                    foreach ($match_arr[0] as $wordInResult) {
                        if (stripos($wordInResult, $word) !== false) {
                            $hasThisWord = true;
                            break;
                        }
                    }
                    if (!$hasThisWord) {
                        $hasEveryWord = false;
                        break;
                    }
                }
                if ($hasEveryWord) {
                    $exactMatches++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        return $exactMatches;
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
        # Let's get some Searchresults if existent
        $searchResults = app('\App\Http\Controllers\SearchController')->search($search);
        if (sizeof($searchResults) > 0) {
            $exactMatches = $this->getExactMatchesCount($search, $searchResults);
            $javaScript   = view('searchResults')->with("results", json_encode($searchResults))->with('adjustView', true)->with('boundingSuccess', true)->with('search', $search)->with('adjustLink', false)->with("exactMatches", $exactMatches);

            # Wir erstellen die Ergebnisseite (JavaScipt)
            return view('mapIframe')->with('search', $search)->with('script', $javaScript);
        } else {
            return view('empty');
        }
    }
}
