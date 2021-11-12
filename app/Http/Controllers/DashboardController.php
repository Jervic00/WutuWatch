<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function index()
    {
        /** Access the objects from the database
         *   dd(auth()->user()); 
         *   To access the property 'name'
         *   dd(auth()->user()->name)
         */
        return view('dashboard');
    }
}
