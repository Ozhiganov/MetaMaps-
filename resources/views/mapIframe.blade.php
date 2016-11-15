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
            <div class="map" id="map">
            </div>
            <div class="hidden" id="closer" title="Ergebnisse einklappen">
                >
            </div>
            <div class="col-xs-11 col-sm-6 col-md-3 hidden" data-status="in" id="results">
            </div>
        </main>
        <script src="/js/iframeSearch.js">
        </script>
        <script>
            $(document).ready(function(){
                updateMapExtent();
                var q = '{{$search}}';
                var url = '/' + q + '/' + encodeURI(extent[0]) + '/' + encodeURI(extent[1]) + '/' + encodeURI(extent[2]) + '/' + encodeURI(extent[3]);
                $.getScript(url);
            });
        </script>
    </body>
</html>
