<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Comment;
use App\Models\Watched;
use App\Models\Favorite;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{

    public function index(Request $request)
    {   /*  COMMENT CONTROLLER FOR MOVIES  */
        if(auth()->user()){
        $user_id = auth()->user()->id;
        }
        else{
            $user_id ='';
        }
        $movieId = $request->id;
        $media_type = $request->media_type;
        $comments = Comment::with(['user', 'likes'])->withCount('likes')->orderByDesc('likes_count')->latest()->where('movieId', $movieId)->where('media_type', $media_type)->paginate(5);
        $comments->withPath('?id=' .$movieId .'&media_type=' .$media_type);
        $ratings = Comment::with(['user', 'likes'])->where('movieid', $movieId)->where('media_type', $media_type)->get();
        if($user_id){
        $single_comment = $ratings->where('user_id', auth()->user()->id)->first();
        $comment_count = Comment::with(['user'])->where('user_id', $user_id)->count();
        $watchlist = Watchlist::where('user_id', $user_id)->where('movieId', $movieId)->where('media_type', $media_type)->count();
        $watched = Watched::where('user_id', $user_id)->where('movieId', $movieId)->where('media_type', $media_type)->count();
        $favorite = Favorite::where('user_id', $user_id)->where('movieId', $movieId)->where('media_type', $media_type)->count();
        }
        else{
        $comment_count = '';
        $watched = '';
        $single_comment = '';
        $watchlist = '';
        $favorite ='';
        }

        if($media_type == 'movie')
        {
            return view('partials.movie', [ /* FOR MOVIES */
                'single_comment' => $single_comment,
                'comment_count' => $comment_count,
                'comments' => $comments,
                'movieId' => $movieId,
                'media_type' => $media_type,
                'ratings' => $ratings,
                'watchlist' => $watchlist,
                'watched' => $watched,
                'favorite' => $favorite
            ]);
        }
        else if($media_type == 'tv')
        {
            return view('partials.tv', [ /* FOR ARCANE */
                'single_comment' => $single_comment,
                'comment_count' => $comment_count,
                'comments' => $comments,
                'movieId' => $movieId,
                'media_type' => $media_type,
                'ratings' => $ratings,
                'watchlist' => $watchlist,
                'watched' => $watched,
                'favorite' => $favorite
            ]);
        }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'addComment' => 'required|max:180',
            'rate' => 'required'
        ]);


        $request->user()->comments()->create([
            'media_type' => $request->media_type,
            'movieId' => $request->id,
            'rating' => $request->rate,
            'comment' => $request->addComment,
        ]);
        return back();
    }

    public function destroy(Comment $comment){

        $this->authorize('delete', $comment);
        $comment->delete();
        return back();
    }
}
