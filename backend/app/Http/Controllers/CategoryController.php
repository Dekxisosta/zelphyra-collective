<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Traits\ApiResponseTrait;

class CategoryController extends Controller
{

    use ApiResponseTrait;
    public function index(){
        try{
            $category = Category::all();

            return response()->json(['message' => 'Successfully retrieved the categories.', 'categories' => $category], 200);
        }catch(\Exception $e){
            return $this->handleException($e);
        }
    }

    public function show($id){
         try{
            $category = Category::findOrFail($id);

            return response()->json(['message' => 'Successfully retrieved the categories.', 'categories' => $category], 200);
        }catch(\Exception $e){
            return $this->handleException($e);
        }
    }
    
}
