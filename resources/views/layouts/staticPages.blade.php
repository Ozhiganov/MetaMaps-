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
                        <span class="glyphicon glyphicon-search">
                        </span>
                    </button>
                    <a class="navbar-brand" href="{{ url('/') }}">
                        <div class="logo">
                            <h1>
                                Maps
                                <small>
                                    .metager.de
                                </small>
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
                                <div class="input-group-addon" id="clearInput">
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="https://metager.de" target="_blank">
                                MetaGer.de
                            </a>
                        </li>
                        <li>
                            <a href="https://metager.de/impressum" target="_blank">
                                Impressum
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
        <main>
            <div class="container">
                @yield('content')
            </div>
        </main>
    </body>
</html>