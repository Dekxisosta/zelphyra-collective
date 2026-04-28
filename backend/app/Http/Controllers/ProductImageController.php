<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    public function index($productId)
    {
        try {
            $images = ProductImage::where('product_id', $productId)
                ->orderBy('sort_order')
                ->get();

            return response()->json(['images' => $images], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}