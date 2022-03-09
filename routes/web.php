<?php

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\WatchedController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\CommentLikeController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ForgotPasswordController;

/* User colon ":" to choose column name you want to extract for route model binding */
Route::get('/users/{user:username}/posts', [UserProfileController::class, 'index'])->name('users.profile');
Route::get('/users/edit', [UserProfileController::class, 'edit'])->name('edit.users.profile');
Route::put('/users/edit', [UserProfileController::class, 'update'])->name('update.users.profile');
Route::post('/change-profile', [UserProfileController::class, 'updateProfile'])->name('profileChange');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::post('/logout', [LogoutController::class, 'store'])->name('logout');

/* Auth::routes(['verify' => true]); */
/* Route::group(['middleware' => ['auth']], function() { */
   Route::get('/email/verify', [VerificationController::class, 'show'])->name('verification.notice');
   Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify')->middleware(['signed']);
   Route::post('/email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
  /*  }); */
Route::get('/verification/success', function () {
   return view('verification.success');
})->name('verification.sucess');

Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'store']);

Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'store']);

Route::post('/watched', [WatchedController::class, 'store'])->name('mark.watched');
Route::delete('/watched', [WatchedController::class, 'destroy'])->name('mark.watched');  /* MARK AS WATCHED */

Route::post('/tv/watchlist', [WatchlistController::class, 'store'])->name('tv.watchlist');
Route::delete('/tv/watchlist', [WatchlistController::class, 'destroy'])->name('tv.watchlist');

Route::post('/movie/watchlist', [WatchlistController::class, 'store'])->name('movie.watchlist');
Route::delete('/movie/watchlist', [WatchlistController::class, 'destroy'])->name('movie.watchlist');

Route::post('/tv/favorite', [FavoriteController::class, 'store'])->name('tv.favorite');
Route::delete('/tv/favorite', [FavoriteController::class, 'destroy'])->name('tv.favorite');

Route::post('/movie/favorite', [FavoriteController::class, 'store'])->name('movie.favorite');
Route::delete('/movie/favorite', [FavoriteController::class, 'destroy'])->name('movie.favorite');

Route::get('/movie', [CommentController::class, 'index'])->name('movie');
Route::post('/movie', [CommentController::class, 'store']);
Route::delete('/movie/{comment}', [CommentController::class, 'destroy'])->name('movie.destroy');

Route::get('/tv', [CommentController::class, 'index'])->name('tv');
Route::post('/tv', [CommentController::class, 'store']);
Route::delete('/tv/{comment}', [CommentController::class, 'destroy'])->name('tv.destroy');
/* ?id={movieId}&media_type={media_type} */
Route::post('/tv/{comment}/likes', [CommentLikeController::class, 'store'])->name('comments.likes');
Route::delete('/tv/{comment}/likes', [CommentLikeController::class, 'destroy'])->name('comments.likes');

Route::get('/watchlist', [WatchlistController::class, 'index'])->name('user.watchlist');
Route::get('/watched', [WatchedController::class, 'index'])->name('user.watched');
Route::get('/favorite', [FavoriteController::class, 'index'])->name('user.favorite');


Route::get('forget-password', [ForgotPasswordController::class, 'showForgetPasswordForm'])->name('forget.password.get');
Route::post('forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->name('forget.password.post'); 
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetPasswordForm'])->name('reset.password.get');
Route::post('reset-password', [ForgotPasswordController::class, 'submitResetPasswordForm'])->name('reset.password.post');

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

Route::get('/terms', function () {
   return view('TermsAndCondition');
})->name('terms');

Route::get('/privacy_policy', function () {
   return view('privacy_policy');
})->name('privacy_policy');
