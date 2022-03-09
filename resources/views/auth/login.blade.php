@extends('layouts.app')

@section('pageTitle', 'Log in')

@section('content')
<div class="container-fluid bg-overlay pt-5">
    
    <div class="bg-custom-1 text-white mx-auto form-container">
    <div class="d-flex justify-content-center align-items center">
    <img src="{{ asset('img/159582.svg') }}" alt="Movie Info Logo" width="50" height="48" class="d-inline-block align-top pe-1" />
                <h3 class="mt-2">WutuWatch</h3>
    </div>
    <h5 class="w-100 text-center">Log in</h5>
        @if (session('status'))
        <div class="bg-warning p-4 rounded-lg mb-6 text-white text-center">
            {{session('status')}}
        </div>
        @endif

        <form action="{{ route('login') }}" method="post">
            @csrf

            <div class="mb-4">
                <label for="email">E-mail</label>
                <input type="text" name="email" class="form-control form-control-lg @error('name')
                    is-invalid @enderror " placeholder="Your email" id="email" value="{{ old('email') }}">

                @error('email')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div class="mb-4">
                <div class="d-flex justify-content-between">
                    <label for="password">Password</label> <a href="{{ route('forget.password.get')}}" class="fw-bold text-decoration-none pe-2">Forgot Password</a>
                </div>
                <input type="password" name="password" class="form-control form-control-lg @error('name')
                    is-invalid @enderror " placeholder="Enter your password" id="password">

                @error('password')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>
            <div class="mb-2">
                <p class="m-0">Don't have account? <a href="{{ route('register')}}" class="fw-bold text-decoration-none">Register Now!</a></p>
            </div>
            <div class="mb-4">
                <div class="flex align-items-center">
                    <input type="checkbox" name="remember" id="remember" class="mr-2">
                    <label for="remember">Remember Me</label>
                </div>
            </div>

            <div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
            </div>

        </form>
    </div>
</div>
@endsection