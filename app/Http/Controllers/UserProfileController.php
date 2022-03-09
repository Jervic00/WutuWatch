<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function index(User $user, Request $request){
        $media_type = $request->media_type;
        $movieId = $request->id;
        $comments = $user->comments()->with(['user', 'likes'])->withCount('likes')->orderByDesc('likes_count')->latest()->paginate(10);
        $numbercomments = $user->comments()->with(['user', 'likes']);
        return view('users.profile.index', [
            'user' => $user,
            'comments' => $comments,
            'movieId' => $movieId,
            'media_type' => $media_type,
            'numbercomments' => $numbercomments
        ]);
    }

    public function updateProfile(Request $request){
        $path = 'users/images';
        $file = $request->file('profile_image');
        $new_name = 'PFP_'.date('dmY').uniqid().'.jpg';
        //Upload new image
        $upload = $file->move(public_path($path), $new_name);
        if( !$upload ){
            return response()->json(['status'=>0,'msg'=>'Something went wrong, upload new picture failed.']);
        }else{
            //Get Old picture
            $oldPicture = User::find(Auth::user()->id)->getAttributes()['profile_image'];

            if( $oldPicture != '' ){
                if( \File::exists(public_path($path.$oldPicture))){
                    \File::delete(public_path($path.$oldPicture));
                }
            }

            //Update DB
            $update = User::find(Auth::user()->id)->update(['profile_image'=>$new_name]);

            if( !$upload ){
                return response()->json(['status'=>0,'msg'=>'Something went wrong, updating picture in db failed.']);
            }else{
                return response()->json(['status'=>1,'msg'=>'Your profile picture has been updated successfully']);
            }
        }
    }

    public function edit(Request $request, User $user){
        return view('users.profile.edit');
    }

    public function update(Request $request){
        $validatedData = $request->validate([
            'username' => 'required|max:26|min:6|unique:users,username,' .auth()->user()->id
            ]);
        
        $update = User::find(auth()->user()->id)->update($validatedData);
        if (!$update) {
            return redirect()->back()->with('status', 'Invalid Input');
        }
        else{
            return redirect()->route('users.profile', $request->username);
        }
    }

}
