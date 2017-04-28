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
            <figure id="search-addon" class="">
                <form accept-charset="UTF-8" id="search" class="form-inline">
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
                                <input class="form-control" name="q" placeholder="Karten durchsuchen..." type="text" autocomplete="off" value="@if(isset($search)){{$search}}@endif"/ onsubmit="return false;">
                                <div class="input-group-addon" id="doSearch">
                                    <button type="submit" class="glyphicon glyphicon-search">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="results">
                        <div class="results-container" data-status="in">

                        </div>
                        <div class="history-container">

                        </div>
                    </div>
                    <div id="result-toggler" class="hidden" title="Ergebnisliste ausklappen">
                        Liste anzeigen
                    </div>
            </figure>
            <figure id="route-finder-addon">
                <div id="vehicle-chooser">
                    <label class="radio-inline" title="Fußgänger">
                      <input type="radio" name="vehicle" value="foot"> <div><img src="/img/silhouette-walk.png" height="20px" /></div>
                    </label>
                    <label class="radio-inline" title="Fahrrad">
                      <input type="radio" name="vehicle" value="bicycle"> <div><img src="/img/bike.png" height="20px" /></div>
                    </label>
                    <label class="radio-inline" title="Auto">
                      <input type="radio" name="vehicle" value="car"> <div><img src="/img/car.png" height="20px" /></div>
                    </label>
                    <button type="button" class="close" aria-label="Close" title="Routenplanung abbrechen">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </figure>
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
        </main>
        <script src="{{ elixir('js/map.js') }}" type="text/javascript" defer></script>
    </body>
</html>
