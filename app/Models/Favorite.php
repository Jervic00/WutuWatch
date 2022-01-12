<?php

namespace App\Models;

use App\Models\Watchlist;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Favorite extends Model
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

    public function watchlist(){
        return $this->hasMany(Watchlist::class);
    }
}
