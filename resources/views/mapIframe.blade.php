<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8"/>
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport"/>
        <title>
            Maps - MetaGer
        </title>
        <link href="/css/iframeSearch.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <main>
            <div class="ol-popup" id="popup">
                <a class="ol-popup-closer" href="#" id="popup-closer">
                </a>
                <div id="popup-content">
                </div>
            </div>
            <div class="col-xs-8 col-md-9" id="map-container">
            <div class="map" id="map" >
            </div>
            </div>
            <div class="col-xs-4 col-md-3 hidden" data-status="in" id="results">
            </div>
            <div class="clearfix"></div>
        </main>
        <script src="/js/iframeSearch.js">
        </script>
        <script>
            $(document).ready(function(){
                {!! $script !!}
                updateMapExtent();
                var q = '{{$search}}';
                var link = "https://maps.metager.de/map/"+q+"/"+extent[0]+"/"+extent[1]+"/"+extent[2]+"/"+extent[3];
                if(typeof searchResults !== "undefined" && searchResults.length > 0){
                    $("body").css("visibility", "visible");
                }
                $("#results .result, #map").click(function(){
                    updateMapExtent();
                    window.open(link);
                });
                $(".result .btn").click(function(e){e.stopPropagation();});
            });
        </script>
    </body>
</html>
