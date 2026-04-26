<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::all();
            
            return response()->json(['message' => 'Products successfully retrieved.', 'products' => $products], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function show($id){
         try {
            $product = Product::findOrFail($id);
            
            return response()->json(['message' => 'Product successfully retrieved.', 'product' => $product], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
