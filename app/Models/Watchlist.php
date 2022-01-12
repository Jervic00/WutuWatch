<?php

namespace App\Models;

use App\Models\User;
use App\Models\Favorite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Watchlist extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'movieId',
        'media_type',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function favorite(){
        return $this->hasOne(Favorite::class, 'user_id');
    }
}
