@extends('layouts.app')

@section('pageTitle', 'Home')

@section('content')
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