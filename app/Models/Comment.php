<?php

namespace App\Models;

use App\Models\Like;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'movieId',
        'media_type',
        'user_id',
        'rating',
        'comment'
    ];

    public function likedBy(User $user){
        return $this->likes->contains('user_id', $user->id);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }
}
