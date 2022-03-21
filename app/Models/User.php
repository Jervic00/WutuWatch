<?php

namespace App\Models;

use App\Models\Like;
use App\Models\Watched;
use App\Models\Watchlist;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'id',
        'username',
        'email',
        'birthdate',
        'password',
        'profile_image'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = strtolower($value);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes(){
        return $this->hasMany(Like::class);
    }
    
    public function receivedLikes(){
        return $this->hasManyThrough(Like::class, Comment::class);
    }

    public function getPictureAttribute($value){
        if($value){
            return asset('users/images/'.$value);
        }
        else{
            return asset('users/images/no-image.png');
        }
    }

    public function watchlists(){
        return $this->hasMany(Watchlist::class);
    }
    
    public function favorites(){
        return $this->hasMany(Favorite::class);
    }
    
    public function watcheds(){
        return $this->hasMany(Watched::class);
    }
}
