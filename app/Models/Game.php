<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
     protected $fillable = [

        'title',
        'slug',
        'description',
        'developer',
        'publisher',
        'release_date',
        'genre',
        'price',
        'cover_image',
        'rating',
        'is_active'

    ];
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function wishlistItems()
    {
        return $this->hasMany(WishlistItem::class);
    }
}
