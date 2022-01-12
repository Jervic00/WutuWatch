<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Watched;
use App\Models\Watchlist;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }
    
    public function store(Request $request){
        Watchlist::create([
            'user_id' => auth()->user()->id,
            'movieId' => $request->id,
            'media_type' => $request->media_type,
        ]);
        

        return back();
    }

    public function index(){
        if(auth()->user()){
        $user_id = auth()->user()->id;
        $watchlist = Watchlist::where('user_id', $user_id)->paginate(10);
        $favorite = Favorite::where('user_id', $user_id)->get();
        $watched = Watched::where('user_id', $user_id)->get();
        return view('partials.watchlist', [
            'watchlists' => $watchlist,
            'watcheds' => $watched,
            'favorites' => $favorite
        ]);
        }
    }

    public function destroy(Watchlist $watchlist, Request $request)
    {   $movieID = $request->id;
        $media_type = $request->media_type;
        $watchlist->where('user_id', auth()->user()->id)->where('movieId', $movieID)->where('media_type', $media_type)->delete();
        return back();
    }
}
