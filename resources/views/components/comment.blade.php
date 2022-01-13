@props(['comment' => $comment, 'media_type' => $mediaType, 'movieId' => $movieId])

<div class="user-review bg-overlay-1 d-flex align-items-top border mb-2">
        <div class="user-container border d-flex flex-column align-items-center p-2">
            <div class="user-avatar">
                <img src="{{asset('users/images/' .$comment->user->profile_image )}}" class="profile-pic m-0" alt="{{$comment->user->username}}">
            </div>
            <div class="user-details text-center p-2">
                    <a href="{{ route('users.profile', $comment->user)}}" class="text-decoration-none text-white" ><small>{{ $comment->user->username}}</small></a>
                    @if($comment->user->username ==='Jervic')
                    <div class="user-banner px-4 rounded" style="background-color:navy">
                    <small style="color: whitesmoke"><i class="fas fa-user-shield"></i>ADMIN</small>
                    </div>
                    @elseif($comment->where('user_id', $comment->user_id)->count() > 50)
                    <div class="user-banner bg-success text-black px-4 rounded">
                    <small>Contributor</small>
                    </div>
                    @else
                    <div class="user-banner bg-custom-4 text-black px-4 rounded">
                    <small>Member</small>
                    </div>
                    @endif
            </div>
            <div class="user-stats">
                <dl class="mb-0"><small>Joined: <br> {{ $comment->user->created_at->format('M d, Y') }}</small></dl>
                <dl class="mb-0"><small>Reviews: {{ $comment->where('user_id', $comment->user_id)->count() }}</small></dl>
                <dl class="mb-0"><small>Commends: {{ $comment->user->receivedLikes->count() }}</small></dl>
            </div>
        </div>
        <div class="user-content w-100 px-2 pt-2">
            <div class="content-header">
                <div class="d-flex align-items-center">
                @for ($i = 0; $i < 5; $i++)
                    @if ($i < $comment->rating)
                        <i class="fas fa-star" style="color: orange;"></i>
                    @else
                        <i class="fas fa-star"></i>
                    @endif
                @endfor
                    <span class="text-white ms-1">{{ $comment->rating }} {{Str::plural('star', $comment->rating)}}</span>
                </div>
                <small class="text-muted">Posted {{ $comment->created_at->diffForHumans() }}</small>
            </div>
            <div class="content-message">
                <p class="mb-0">{{ $comment->comment }}</p>
            </div>
            <div class="content-footer d-flex align-items-center ">
            @auth
                        @can('delete', $comment)
                            <form action="{{ route($media_type .'.' .'destroy', ['comment' => $comment, 'id' => $movieId , 'media_type' => $media_type]) }}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="delete-button btn bg-danger px-2 py-0" style="color: white"><i class="fas fa-trash-alt"></i> Delete</button>
                            </form>
                        @endcan
                @if (!$comment->LikedBy(auth()->user()) && $comment->user_id != auth()->user()->id)
                    <form action="{{ route('comments.likes', ['comment' => $comment->id]) }}" method="post">
                        @csrf
                        <button type="submit" class="like-button btn bg-custom-3 mx-2 px-2 py-0 "><i class="far fa-thumbs-up"></i> Commend</button>
                    </form>
                @else
                    <form action="{{ route('comments.likes', ['comment' => $comment->id]) }}" method="post">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn bg-transparent px-2 py-0" style="color: #3aafa9"><i class="fas fa-thumbs-up"></i></button>
                    </form>
                @endif
                
                @endauth
            <span>@guest <i class="fas fa-thumbs-up me-1" ></i>@endguest {{ $comment->likes->count() }} {{ Str::plural('commend', $comment->likes->count())}}</span>
            </div>
        </div>
    </div>