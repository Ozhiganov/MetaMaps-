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
                    <form accept-charset="UTF-8" class="navbar-form navbar-right" method="GET">
                        <div class="form-group">
                            <input class="form-control" name="q" placeholder="" type="text" value="{{ Request::input('q', '') }}"/>
                        </div>
                        <button class="btn btn-default" type="submit">
                            Suchen
                        </button>
                    </form>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
        <main>
            <div class="map" id="map">
            </div>
        </main>
        <script src="/js/all.js">
        </script>
    </body>
</html>
