<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }


    public function store(Request $request){
        Favorite::create([
            'user_id' => auth()->user()->id,
            'movieId' => $request->id,
            'media_type' => $request->media_type,
        ]);
        return back();
    }

    public function index(){
        if(auth()->user()){
        $user_id = auth()->user()->id;
        $favorite = Favorite::with(['user'])->where('user_id', $user_id)->paginate(10);
        return view('partials.favorites', [
            'favorites' => $favorite
        ]);
        }
    }

    public function destroy(Favorite $favorite, Request $request)
    {   $movieID = $request->id;
        $media_type = $request->media_type;
        $favorite->where('user_id', auth()->user()->id)->where('movieId', $movieID)->where('media_type', $media_type)->delete();
        return back();
    }
}
