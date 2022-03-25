@extends('layouts.app')

@section('pageTitle', 'Home')

@section('content')

<div class="position-relative overflow-hidden p-3 p-md-5 text-start bg-image">

    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div id="carouselExampleControls" class="carousel slide mx-auto col-10 col-sm-8 col-lg-6" data-bs-ride="carousel">
            <div class="carousel-inner" id="carousel-inner">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    
        <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">Who to watch? What to Watch? Wutuwatch.</h1>
            <p class="lead">Find Movies and TV Shows that suits to your type.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <a href="{{ route('movie-list') }}" type="button" class="btn btn-primary btn-lg px-4 me-md-2">Find Movies</a>
                @guest
                <a href="{{ route('login') }}" type="button" class="btn btn-outline-light btn-lg px-4">Login/Register</a>
                @endguest
            </div>
        </div>
    </div>
</div>

<!-- <div class="container col-xxl-8 px-4 py-5">
    
</div> -->


<div class="container-fluid px-5 py-3">
    <div class="heading my-3" id="heading">
        <h5 id="category_name" class="text-white">Popular Movies</h5>
    </div>
    <div class="row g-0 home-movie-list movie-list" id="main">

    </div>

    <div class="heading my-3" id="heading">
        <h5 id="category_name" class="text-white">Trending Films/Shows</h5>
    </div>
    <div class="row g-0 home-movie-list movie-list" id="main-trending">

    </div>

    <div class="heading my-3" id="heading">
        <h5 id="category_name" class="text-white">Top Grossing Films of 2021</h5>
    </div>
    <div class="row g-0 home-movie-list movie-list" id="main-top-gross">

    </div>
</div>
@endsection