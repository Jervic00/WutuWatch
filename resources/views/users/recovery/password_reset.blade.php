@extends('layouts.app')

@section('pageTitle', 'Change Username/Email')

@section('content')
<div class="container my-3 text-white min-vh-100 w-50" >
    <div class="shadow bg-custom-1 w-100 p-5 rounded">

        @if (session('message'))
        <div class="bg-warning p-4 rounded-lg mb-6 text-white text-center">
            {{session('message')}}
        </div>
        @endif
        <div class="my-2 rounded-lg mb-6 text-white text-center">
            <h3>Reset Password</h3>
        </div>
    <form action="{{ route('reset.password.post') }}" method="post">
            @csrf
            <input type="hidden" name="token" value="{{ $token }}">
            
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
                <label for="password">New Password</label>
                <input type="password" name="password" class="form-control form-control-lg @error('password')
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
                    is-invalid @enderror " placeholder="Confirm your password" id="password_confirmation">
            </div>

            <div>
                <button type="submit" class="btn btn-primary w-100">Save Changes</button>
            </div>
        </form>

    </div>
</div>
@endsection