@extends('layouts.app')

@section('pageTitle') {{$user->username}} @endsection

@section('content')
<div class="container my-3 text-white min-vh-100" >
    <div class="bg-custom-1 w-100">
        <!-- profile banner -->
        <div class="px-5 py-3 d-flex border-bottom border-light">
            <div class="user-avatar me-4">
                <img src="{{asset('users/images/' .$user->profile_image )}}" class="profile-pic profile-image m-0" alt="{{$user->username}}">
                @auth
                @if($user->id == auth()->user()->id)
                <div class="change-dp d-flex justify-content-center mt-2">
                    <input type="file" name="profile_image" id="profile_image" style="display: none;">
                    <a href="javascript:void(0)" class="btn btn-primary m-1 p-1 btn-block" id="change_picture_btn">CHANGE PICTURE</a>
                    <a href="{{ route('edit.users.profile') }}" class="btn btn-primary m-1 p-1 btn-block">CHANGE USERNAME</a>
                </div>
                @endif
                @endauth
            </div>
            <div class="user-stats">
                <h5 class="text-white fw-bold mb-2">{{ $user->username }}</h5>
                @if($user->username ==='Jervic')
                    <div class="user-banner px-4 rounded" style="background-color:navy">
                    <small style="color: whitesmoke"><i class="fas fa-user-shield"></i> ADMIN</small>
                    </div>
                    @elseif($numbercomments->count() >= 250)
                    <div class="user-banner bg-success text-black px-4 rounded">
                    <small>Contributor</small>
                    </div>
                    @elseif($numbercomments->count() >= 100)
                    <div class="user-banner bg-success text-black px-4 rounded">
                    <small>Elite Member</small>
                    </div>
                    @else
                    <div class="user-banner bg-custom-4 text-black px-4 rounded">
                    <small>Member</small>
                    </div>
                    @endif
                <span>Joined: {{ $user->created_at->format('M d, Y') }}</span><br>
                <span>Posted {{ $numbercomments->count() }} {{Str::plural('review', $numbercomments->count() )}}</span><br>
                <span>Received {{ $user->receivedLikes->count() }} {{Str::plural('commend', $user->receivedLikes->count() )}}</span>
            </div>
        </div>

        <div class="bg-custom-2 pt-5 pb-1 px-3 rounded">
            @if($comments->count())
            @foreach($comments as $comment)
            <!--  -->
    <div class="user-review d-flex align-items-top border bg-overlay-1 mb-2">
        <div class="user-container bg-overlay-1 border d-flex flex-column align-items-center me-2" >
            <a href="{{route($comment->media_type, ['id' => $comment->movieId, 'media_type' => $comment->media_type])}}" class="m-2" >
                <img src="https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage" class="iphone-X m-0" style="width: 100px; height: 100%" name="thumbnail" alt="">
            </a>
            
        </div>
        <div class="user-content w-100 px-2 pt-2">
            <div class="content-header">
            <a href="{{route($comment->media_type, ['id' => $comment->movieId, 'media_type' => $comment->media_type])}}" class="comment-from text-decoration-none" name="comment-from"></a>
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
            <div class="content-message pb-5">
                <p class="mb-0">{{ $comment->comment }}</p>
            </div>
            <div class="content-footer d-flex align-items-center ">
                @auth
                        @can('delete', $comment)
                            <form action="{{ route($comment->media_type .'.' .'destroy', ['comment' => $comment, 'id' => $comment->movieId , 'media_type' => $comment->media_type]) }}" method="post">
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
    </div><!--  -->
            @endforeach
            <div class="container-fluid d-flex flex-column justify-content-center align-items-center mt-2">
                {{ $comments->links()}}
            </div>
            @else
            <div class="p-5">
                <h5>{{ $user->username }} does not have reviews.</h5>
            </div>
            @endif
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> 
<script src="{{ asset('plugins/ijaboCropTool/ijaboCropTool.min.js')}}"></script>
<script>
        $(document).on('click', '#change_picture_btn', function(){
        $('#profile_image').click();
    });

    $('#profile_image').ijaboCropTool({
        preview : '.profile-image',
        setRatio:1,
        allowedExtensions: ['jpg', 'jpeg','png'],
        buttonsText:['CROP','QUIT'],
        buttonsColor:['#30bf7d','#ee5155', -15],
        processUrl:'{{ route("profileChange") }}',
        withCSRF:['_token','{{ csrf_token() }}'],
        onSuccess:function(message, element, status){
            alert(message);
        },
        onError:function(message, element, status){
            alert(message);
        }
    });
</script>
@endsection