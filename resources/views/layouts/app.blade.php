<!doctype html>
<html>
<!-- lang="{{ str_replace('_', '-', app()->getLocale()) }}" -->

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('pageTitle') - WutuWatch</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/apiScript.js') }}" defer></script>

    <!-- Tab Icon -->
    <link rel="icon" href="{{ url('img/159582.svg') }}">
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>

<body class="bg-custom-4 bg">
    <nav class="navbar navbar-expand-lg px-5 py-3 navbar-dark bg-custom-1 ">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu" aria-controls="toggleMobileMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="toggleMobileMenu">
            <a class="navbar-brand align-middle" href="{{ route('home') }}">
                <img src="{{ asset('img/159582.svg') }}" alt="Movie Info Logo" width="30" height="24" class="d-inline-block align-top pe-1" />
                WutuWatch
            </a>
            <ul class="navbar-nav text-center">
                <li>
                    <a class="nav-link fw-bold" href="{{ route('home') }}">Home</a>
                </li>
                <li>
                    <a href="{{ route('movie-list') }}" class="nav-link fw-bold">Movies</a>
                </li>
                <li>
                    <a href="{{ route('tv-list') }}" class="nav-link fw-bold">TV Shows</a>
                </li>
                <li>
                    <a href="#" class="nav-link fw-bold">Watchlist</a>
                </li>
                <li>
                    <a href="#" class="nav-link fw-bold">Favorites</a>
                </li>
                <!-- SEARCH BAR -->
                <div class="mx-auto">
                    <form class="d-flex align-items-center" id="searchForm">
                        <input class="form-control-sm mx-2 py-2 bg-transparent text-white rounded" type="text" placeholder="Type to search" id="searchText" aria-label="Search">
                        <button class="btn bg-custom-3 rounded" type="submit"><i class="fas fa-search"></i></button>
                    </form>
                </div>
            </ul>
            <div class="d-flex align-items-center navbar-nav ms-auto text-center">
                @auth
                <li>
                    <a href="" class="nav-link fw-bold">{{ auth()->user()->name }}</a>
                </li>
                <li class="nav-link">
                    <form action="{{ route('logout') }}" method="post">
                        @csrf
                        <button type="submit" class="btn btn-sm nav-link text-center mx-auto fw-bold"><i class="fas fa-sign-out-alt"></i> Logout</button>
                    </form>
                </li>
                @endauth

                @guest
                <li>
                    <a href="{{ route('login') }}" class="nav-link fw-bold"><i class="fas fa-sign-in-alt"></i> Login</a>
                </li>
                <li>
                    <a href="{{ route('register')}}" class="nav-link fw-bold">Register</a>
                </li>
                @endguest
            </div>
        </div>
    </nav>

    @yield('content')
</body>

</html>