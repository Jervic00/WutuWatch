@extends('layouts.app')

@section('pageTitle', 'Change Username/Email')

@section('content')
<div class="container my-3 text-white min-vh-100 w-50" >
    <div class="shadow bg-custom-1 w-100 p-5 rounded">

        @if (session('status'))
        <div class="bg-warning p-4 rounded-lg mb-6 text-white text-center">
            {{session('status')}}
        </div>
        @endif
        <div class="my-2 rounded-lg mb-6 text-white text-center">
            <h3>Change Username</h3>
        </div>
    <form action="{{ route('update.users.profile') }}" method="post">
            @csrf
            @method('PUT')
            <div class="mb-4">
                <label for="username">Username</label>
                <input type="text" name="username" class="form-control form-control-lg @error('username')
                    is-invalid @enderror " placeholder="Username" id="username" value="{{ auth()->user()->username }}">

                @error('username')
                <div class="text-danger fw-lighter mt-2 fs-6">
                    {{ $message }}
                </div>
                @enderror
            </div>

            <div>
                <button type="submit" class="btn btn-primary w-100">Save Changes</button>
            </div>
        </form>

    </div>
</div>
@endsection