<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function index()
    {
        if(auth()->user()->username === 'Jervic'){
        $comments = Comment::with(['user'])->paginate(10);
        /* $comments->with(['user', 'likes'])->paginate(10); */
        return view('dashboard', [
            'comments' => $comments,
        ]);
        }
        else
        {
            return view('partials.home');
        }
    }
}

