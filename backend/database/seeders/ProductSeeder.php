<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    //? Inserts a dummy data to the table 
    public function run(): void
    {
        //? Dummy data for products
        //? insert method for the model - used for seeders (inputs multiple datas)
        Product::insert([
            [
                'name' => 'Nike Air Force 1',
                'description' => 'Classic white sneakers perfect for everyday wear.',
                'price' => 999.99,
                'discount' => 10,

                'rating' => 4.5,
                'reviews_count' => 120,

                'sold' => 200,
                'stock' => 50,
                'brand' => 'Nike',
                'sku' => 'NK-AF1-001',
                
                'weight' => 0.80, 
                'width' => 10.00,
                'height' => 5.00,
                'depth' => 30.00,
                'shipping_from' => 'Manila',
                
                'shipping_fee' => 99.00,
                'shipping_days' => '3-5 days',
                'image' => 'https://via.placeholder.com/500',
                'hover_image' => 'https://via.placeholder.com/500',
                'pill' => 'bestseller',
                'category_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Adidas Ultraboost',
                'description' => 'High performance running shoes.',
                'price' => 1299.99,
                'discount' => null,
                'rating' => 4.8,
                'reviews_count' => 89,
                'sold' => 150,
                'stock' => 30,
                'brand' => 'Adidas',
                'sku' => 'AD-UB-001',
                'weight' => 0.75,
                'width' => 10.00,
                'height' => 5.00,
                'depth' => 29.00,
                'shipping_from' => 'Cebu',
                'shipping_fee' => 120.00,
                'shipping_days' => '5-7 days',
                'image' => 'https://via.placeholder.com/500',
                'hover_image' => null,
                'pill' => 'trending',
                'category_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]

        ]);
    }
}
