<?php

namespace Database\Seeders;

use App\Models\ProductInventory;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductInventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductInventory::create([
            'product_id' => 1,
            'stock' => 100,
            'sold' => 1,
        ]);

        ProductInventory::create([
            'product_id' => 2,
            'stock' => 100,
            'sold' => 4,
        ]);
    }
}
