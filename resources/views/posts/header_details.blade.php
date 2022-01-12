<div class="container d-flex justify-content-between bg-custom-1 text-white p-4 mt-5 border-bottom border-light">
    
    <div class="d-flex justify-content-start align-items-center">
        
        <div class="d-flex flex-column align-items-start">
            <h5 class="fw-bolder">Users Rating: {{round($ratings->avg('rating'), 1)}} <i class="fas fa-star" style="color:orange"></i> - {{$comments->total()}} {{Str::plural('review', $ratings->count())}}</h5>
            <div class="d-flex align-items-center">
            @php
                $rateAvg = round($ratings->avg('rating'), 1)
            @endphp
            @foreach(range(1,5) as $i)
                
                @if($rateAvg > 0)
                    @if ($rateAvg > 0.5)
                        <i class="fas fa-star" style="color: orange;"></i>
                    @else
                        <i class="fas fa-star-half-alt" style="color: orange;"></i>
                    @endif
                @else
                    <i class="far fa-star"></i>
                @endif
                @php $rateAvg-- @endphp
            @endforeach
            </div>
        </div>
    </div>
    @auth
    <div class="bookmark-btn d-flex justify-content-end align-items-center">
        
        @if($watched)
            <form action="{{ route('mark.watched', ['id' => $movieId , 'media_type' => $media_type]) }}" method="post">
                @csrf
                @method('DELETE')
                <button class="btn text-white">
                    <span class="d-flex align-items-center"><i class="fas fa-eye fa-2x me-2"  style="color:#3aafa9;"></i>&times; Watched</span>
                </button> 
            </form>
        @else
            <form action="{{ route('mark.watched', ['id' => $movieId , 'media_type' => $media_type]) }}" method="post">
                @csrf
                <button class="btn text-white">
                    <span class="d-flex align-items-center"><i class="fas fa-eye fa-2x me-2"></i>+ Watched</span>
                </button> 
            </form>
        @endif
        @if($watchlist && !$watched)
        <form action="{{ route($media_type .'.watchlist', ['id' => $movieId , 'media_type' => $media_type]) }}" method="post">
            @csrf
            @method('DELETE')
            <button class="btn text-white">
                <span class="d-flex align-items-center"><i class="fas fa-bookmark fa-2x me-2" style="color:#3aafa9;"></i> &times; Watchlist</span>
            </button>
        </form>
        @elseif(!$watchlist && !$watched)
        <form action="{{ route($media_type .'.watchlist', ['id' => $movieId , 'media_type' => $media_type]) }}" method="post">
            @csrf
            <button class="btn text-white">
                <span class="d-flex align-items-center"><i class="far fa-bookmark fa-2x me-2"></i> + Watchlist</span>
            </button>
        </form>
        @endif
        
        @if($favorite)
        <form action="{{ route($media_type .'.favorite', ['id' => $movieId , 'media_type' => $media_type]) }}" method="post">
            @csrf
            @method('DELETE')
            <button class="btn text-white">
                <span class="d-flex align-items-center"><i class="fas fa-heart fa-2x me-2" style="color:crimson;"></i> &times; Favorites</span>
            </button>     
        </form>   
        @else
        <form action="{{ route($media_type .'.favorite', ['id' => $movieId , 'media_type' => $media_type]) }}" method="post">
            @csrf
            <button class="btn text-white">
                <span class="d-flex align-items-center"><i class="far fa-heart fa-2x me-2" ></i> + Favorites</span>
            </button>
        </form>
        @endif
        </div>
    @endauth
    
</div>