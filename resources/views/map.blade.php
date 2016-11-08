<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8"/>
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <title>
            Maps - MetaGer
        </title>
        <link href="/css/all.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button aria-expanded="false" class="navbar-toggle collapsed" data-target="#bs-example-navbar-collapse-1" data-toggle="collapse" type="button">
                        <span class="sr-only">
                            Toggle navigation
                        </span>
                        <span class="icon-bar">
                        </span>
                        <span class="icon-bar">
                        </span>
                        <span class="icon-bar">
                        </span>
                    </button>
                    <a class="navbar-brand" href="{{ url('/') }}">
                        <div class="logo">
                            <h1>
                                MetaGer
                                <small>
                                    Maps
                                </small>
                            </h1>
                        </div>
                    </a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form accept-charset="UTF-8" class="navbar-form navbar-right" id="search" method="GET">
                        <div class="form-group">
                            <div class="input-group">
                                <input autofocus="" class="form-control" name="q" placeholder="Karten durchsuchen..." type="text" value="{{ Request::input('q', '') }}"/>
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
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
        <main>
            <div class="map" id="map">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3 hidden" data-status="in" id="results">
                <div id="closer" title="Ergebnisse einklappen">
                    >
                </div>
            </div>
        </main>
        <script src="/js/all.js">
        </script>
    </body>
</html>
