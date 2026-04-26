<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index(){
        try{
            $category = Category::all();

            return response()->json(['message' => 'Successfully retrieved the categories.', 'categories' => $category], 200);
        }catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    
}
