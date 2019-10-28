<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Alle limburgers') }}</title>

    <!-- Scripts -->
    <script src="{{ secure_asset('js/app.js') }}" defer></script>
    <script src="{{ secure_asset('js/limburgers.js') }}" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script src="{{ secure_asset('js/jquery-editable-select.js') }}" defer></script>
    <script src="{{ secure_asset('js/jquery-ui.min.js') }}" defer></script>
    
    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ secure_asset('css/limburgers.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-sm navbar-light navbar-laravel">
            <div class="container-fluid">
                <a class="navbar-brand"  href="{{ secure_url('/') }}">
                    <img src="{{ secure_asset ('public/img/tree_logo.png')}}" alt="" class="img_navbar"> {{ config('app.proj', 'Laravel') }} 
                </a>
                <a class="navbar-italic"  href="{{ secure_url('/') }}">
                    {{ config('app.name', 'Laravel') }} 
                </a>
@yield('menu')
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#"><img src="{{ secure_asset ('public/img/info.png')}}" class="img_italic"></a>
                        </li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ secure_url('/nl') }}"><img src="{{ secure_asset ('public/img/nl.png')}}" alt="">&nbsp;Nl</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ secure_url('/en') }}">&nbsp;<img src="{{ secure_asset ('public/img/england.png')}}" alt="">&nbsp;En</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ secure_url('/de') }}">&nbsp;<img src="{{ secure_asset ('public/img/deutschland.png')}}" alt="">&nbsp;De</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ secure_url('/fr') }}">&nbsp;<img src="{{ secure_asset ('public/img/france.png')}}" alt="">&nbsp;Fr</a>
                            </li>
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
            </div>
        </nav>

        <main class="py-4">
            <div class="container">
                <div class="row">
                    @yield('content')    
                </div>
            </div>
            
        </main>
    </div>
</body>
</html>
