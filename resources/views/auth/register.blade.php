@extends('layouts.app')

@section('pageTitle', 'Register')

@section('content')
<div class="container bg-overlay">
    <div class="bg-custom-1 text-white mx-auto form-container">
        <div class="d-flex justify-content-center align-items center">
        <img src="{{ asset('img/159582.svg') }}" alt="Movie Info Logo" width="50" height="48" class="d-inline-block align-top pe-1" />
                    <h3 class="mt-2">WutuWatch</h3>
        </div>
        
        <h5 class="w-100 text-center">Register</h5>
    
        <form action="{{ route('register') }}" method="post">
            @csrf

            <div class="mb-4">
                <label for="username">Username</label>
                <input type="text" name="username" class="form-control form-control-lg @error('username')
                    is-invalid @enderror " placeholder="Username" id="username" value="{{ old('username') }}">

                @error('username')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

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

            <div class="mb-4">
                <label for="date">Date of Birth</label>
                    <div class="input-group date" id="datepicker">
                        <input type="text" name="birthdate" class="form-control form-control-lg @error('birthdate')
                    is-invalid @enderror" readonly="readonly" style="cursor: pointer;" value="{{ old('birthdate') }}">
                        <span class="input-group-append">
                            <span class="input-group-text bg-white" style="height: 100%;">
                                <i class="fa fa-calendar"></i>
                            </span>
                        </span>
                    </div>

                    @error('birthdate')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password">Password</label>
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

            <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" oninvalid="this.setCustomValidity('Accept Terms and Conditions to continue.')" oninput="setCustomValidity('')" required>
                    <label class="form-check-label" for="flexCheckDefault">
                        I accept the <a href="{{ route('terms')}}" class="text-decoration-none">Terms And Condition</a>
                    </label>
                    </div>
            <div>
                <button type="submit" class="btn btn-primary w-100">Register</button>
            </div>
        </form>
    </div>
</div>

<script>
    $( function() {
        $( "#datepicker" ).datepicker({
            maxViewMode: 3,
            format: 'yyyy-mm-dd',
            endDate: '-18y',
            startDate: '-70y',
        });
    });
</script> 
@endsection