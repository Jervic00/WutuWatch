@extends('layouts.app')

@section('pageTitle', 'Movie Details')

@section('content')

<div class="container py-3 px-5 my-3 bg-custom-2 text-white">
    <!-- MOVIE DETAILS -->
    <div class="row movie-details bg-overlay-1 py-3" id="movie-details">

    </div>
    <h5 class="mt-3">Cast &amp; Director</h5>
    <div class="row mt-3 movie-casts shadow" id="movie-casts">

    </div>
    <h5 class="mt-3">You May Also Like</h5>
    <div class="row g-0 home-movie-list movie-list shadow" id="related-movies">

    </div>

    <div class="trailer-overlay border border-dark bg-dark text-white" id="trailer-overlay">
        <div class="trailer-overlay-header d-flex justify-content-between align-items-center">
            <h5 class="ms-3">Trailer</h5>
            <button class="btn fs-3 bolder py-0 no-outline" id="close-button">&times;</button>
        </div>
        <div class="iframe-container">
            <iframe id="trailer-video" width="100%" height="100%" allow='autoplay' frameborder="0"></iframe>
        </div>
    </div>
    <div class="overlay-background" id="overlay-background"></div>
</div>


@include('posts.comments')
@endsection