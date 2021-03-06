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
            <figure id="hilfe" class="inactive">
                <iframe src=""></iframe>
                <span class="close">&#10005;</span>
            </figure>
            <figure id="search-addon" class="">
                <form accept-charset="UTF-8" id="search" class="form-inline">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon hidden" id="exit-suggestions">
                                    <span class="glyphicon glyphicon-arrow-left">
                                    </span>
                                </div>
                                <div class="input-group-addon hidden-xs logo">
                                    <div >
                                        <h1>
                                            Maps.MetaGer.de
                                        </h1>
                                    </div>
                                </div>
                                <div class="input-group-addon dropdown inactive" id="options">
                                    <button id="options-button" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="glyphicon glyphicon-menu-hamburger"></button>
                                    <ul class="dropdown-menu" aria-labelledby="options-button">
                                        <li class="offline-karten"><a href="#" class="">Offline Karten</a></li>
                                        <li class="hilfe"><a href="javascript:void(null);" target="_blank">Hilfe</a></li>
                                    </ul>
                                </div>
                                <input class="form-control" name="q" placeholder="Karten durchsuchen..." type="text" autocomplete="off" value="@if(isset($search)){{$search}}@endif"/ onsubmit="return false;">
                                <div class="input-group-addon" id="doSearch">
                                    <button type="submit" class="glyphicon glyphicon-search">
                                    </button>
                                </div>
                            </div>
                            <div class="history-container">
                                <div class="searches"></div>
                            </div>
                        </div>
                    </form>
                    <div class="results">
                        <div class="container-fluid wait-for-search">
                            <p>
                                Ergebnisse werden geladen 
                            </p>
                            <div class="no-internet">
                                <div class="status">
                                    <p>
                                        <span class="glyphicon glyphicon-warning-sign" style="color:red;"></span> Schlechte Internetverbindung
                                    </p>
                                    
                                </div>
                            </div>
                            <div>
                                <p>
                                    <img src="/img/ajax-loader.gif" alt="loading..." id="loading-search-results" />
                                </p>
                            </div>
                        </div>
                        <div class="results-container" data-status="in">

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
                    <button type="button" class="btn btn-sm btn-success start-navigation inactive">Navigation starten</button>
                    <button type="button" class="close" aria-label="Close" title="Routenplanung abbrechen">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="results">
                    <div class="container-fluid wait-for-search">
                        <p>
                            Ergebnisse werden geladen 
                        </p>
                        <div class="no-internet">
                            <div class="status">
                                <p>
                                    <span class="glyphicon glyphicon-warning-sign" style="color:red;"></span> Schlechte Internetverbindung
                                </p>
                                
                            </div>
                        </div>
                        <div>
                            <img src="/img/ajax-loader.gif" alt="loading..." id="loading-search-results" />
                        </div>
                    </div>
                    <div class="results-container">
                    </div>
                </div>
                <div id="waypoint-list-container" >
                    <div class="mobiles-window"></div>
                    <div class="route-information">
                        <div class="length"></div>
                        <div class="duration"></div>
                    </div>
                    <div class="container-fluid wait-for-search">
                        <p>
                            Route wird berechnet
                        </p>
                        <div class="no-internet">
                            <div class="status">
                                <p>
                                    <span class="glyphicon glyphicon-warning-sign" style="color:red;"></span> Schlechte Internetverbindung
                                </p>
                                
                            </div>
                        </div>
                        <div>
                            <img src="/img/ajax-loader.gif" alt="loading..." id="loading-search-results" />
                        </div>
                    </div>
                    <ul id="waypoint-list" class="list-unstyled"></ul>
                </div>
            </figure>
            <figure id="offline-addon" class="addon">
                <div id="heading">
                    <div class="exit">
                        <span class="glyphicon glyphicon-arrow-left">
                        </span>
                    </div>
                    <div class="logo">
                        <div>
                            <h1>
                                Maps.MetaGer.de
                                <small>Offline</small>
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="results">
                    <div class="downloaded-areas">
                        <div class="placeholder no-areas">Noch kein Gebiet heruntergeladen</div>
                        <div class="placeholder loading-areas"><img src="/img/ajax-loader.gif" alt="loading" /> Lade Gebiete</div>
                        <div class="add-area placeholder">
                            <a href="#">+ Gebiet für Download hinzufügen</a>
                        </div>
                        <div class="auto-updates palceholder inactive">
                            <div class="option">
                                <label class="switch">
                                  <input type="checkbox" checked>
                                  <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="text">
                                Automatische Updates
                            </div>
                        </div>
                    </div>
                    <div class="area-selection inactive" style="display: flex; align-items: center; text-align:center; font-weight: bold; font-size: 12px;">
                         <div id="download-information" style="padding: 0 10px;">
                            <div class="size"></div>
                            <div class="last-modified"></div>
                        </div>
                        <div class="text" style="flex-grow: 1;">Bewege die Karte, sodass das herunterzuladende Gebiet angezeigt wird und klicke rechts auf download.</div>
                        <div id="start-download" style="padding: 0 20px;color: green;font-size: 20px;">
                            <span class="glyphicon glyphicon-download-alt inactive"></span>
                            <img src="/img/ajax-loader.gif" alt="loading" />
                        </div>
                    </div>
                    <div class="download-progress inactive">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                                0%
                            </div>
                            
                        </div>
                        <div class="abort"><span class="glyphicon glyphicon-remove-sign"></span></div>
                    </div>
                </div>
            </figure>
            <figure id="navigation" class="inactive">
                <div id="next-step"></div>
                <div id="general-information">
                    <div class="exit" title="Navigation beenden"><span class="glyphicon glyphicon-remove" style="color: #777;"></span></div>
                    <div class="information">
                        <div class="duration"></div>
                        <div class="seperator">·</div>
                        <div class="length"></div>
                        <div class="seperator">·</div>
                        <div class="time"></div>
                    </div>
                </div>
                <div class="leg-finish">
                    <div class="container">
                        <div class="text">Sie haben Ihr Ziel<br> "Gehägestraße 43" <br> erreicht</div>
                        <div class="information">
                            <div class="start-time">
                                <div class="label">Startzeit</div>
                                <div class="time">
                                    <span class="glyphicon glyphicon-time"></span>
                                    7:55
                                </div>
                            </div>
                            <div class="arrival-time">
                                <div class="label">Ankunftszeit</div>
                                <div class="time">
                                    <span class="glyphicon glyphicon-time"></span>
                                    7:58
                                </div>
                            </div>    
                        </div>
                        <div class="duration">
                            <div class="label">Dauer</div>
                            <div class="time">
                                <span class="glyphicon glyphicon-time"></span>
                                3 Min <span class="plus"> (+ 5 Min)</span>
                            </div>
                        </div>
                        <div class="options">
                            <div class="continue">
                                <a href="javascript:void(0)" class="btn btn-info btn-xs">nächster Wegpunkt</a>
                            </div>
                            <div class="abort">
                                <a href="javascript:void(0)" class="btn btn-info btn-xs">Navigation verlassen</a>
                            </div>
                        </div>
                    </div>
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

            <div id="start-navigation" title="Routenplaner starten">
                <img src="/img/start-navigation.png" alt="Start Navigation" />
            </div>

            <ul id="location-tool" class="list-unstyled hidden">
                <li id="lock-location" class="hidden"><span class="button glyphicon glyphicon-lock"></span><span class="info">Ansicht zentriert</span></li>
                <li id="follow-location"><span class="button glyphicon glyphicon-record"></span></li>
            </ul>
            <div id="gps-error" class="hidden">
            <span>MetaGer konnte Ihren genauen Standort nicht ermitteln.</span> <a href="/hilfe" target="_blank">Warum?</a>
            </div>
        </main>
        @if(isset($vars))
        <script type="text/javascript">
            @if(isset($vars["center"]))
                var pos = [{!!$vars["center"][0]!!}, {!!$vars["center"][1]!!}];
            @endif
            @if(isset($vars["center"]))
                var zoom = {!!$vars["zoom"]!!};
            @endif
            @if(isset($vars["query"]))
                var query = "{!!$vars["query"]!!}";
            @endif
            @if(isset($vars['waypoints']) && isset($vars['vehicle']))
                var vehicle = "{!!$vars['vehicle']!!}";
                var waypoints = {!!$vars['waypoints']!!};
            @endif
        </script>
        @endif
        <script src="/js/modules.js" type="text/javascript" defer></script>
        <script src="{{ elixir('js/map.js') }}" type="text/javascript" defer></script>
    </body>
</html>
