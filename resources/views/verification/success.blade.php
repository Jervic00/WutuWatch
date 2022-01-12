@extends('layouts.app')

@section('pageTitle', 'Verification Success')

@section('content')
    <div class="bg p-5 rounded min-vh-100">
        <h1>Account verified successfully.</h1>
        @auth
            <div class="alert alert-success" role="alert">
            <p>
                You can now post reviews and use other features of our website.
            </p> 
                <a href="{{ route('home') }}" style="color: #fff">Go back to homepage</a>
            </div>
        @endauth
        @guest
            <div class="alert alert-success" role="alert">
            <p>
                You can now post reviews and use other features of our website.
            </p>    
                <a href="{{ route('login') }}" style="color: #fff">Go to Login page</a>
            </div>
        @endguest
    </div>
@endsection