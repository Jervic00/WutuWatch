<div class="comment-section container text-white bg-custom-2 mb-5 pt-3">
    @auth
        @if ($ratings->where('user_id', auth()->user()->id)->count() <= 0)
        @if(auth()->user()->email_verified_at == null)
            @if (session('resent'))
                <div class="alert alert-success" role="alert">
                    A fresh verification link has been sent to your email address.
                </div>
            @endif
            <h5>
                Only verified users can post reviews. Check the verification email we sent to your email address.
            </h5>
            <form action="{{ route('verification.resend') }}" method="POST" class="d-inline">
            @csrf
            <button type="submit" class="d-inline btn btn-link p-0">
                Click here to resend verification email
            </button>
        </form>
        @else
            <div class="user-container bg-overlay-1 border d-flex align-items-center p-2 mb-3 ">
                    <div class="user-avatar">
                    @if(file_exists(public_path('users/images/'.auth()->user()->profile_image)))
                    <img src="{{asset('users/images/' .auth()->user()->profile_image )}}" class="profile-pic m-0" alt="{{auth()->user()->username}}">
                    @else
                    <img src="{{asset('users/images/no-image.png' )}}" class="profile-pic m-0" alt="{{auth()->user()->username}}">
                    @endif
                    </div>
                <form class="w-100 d-flex flex-column align-items-start" action="{{ route($media_type, ['id' => $movieId , 'media_type' => $media_type]) }}" method="post">
                    @csrf
                    <div class=" w-100">
                        <textarea placeholder="Add a review..." name="addComment" id="addComment" style="height: 75px; resize: none; background-color: black;" class="form-control 
                        text-white @error('addComment') @enderror" oninvalid="this.setCustomValidity('Add some comment')" oninput="setCustomValidity('')" required>{{ old('addComment') }}</textarea>
                        @if(Session::has('success'))
                            <div class="text-success">
                                {{ session('success')}}
                            </div>
                        @endif
                        @error('addComment')
                            <div class="text-danger">
                                {{ $message }}
                            </div>
                        @enderror
                    </div>
                    <div class="d-flex align-items-center justify-content-between w-100 px-2 mt-2 submit-rating">
                        <div class="d-flex align-items-center mb-3">
                            <span class="me-1">Rate:</span>
                            <i class="fas fa-star fa-2x star-rate" data-index="0"></i>
                            <i class="fas fa-star fa-2x star-rate" data-index="1"></i>
                            <i class="fas fa-star fa-2x star-rate" data-index="2"></i>
                            <i class="fas fa-star fa-2x star-rate" data-index="3"></i>
                            <i class="fas fa-star fa-2x star-rate" data-index="4"></i>
                        </div>
                        <input name="rate" id="rate" type="hidden" class="form-control-sm no-outline text-white ms-3" required>
                        @error('rate')
                            <div class="text-danger">
                                {{ $message }}
                            </div>
                        @enderror
                        <button class="btn bg-custom-3 p-2 m-0" >Submit</button>
                    </div>
                </form>
            </div>
            <!-- END IF OF USER VERIFICATION -->
            @endif
        @else
            <h5>Your Review</h5>
            <div class="user-review bg-overlay-1 d-flex align-items-top border mb-2">
                <div class="user-container border d-flex flex-column align-items-center p-2">
                    <div class="user-avatar">
                        @if(file_exists(public_path('users/images/' .$single_comment->user->profile_image)))
                            <img src="{{asset('users/images/' .$single_comment->user->profile_image )}}" class="profile-pic m-0" alt="{{$single_comment->user->username}}">
                        @else
                            <img src="{{asset('users/images/no-image.png' )}}" class="profile-pic m-0" alt="{{$single_comment->user->username}}">
                        @endif
                    </div>
                    <div class="user-details text-center p-2">
                        <a href="{{ route('users.profile', $single_comment->user)}}" class="text-decoration-none text-white" ><small>{{ $single_comment->user->username}}</small></a>
                        @if($single_comment->user->username ==='Jervic')
                        <div class="user-banner px-4 rounded" style="background-color:navy">
                        <small style="color: whitesmoke"><i class="fas fa-user-shield"></i>ADMIN</small>
                        </div>
                        @elseif($single_comment->where('user_id', $single_comment->user_id)->count() > 50)
                        <div class="user-banner text-center bg-success text-black px-4 rounded">
                        <small>Contributor</small>
                        </div>
                        @else
                        <div class="user-banner text-center bg-custom-4 text-black px-4 rounded">
                        <small>Member</small>
                        </div>
                        @endif
                    </div>
                    <div class="user-stats">
                        <dl class="mb-0"><small>Joined: <br> {{$single_comment->user->created_at->format('M d, Y')}} </small></dl>
                        <dl class="mb-0"><small>Reviews: {{$comment_count}}</small></dl>
                        <dl class="mb-0"><small>Commends: {{    $single_comment->user->receivedLikes->count()}}</small></dl>
                    </div>
                </div>
                <div class="user-content w-100 px-2 pt-2">
                    <div class="content-header">
                        <div class="d-flex align-items-center">
                        @for ($i = 0; $i < 5; $i++)
                            @if ($i < $single_comment->rating)
                                <i class="fas fa-star" style="color: orange;"></i>
                            @else
                                <i class="fas fa-star"></i>
                            @endif
                        @endfor
                        <span class="text-white ms-1">{{ $single_comment->rating }} {{Str::plural('star', $single_comment->rating)}}</span>
                        </div>
                        <small class="text-muted">Posted {{ $single_comment->created_at->diffForHumans() }}</small>
                    </div>
                    <div class="content-message">
                    <p class="mb-0">{{ $single_comment->comment }}</p>
                    </div>

                    <div class="content-footer d-flex align-items-center ">
                    @auth
                        @can('delete', $single_comment)
                            <form action="{{ route($media_type .'.' .'destroy', ['comment' => $single_comment, 'id' => $movieId , 'media_type' => $media_type]) }}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('Are you sure?')" class="delete-button btn bg-danger px-2 py-0" style="color: white"><i class="fas fa-trash-alt"></i> Delete</button>
                            </form>
                        @endcan
                    @if (!$single_comment->LikedBy(auth()->user()) && $single_comment->user_id != auth()->user()->id)
                        <form action="{{ route('comments.likes', ['comment' => $single_comment->id]) }}" method="post">
                            @csrf
                            <button type="submit" class="like-button btn bg-custom-3 mx-2 px-2 py-0 "><i class="far fa-thumbs-up"></i> Commend</button>
                        </form>
                    @else
                        <form action="{{ route('comments.likes', ['comment' => $single_comment->id]) }}" method="post">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn bg-transparent px-2 py-0" style="color: #3aafa9"><i class="fas fa-thumbs-up"></i></button>
                        </form>
                    @endif
                    
                    @endauth
                    <span>{{ $single_comment->likes->count() }} {{ Str::plural('commend', $single_comment->likes->count())}}</span>
                    </div>
                </div>
            </div>
        @endif
    @endauth

    @guest
    <div class="add-comment pt-4 pb-1 d-flex align-items-top m-0 ">
        <h5>Please <a href="{{ route('login') }}" class=" fw-bold"> Login</a> to post a review.</h5>
    </div>
    @endguest

    <div class="user-comments">
        @if($comments->count())
            @foreach($comments as $comment)
            <x-comment :comment="$comment" :media_type="$media_type" :movieId="$movieId"/>
            @endforeach
            <div class="container-fluid d-flex flex-column justify-content-center align-items-center mt-2">
                {{ $comments->links()}}
            </div>
        @else
        <div class="p-5">
            <h5>There are no reviews.</h5>
        </div>
        @endif
    </div>
    </div>



<script>
    var ratedIndex = -1;
    
    $(document).ready(function() {
            resetStarColors();
            
        $('.star-rate').on('click', function() {
            ratedIndex = parseInt($(this).data('index'));
            (ratedIndex != -1) ? $('#rate').val(ratedIndex+1): $('#rate').val(null);
            resetStarColors();
            
        });

        $('.star-rate').on({
            mouseenter: function() {
                $('.star-rate').css('color', 'white');
            var currentIndex = parseInt($(this).data('index'));
            for(var i=0; i<= currentIndex; i++)
            {
                $('.star-rate:eq('+i+')').css('color', 'orange');
            }
            },
            mouseleave :function() {
            resetStarColors();
        }
        }); 


        function resetStarColors() {
            $('.star-rate').css('color', 'white');
            if(ratedIndex>=0)
            {
                var i=0;
            do
            {
                $('.star-rate:eq('+i+')').css('color', 'orange');
                i++;
            }
            while(i<= ratedIndex);
            }
        }
    });
</script>