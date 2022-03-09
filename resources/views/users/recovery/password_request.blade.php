@extends('layouts.app')

@section('pageTitle', 'Change Username/Email')

@section('content')
<div class="container my-3 text-white min-vh-100 w-50" >
    <div class="shadow bg-custom-1 w-100 p-5 rounded">

        @if (session('message'))
        <div class="bg-success p-4 rounded-lg mb-6 text-white text-center">
            {{session('message')}}
        </div>
        @endif
        <div class="my-2 rounded-lg mb-6 text-white text-center">
            <h3>Forgot Password</h3>
        </div>
    <form action="{{ route('forget.password.post') }}" method="post">
            @csrf

            <div class="mb-4">
                <label for="email">Email</label>
                <input type="text" name="email" class="form-control form-control-lg @error('email')
                    is-invalid @enderror " placeholder="Your email" id="email" value="{{ old('email') }}">

                @error('email')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div>
                <button type="submit" class="btn btn-primary w-100">Send Password Reset Link</button>
            </div>
        </form>

    </div>
</div>
@endsection