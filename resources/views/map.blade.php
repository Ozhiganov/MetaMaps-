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
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button aria-expanded="false" class="navbar-toggle collapsed" data-target="#navbar-collapse" data-toggle="collapse" type="button">
                        <span class="sr-only">
                            Toggle navigation
                        </span>
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                    <a class="navbar-brand" href="{{ url('/') }}">
                        <div class="logo">
                            <h1>
                                Maps<small>.metager.de</small>
                            </h1>
                        </div>
                    </a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="navbar-collapse">
                    <form accept-charset="UTF-8" class="navbar-form navbar-right" id="search" method="GET">
                        <div class="form-group">
                            <div class="input-group">
                                <input class="form-control" name="q" placeholder="Karten durchsuchen..." type="text" value="@if(isset($search)){{$search}}@endif"/>
                                <div class="input-group-addon" id="doSearch">
                                    <span class="glyphicon glyphicon-search">
                                    </span>
                                </div>
                                <div class="input-group-addon" id="clearInput" title="Sucheingabe löschen">
                                    <span class="font-bold">
                                        X
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="https://metager.de" target="_blank">MetaGer.de</a></li>
                        <li><a href="https://metager.de/impressum" target="_blank">Impressum</a></li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
        <main>
            <div id="beta-info" class="alert alert-info alert-dismissible" role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
              <strong>Maps.metager.de:</strong> Auch Ihre geografischen Nutzungsdaten bleiben geschützt.
            Beta-Version, bisher nur Deutschland-Karten, noch ohne Routenplaner - wir
            arbeiten daran.
            </div>
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
            <ul id="location-tool" class="list-unstyled">
                <li id="lock-location" class="hidden"><span class="button glyphicon glyphicon-lock"></span><span class="info">Ansicht zentriert</span></li>
                <li id="follow-location"><span class="button glyphicon glyphicon-record"></span></li>
            </ul>
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
            var {!!$key!!} = {!! $value !!};
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
