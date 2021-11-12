@extends('layouts.app')

@section('pageTitle', 'Result')

@section('content')
<div class="flex-mobile">
    <div class="ms-3 col-2 px-2 pt-4 ">
        <div class="bg-custom-1 rounded-top list-container">
            <h5 class="py-3 ps-3 search-menu-container">Search Results</h5>
            <div class="search-menu-container">
                <ul class="list-group" id="multi-search">
                    <li class="list-group-item  d-flex justify-content-between align-items-center active" id="movie-search">
                        <span class="search-list-text text-white">Movies</span>
                        <span class="bg-overlay-1 text-white p-2 rounded" id="movie-count">0</span>
                    </li>
                    <li class="list-group-item  d-flex justify-content-between align-items-center" id="tv-search">
                        <span class="search-list-text text-white">TV Shows</span>
                        <span class="bg-overlay-1 text-white p-2 rounded" id="tv-count">0</span>
                    </li>
                    <li class="list-group-item  d-flex justify-content-between align-items-center" id="people-search">
                        <span class="search-list-text text-white">People</span>
                        <span class="bg-overlay-1 text-white p-2 rounded" id="people-count">0</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class=" col-sm-12 container my-3 rounded-4">
        <div class="row g-0 movie-list" id="result">
        </div>
        <div class="container-fluid-lg d-flex justify-content-center align-items-center" id="page-container">
        </div>
    </div>

</div>

@endsection