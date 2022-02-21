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
    <script src="{{ asset('js/app.js') }}" ></script>
    <script src="{{ asset('js/apiScript.js') }}" defer></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
    <script src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js'></script>
    <!-- Tab Icon -->
    <link rel="icon" href="{{ url('img/159582.svg') }}">
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
    
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('plugins/ijaboCropTool/ijaboCropTool.min.css')}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-R7FB54TSMH"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-R7FB54TSMH');
    </script>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4057172904472465"
    crossorigin="anonymous"></script>
</head>

<body class="bg-custom-4 bg">
    <nav class="navbar navbar-expand-lg px-5 py-3 navbar-dark bg-custom-1 ">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu" aria-controls="toggleMobileMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="toggleMobileMenu">
            <a class="navbar-brand align-middle" href="{{ route('home') }}">
                <img src="{{ asset('img/159582.svg') }}" alt="Movie Info Logo" width="30" height="24" class="d-inline-block align-top pe-1" />
                <span class="m-0 p-0">
                    WutuWatch
                </span>
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
                    <a href="{{ route('user.watchlist') }}" class="nav-link fw-bold">Watchlist</a>
                </li>
                <li>
                    <a href="{{ route('user.watched') }}" class="nav-link fw-bold">Watched</a>
                </li>
                <li>
                    <a href="{{ route('user.favorite') }}" class="nav-link fw-bold">Favorites</a>
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
                    
                    <a href="{{ route('users.profile', auth()->user()->username)}}" class="nav-link fw-bold">
                    <img src="{{ asset('users/images/' . auth()->user()->profile_image)}}" class="pfp-icon profile-image">
                        {{ auth()->user()->username }}
                    </a>
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
    
    <div class="container-fluid ">
        <footer class="row row-cols-3 justify-content-center pt-3 border-top bg-custom-1">
            <div class="col">
            <a class="d-flex flex-column justify-content-center align-items-center text-decoration-none mb-3" href="{{ route('home') }}">
                
            <img src="{{ asset('img/159582.svg') }}" alt="Movie Info Logo" height="50" class="d-inline-block align-top pe-1" />
                <h4 class="m-0 p-0 text-white fw-bolder">
                    WutuWatch
                </h4>
            </a>
            <a href="https://developers.themoviedb.org/3/getting-started/introduction" class="d-flex justify-content-center mb-3 link-dark text-decoration-none">
            <img src="{{ asset('img/TMDBlogo.svg') }}" style="height: 50px; width: 100%;" alt="TMDB">
            </a>
            
            </div>

            <div class="col">
            <h5>Links</h5>
            <ul class="nav flex-column">
                <li class="nav-item mb-2"><a href="{{ route('home') }}" class="nav-link p-0 text-muted">Home</a></li>
                <li class="nav-item mb-2"><a href="{{ route('movie-list') }}" class="nav-link p-0 text-muted">Movies</a></li>
                <li class="nav-item mb-2"><a href="{{ route('tv-list') }}" class="nav-link p-0 text-muted">TV Shows</a></li>
                <li class="nav-item mb-2"><a href="{{ route('user.watchlist') }}" class="nav-link p-0 text-muted">Watchlist</a></li>
                <li class="nav-item mb-2"><a href="{{ route('user.favorite') }}" class="nav-link p-0 text-muted">Favorites</a></li>
            </ul>
            </div>

            <div class="col">
            <h5>Section</h5>
            <ul class="nav flex-column">
                @auth
                <li class="nav-item mb-2"><a href="{{ route('users.profile', auth()->user()->username)}}" class="nav-link p-0 text-muted">{{ auth()->user()->username }}</a></li>
                <li class="nav-item mb-2">
                    <form action="{{ route('logout') }}" method="post">
                        @csrf
                        <button type="submit" class="btn nav-link p-0 text-muted">Logout</button>
                    </form>
                </li>
                @endauth
                @guest
                <li class="nav-item mb-2"><a href="{{ route('login') }}" class="nav-link p-0 text-muted"></i> Login</a></li>
                <li class="nav-item mb-2"><a href="{{ route('register')}}" class="nav-link p-0 text-muted">Register</a></li>
                @endguest
                <li class="nav-item mb-2"><a href="{{ route('terms') }}" class="nav-link p-0 text-muted"></i> Terms of Service</a></li>
            </ul>
            </div>
            <div class="m-0 w-100 bg-custom-2 d-flex justify-content-center">
            <small class="text-muted">This product uses the TMDB API but is not endorsed or certified by TMDB.</small>
                <small class="text-muted"> | © 2021 WutuWatch | All Rights Reserved</small>
        </div>
        </footer>
        
    </div>

    
</body>

</html>