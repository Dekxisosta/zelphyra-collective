<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // TODO: Finish the fillable function for products (exclude id)
    protected $fillable = [
        'name', 
        'description', 
        'price',
        'discount',
        'rating',
        'reviews_count', 
        'sold', 
        'stock',
        'brand',
        'sku',
        'weight',
        'width',
        'height',
        'depth',
        'shipping_from',
        'shipping_fee',
        'shipping_days',
        'image',
        'hover_image',
        'pill',
        'category_id'
    ];
}
