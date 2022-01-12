<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watched extends Model
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
}
