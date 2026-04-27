<?php

namespace App\Models;

use App\Models\ProductInventory;
use App\Models\ProductImage;
use App\Models\Category;
use App\Models\Pill;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // TODO: Finish the fillable function for products (exclude id)
    protected $fillable = [
        'name',
        'description',
        'price',
        'discount_percent',
        'brand',
        'sku',
        'size',
        'shipping_from',
        'shipping_fee',
        'shipping_days_min',
        'shipping_days_max',
        'pill_id',
        'category_id'
    ];

    public function inventory()
    {
        return $this->hasOne(ProductInventory::class);
    }
    // One-to-many with product_images table
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

}
