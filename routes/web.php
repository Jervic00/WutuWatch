<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;

/* Route::get('/home', function () {
   return view('partials.home');
})->name('home'); */

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::post('/logout', [LogoutController::class, 'store'])->name('logout');

Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'store']);

Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'store']);

Route::get('/movie', function () {
   return view('partials.movie');
})->name('movie');

Route::get('/tv', function () {
   return view('partials.tv');
})->name('tv');

Route::get('/person', function () {
   return view('partials.person');
})->name('person');

Route::get('/search', function () {
   return view('partials.search');
})->name('search');

Route::get('/', function () {
   return view('partials.home');
})->name('home');

Route::get('/movie-list', function () {
   return view('partials.movie_list');
})->name('movie-list');

Route::get('/tv-list', function () {
   return view('partials.tv_list');
})->name('tv-list');
