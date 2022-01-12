<?php

namespace App\Http\Controllers;

use App\Models\Watched;
use App\Models\Favorite;
use App\Models\Watchlist;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class WatchedController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }
    
    public function store(Request $request, Watched $watched, Watchlist $watchlist){
        Watched::create([
            'user_id' => auth()->user()->id,
            'movieId' => $request->id,
            'media_type' => $request->media_type,
        ]);
        if($watchlist->where('user_id', auth()->user()->id)->where('movieId', $request->id)->where('media_type', $request->media_type)->count() > 0){
            $watchlist->where('user_id', auth()->user()->id)->where('movieId', $request->id)->where('media_type', $request->media_type)->delete();
        }
        return back();
        
    }

    public function index(){
        if(auth()->user()){
        $user_id = auth()->user()->id;
        $watchlist = Watchlist::where('user_id', $user_id)->get();
        $favorite = Favorite::where('user_id', $user_id)->get();
        $watched = Watched::where('user_id', $user_id)->paginate(10);
        return view('partials.watched', [
            'watchlists' => $watchlist,
            'watcheds' => $watched,
            'favorites' => $favorite
        ]);
        }
    }

    public function destroy(Watched $watched, Request $request)
    {   
        $movieID = $request->id;
        $media_type = $request->media_type;
        $watched->where('user_id', auth()->user()->id)->where('movieId', $movieID)->where('media_type', $media_type)->delete();
        return back();
    }
}
