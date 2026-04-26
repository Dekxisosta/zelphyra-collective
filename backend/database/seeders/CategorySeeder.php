<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //? Dummy data for Category
        //? create method for the model - used for seeders (inputs single data)
        Category::create(['name' => 'Shoes', 'slug' => 'shoes']);
        Category::create(['name' => 'Bags', 'slug' => 'bags']);
    }
}
