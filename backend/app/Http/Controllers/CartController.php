<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Function (GET API) returns the authenticated user's cart with all items
    public function index()
    {
        try {
            $cart = Cart::with([
                'items.product' => function ($query) {
                    $query->with([
                        'images' => fn($q) => $q->where('is_primary', true)->limit(1),
                        'inventory',
                    ]);
                },
            ])->where('user_id', Auth::id())->first();

            if (!$cart || $cart->items->isEmpty()) {
                return response()->json([
                    'message'    => 'Cart is empty.',
                    'items'      => [],
                    'item_count' => 0,
                    'total'      => 0,
                ], 200);
            }

            $items = $cart->items->map(function ($item) {
                $product     = $item->product;
                $unitPrice   = $product->price;
                $discountPct = $product->discount_percent ?? 0;
                $finalPrice  = $unitPrice - ($unitPrice * ($discountPct / 100));

                return [
                    'id'           => $item->id,
                    'product_id'   => $product->id,
                    'product_name' => $product->name,
                    'brand'        => $product->brand,
                    'sku'          => $product->sku,
                    'size'         => $item->size,
                    'quantity'     => $item->quantity,
                    'unit_price'   => round($unitPrice, 2),
                    'discount_pct' => $discountPct,
                    'final_price'  => round($finalPrice, 2),
                    'subtotal'     => round($finalPrice * $item->quantity, 2),
                    'stock'        => $product->inventory?->stock ?? 0,
                    'image_url'    => $product->images->first()?->url,
                    'added_at'     => $item->added_at,
                ];
            });

            return response()->json([
                'message'    => 'Cart retrieved successfully.',
                'cart_id'    => $cart->id,
                'items'      => $items,
                'item_count' => $items->sum('quantity'),
                'total'      => round($items->sum('subtotal'), 2),
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // Function (DELETE API) removes all items from the authenticated user's cart
    public function clear()
    {
        try {
            $cart = Cart::where('user_id', Auth::id())->first();

            if (!$cart) {
                return response()->json(['message' => 'No active cart found.'], 404);
            }

            $cart->items()->delete();

            return response()->json(['message' => 'Cart cleared successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}