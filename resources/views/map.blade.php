<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8"/>
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport"/>
        <title>
            Maps - MetaGer
        </title>
        @if(isset($css))
            @foreach($css as $el)
                <link href="{{$el}}" rel="stylesheet" type="text/css"/>
            @endforeach
        @endif
    </head>
    <body>
        <main>
            <figure id="search-addon" style="position: absolute;">
                <form accept-charset="UTF-8" id="search" class="form-inline" onsubmit="return false;">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon hidden" id="exit-suggestions">
                                    <span class="glyphicon glyphicon-arrow-left">
                                    </span>
                                </div>
                                <div class="input-group-addon hidden-xs" id="logo">
                                    <div class="logo">
                                        <h1>
                                            Maps.MetaGer.de
                                        </h1>
                                    </div>
                                </div>
                                <input class="form-control" name="q" placeholder="Karten durchsuchen..." type="text" autocomplete="off" value="@if(isset($search)){{$search}}@endif"/>
                                <div class="input-group-addon" id="doSearch">
                                    <span class="glyphicon glyphicon-search">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div data-status="in" id="results">
                    </div>
                    <div id="result-toggler" class="hidden" title="Ergebnisliste ausklappen">
                        Liste anzeigen
                    </div>
            </figure>
            <div id="search-suggestions" class="visible-xs">

            </div>
            <div class="ol-popup" id="popup">
                <a class="ol-popup-closer" href="#" id="popup-closer">
                </a>
                <div id="popup-content">
                </div>
            </div>
            <div class="map" id="map">
            </div>

            <div id="start-navigation" class="hidden" title="Routenplaner starten">
                <a href="/route/start/foot">
                    <img src="/img/start-navigation.png" alt="Start Navigation" />
                </a>
            </div>

            <ul id="location-tool" class="list-unstyled hidden">
                <li id="lock-location" class="hidden"><span class="button glyphicon glyphicon-lock"></span><span class="info">Ansicht zentriert</span></li>
                <li id="follow-location"><span class="button glyphicon glyphicon-record"></span></li>
            </ul>
            <div id="gps-error" class="hidden">
            <span>MetaGer konnte Ihren genauen Standort nicht ermitteln.</span> <a href="/hilfe/gps" target="_blank">Warum?</a>
            </div>
            @if(isset($vars) && isset($vars["debug"]) && $vars["debug"])
            <div id="debug-box">
            </div>
            @endif
        </main>
        @if(isset($scripts))
            @foreach($scripts as $script)
                <script src="{{$script}}" ></script>
            @endforeach
        @endif
        <script>
            var boundings = {{$boundings}};
            @if($boundings === 'true')
            var minPos = {{$minPos}};
            var maxPos = {{$maxPos}};
            @endif
            var getPosition = {{$getPosition}};
            @if(isset($route))
            var route = '{{$route}}';
            @endif
            @if(isset($vars) && sizeof($vars) > 0)
            @foreach($vars as $key => $value)
            @if(gettype($value) === "string")
            var {!!$key!!} = '{!! $value !!}';
            @elseif(gettype($value) === "array" || gettype($value) === "boolean")
            var {!!$key!!} = {!! json_encode($value) !!};
            @else
            var {!!$key!!} = {!! $value !!};
            @endif
            @endforeach
            @endif
        </script>
        @if(isset($javascript))
        <script>
            $(document).ready(function(){
                $.getScript('{{$javascript}}');
            });
        </script>
        @endif
    </body>
</html>
