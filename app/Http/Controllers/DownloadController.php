<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function downloadArea($minx, $miny, $maxx, $maxy, $zoomstart, $zoomend){
    	if($zoomstart > $zoomend || $minx > $maxx || $miny > $maxy){
    		abort(404);
    	}
    	$zip = new \ZipArchive();
    	$tmpdir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . getmypid() . ".zip";

    	// Create the temoporary Zip File that stores all the tiles
    	if($zip->open($tmpdir, file_exists($tmpdir) ? \ZipArchive::OVERWRITE : \ZipArchive::CREATE) == TRUE){
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
						$tile = public_path() . DIRECTORY_SEPARATOR . "tile_cache" . DIRECTORY_SEPARATOR . "$zoom" . DIRECTORY_SEPARATOR . "$x" . DIRECTORY_SEPARATOR . $y . ".png";
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
