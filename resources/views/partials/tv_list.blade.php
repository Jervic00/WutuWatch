@extends('layouts.app')

@section('pageTitle', 'TV Shows')

@section('content')
<div class="flex-mobile mb-5">
    <div class="ms-3 col-2 px-2 pt-4 ">
        <div class="bg-custom-1 rounded-top border border-light list-container text-white">
            <h5 class="py-3 ps-3 bg-custom-1 border border-bottom border-light search-menu-container">TV Shows</h5>

            <div id="sort" class="mx-auto d-flex flex-column my-3">
                <label for="sort-select" style="width: 90%;" class="text-white mx-auto">Sort By</label>
                <select id="sort-select" class="form-select text-white toggle rounded bg-custom-1 mx-auto">
                    <option value="popularity.desc" selected>Popularity Descending</option>
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="vote_average.desc">Rating Descending</option>
                    <option value="vote_average.asc">Rating Ascending</option>
                    <option value="primary_release_date.desc">Release Date Descending</option>
                    <option value="primary_release_date.asc">Release Date Ascending</option>
                    <option value="title.asc">Title (A-Z)</option>
                    <option value="title.desc">Title (Z-A)</option>
                </select>
            </div>

            <div class="search-menu-container">
                <div id="genre-dropdown" style="width: 90%;" class="form-select text-white bg-custom-1 toggle rounded mx-auto">
                    <span class="m-0">Genres</span>
                </div>
                <div id="tags" class="d-flex flex-wrap justify-content-center align-items-center my-2">
                </div>

                <div id="sort" class="mx-auto d-flex flex-column my-3">
                <select id="year-select" class="form-select text-white toggle rounded bg-custom-1 mx-auto">
                    <option value="popularity.desc" selected>Select Year</option>
                </select>
                </div>

                <div id="provider-dropdown" style="width: 90%;" class="form-select text-white bg-custom-1 toggle rounded mx-auto">
                    <span class="m-0">Watch Providers</span>
                </div>

                <div id="region-dropdown-div" style="display: flex;" class="mx-auto d-flex flex-column my-2">
                    <label for="region-dropdown" style="width: 90%;" class="text-white mx-auto">Country</label>
                    <select id="region-dropdown" style="width: 90%;" class="form-select text-white toggle rounded bg-custom-1 mx-auto">

                    </select>
                </div>
                <div id="provider-tags" class="d-flex flex-wrap justify-content-center align-items-center my-2">

                </div>

                <div class="d-flex justify-content-center">
                    <button id="Filter" class="btn bg-custom-3 w-100">Filter</button>
                </div>
            </div>
        </div>
    </div>
    <div class=" col-sm-12 container my-3 rounded-4">
        <div class="row g-0 movie-list" id="tv-list">
        </div>
        <div class="container-fluid-lg d-flex justify-content-center align-items-center" id="page-container">
        </div>
    </div>

</div>
@endsection