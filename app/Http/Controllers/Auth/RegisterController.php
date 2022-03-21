<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware(['guest']);
    }

    public function index()
    {
        return view('auth.register');
    }

    public function store(Request $request)
    {


        $this->validate($request, [
            'username' => 'required|unique:users|max:26|min:6',
            'email' => 'required|email|unique:users|max:255',
            'birthdate' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        

        $user = User::create([
            'username' => $request->username,
            'email' => strtolower($request->email),
            'birthdate' => $request->birthdate,
            'password' => Hash::make($request->password),
            'profile_image' => 'no-image.png'
        ]);
        event(new Registered($user));
        //Sign in
        auth()->attempt($request->only('email', 'password'));

        return redirect()->route('verification.notice');
    }
}
