<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;

class DownloadController extends Controller
{

    public function listFiles($minLon, $minLat, $maxLon, $maxLat){
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_connect($socket, "127.0.0.1", 63825);

        socket_write($socket, "list-files;$minLon;$minLat;$maxLon;$maxLat\n", strlen("list-files;$minLon;$minLat;$maxLon;$maxLat\n"));

        $content = "";
        while(true){
            $tmp = socket_read($socket, 4096);
            if($tmp === FALSE){
                abort(404, "File not found");
            }
            if($tmp == "") break;
            else $content .= $tmp;
        }
        socket_close($socket);

        $response = Response::make($content, 200);
        $response->header('Content-Type', 'application/json');
        $response->header('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
        $response->header('Pragma', 'no-cache');
        $response->header('Expires', 'Wed, 11 Jan 1984 05:00:00 GMT');
        return $response;
    }

    public function downloadFiles($minLon, $minLat, $maxLon, $maxLat){
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_connect($socket, "127.0.0.1", 63825);

        socket_write($socket, "download-files;$minLon;$minLat;$maxLon;$maxLat\n", strlen("download-files;$minLon;$minLat;$maxLon;$maxLat\n"));

        $content = "";
        while(true){
            $tmp = socket_read($socket, 4096);
            if($tmp === FALSE) break;
            if($tmp == "") break;
            else $content .= $tmp;
        }
        socket_close($socket);

        # The result is a path to the Zip File that will get downloaded
        if(file_exists($content)){
            return response()->download($content, "offline-data.tar", 
                [
                    "Content-Type" => "application/tar",
                    "Pragma" => "public",
                    "Expires" => "0",
                    "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
                    "Content-Description" => "File Transfer",
                    "Content-Transfer-Encoding" => "binary",
                    "Content-Length" => sizeof($content)
                ])->deleteFileAfterSend(true);
        }else{
            abort(404, "File not found");
        }
    }

    public function downloadAssets(){
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_connect($socket, "127.0.0.1", 63825);

        socket_write($socket, "download-assets\n", strlen("download-assets\n"));

        $content = "";
        while(true){
            $tmp = socket_read($socket, 4096);
            if($tmp === FALSE) break;
            if($tmp == "") break;
            else $content .= $tmp;
        }
        socket_close($socket);

        # The result is a path to the Zip File that will get downloaded
        if(file_exists($content)){
            return response()->download($content, "asset-data.tar", 
                [
                    "Content-Type" => "application/tar",
                    "Pragma" => "public",
                    "Expires" => "0",
                    "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
                    "Content-Description" => "File Transfer",
                    "Content-Transfer-Encoding" => "binary",
                    "Content-Length" => sizeof($content)
                ])->deleteFileAfterSend(true);
        }else{
            abort(404, "File not found");
        }
    }

    public function downloadArea($minx, $miny, $maxx, $maxy, $zoomstart, $zoomend){
    	if($zoomstart > $zoomend || $minx > $maxx || $miny > $maxy){
    		abort(404);
    	}
    	$zip = new \ZipArchive();
    	$tmpdir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . getmypid() . ".zip";

    	// Create the temoporary Zip File that stores all the tiles
    	if($zip->open($tmpdir, file_exists($tmpdir) ? \ZipArchive::OVERWRITE : \ZipArchive::CREATE)){
    		for($zoom = $zoomstart; $zoom <= $zoomend; $zoom++){
    			// calculate the bbox for this Zoom
    			$xmintile = floor((($minx + 180) / 360) * pow(2, $zoom));
				$ymintile = floor((1 - log(tan(deg2rad($maxy)) + 1 / cos(deg2rad($maxy))) / pi()) /2 * pow(2, $zoom));
				$xmaxtile = floor((($maxx + 180) / 360) * pow(2, $zoom));
				$ymaxtile = floor((1 - log(tan(deg2rad($miny)) + 1 / cos(deg2rad($miny))) / pi()) /2 * pow(2, $zoom));
				// Now we have a range of Tiles for each Zoom Level
				// We should've Prerendered all the requested Tiles and cann add them to the Zip archive
				for($x = $xmintile; $x <= $xmaxtile; $x++){
					for($y = $ymintile; $y <= $ymaxtile; $y++){
						$tile = public_path() . DIRECTORY_SEPARATOR . "tiles" . DIRECTORY_SEPARATOR . "$zoom" . DIRECTORY_SEPARATOR . "$x" . DIRECTORY_SEPARATOR . $y . ".png";
						$zipTile = "offline_tiles" . DIRECTORY_SEPARATOR . "$zoom" . DIRECTORY_SEPARATOR . "$x" . DIRECTORY_SEPARATOR . $y . ".png";
						if(file_exists($tile)){
							$zip->addFile($tile, $zipTile);
						}
						
					}
				}
    		}
    		$zip->close();
    		return response()->download($tmpdir, "offline-tiles.zip", 
    			[
    				"Content-Type" => "application/zip",
    				"Pragma" => "public",
    				"Expires" => "0",
    				"Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
    				"Content-Description" => "File Transfer",
    				"Content-Transfer-Encoding" => "binary"
    			])->deleteFileAfterSend(true);
    	}else{
    		abort(404);
    	}
    }
}
