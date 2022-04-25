@extends('layouts.app')

@section('pageTitle', 'Dashboard')

@section('content')

<div class="container-xl mx-auto mt-5" style="min-height: 75vh;">
    <table class="w-100 table-dark table-bordered border-light align-middle bg-dark">
    <thead>
    <tr class="text-center">
        <th scope="col">ID</th>
        <th scope="col">MOVIE/TV SHOW</th>
        <th scope="col">USER RATING</th>
        <th scope="col">USER REVIEW</th>
        <th scope="col">USER DETAILS</th>
        <th scope="col">ACTION</th>
    </tr>
    </thead>
    <tbody>
    @if($comments->count())
    @foreach($comments as $comment)
    <tr>
        <td>{{ $comment->id }}</td>
        <td>
            <a href="{{route($comment->media_type, ['id' => $comment->movieId, 'media_type' => $comment->media_type])}}" class="m-2" >
                <img src="https://via.placeholder.com/238x357/000000/FFFFFF/?text=NoImage" class="iphone-X m-0" style="width: 100px; height: 100%" name="thumbnail" alt="">
            </a>
            <a href="{{route($comment->media_type, ['id' => $comment->movieId, 'media_type' => $comment->media_type])}}" class="comment-from text-decoration-none" name="comment-from"></a>
        </td>
        <td>
            <div class="d-flex align-items-center ms-2">
            @for ($i = 0; $i < 5; $i++)
                @if ($i < $comment->rating)
                    <i class="fas fa-star" style="color: orange;"></i>
                @else
                    <i class="fas fa-star"></i>
                @endif
            @endfor
                <span class="text-white ms-1">{{ $comment->rating }} {{Str::plural('star', $comment->rating)}}</span>
            </div>
        </td>
        <td style="white-space: pre-wrap"> Posted: {{$comment->created_at->format('M-d-Y H:i')}}
    {{ $comment->comment }}</td>
        <td>
            <a href="{{ route('users.profile', $comment->user)}}" class="text-decoration-none text-white ms-2" ><small>  {{ $comment->user->username}}</small></a>
        </td>
        <td class="text-center">
        <form action="{{ route($comment->media_type .'.' .'destroy', ['comment' => $comment, 'id' => $comment->movieId , 'media_type' => $comment->media_type]) }}" method="post">
            @csrf
            @method('DELETE')
            <button type="submit" onclick="return confirm('Are you sure?')" class="delete-button btn bg-danger px-2 py-0" style="color: white"><i class="fas fa-trash-alt"></i> Delete</button>
        </form>
        </td>
    </tr>
    @endforeach
    <div class="container-fluid d-flex flex-column justify-content-center align-items-center mt-2">
        {{ $comments->links()}}
    </div>
    @else
    <td class="p-5">
            <h5>There are no reviews.</h5>
    </td>
    @endif
    </tbody>
    </table>
</div>
@endsection