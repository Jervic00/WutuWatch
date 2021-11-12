@extends('layouts.app')

@section('pageTitle', 'Register')

@section('content')
<div class="container">
    <div class="bg-white text-black mx-auto form-container">
        <form action="{{ route('register') }}" method="post">
            @csrf
            <div class="mb-4">
                <label for="name">Name</label>
                <input type="text" name="name" class="form-control form-control-lg @error('name')
                    is-invalid @enderror " placeholder="Your name" id="name" value="{{ old('name') }}">

                @error('name')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="username">Username</label>
                <input type="text" name="username" class="form-control form-control-lg @error('name')
                    is-invalid @enderror " placeholder="Username" id="username" value="{{ old('username') }}">

                @error('username')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="email">Email</label>
                <input type="text" name="email" class="form-control form-control-lg @error('name')
                    is-invalid @enderror " placeholder="Your email" id="email" value="{{ old('email') }}">

                @error('email')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control form-control-lg @error('name')
                    is-invalid @enderror " placeholder="Choose a password" id="password">

                @error('password')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password_confirmation" class="sr-only">Confirm Password</label>
                <input type="password" name="password_confirmation" class="form-control form-control-lg @error('password_confirmation')
                    is-invalid @enderror " placeholder="Repeat your password" id="password_confirmation">
            </div>


            <div>
                <button type="submit" class="btn btn-primary w-100">Register</button>
            </div>
        </form>
    </div>
</div>
@endsection