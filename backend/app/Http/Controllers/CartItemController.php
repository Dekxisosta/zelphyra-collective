<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CartItemController extends Controller
{
    // Helper: find or create the cart for the authenticated user
    private function resolveCart(): Cart
    {
        return Cart::firstOrCreate(['user_id' => Auth::id()]);
    }

    // Helper: find a cart item that belongs to the authenticated user's cart
    private function findOwnedItem(int $id): ?CartItem
    {
        return CartItem::whereHas('cart', function ($query) {
            $query->where('user_id', Auth::id());
        })->with('cart')->find($id);
    }

    // Function (POST API) adds a product to the cart.
    // If the same (product + size) already exists, it increments the quantity instead.
    public function store(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|integer|exists:products,id',
                'quantity'   => 'required|integer|min:1|max:100',
                'size'       => ['nullable', Rule::in(['XS', 'S', 'M', 'L', 'XL', 'XXL'])],
            ]);

            $product = Product::with('inventory')->findOrFail($request->product_id);
            $stock   = $product->inventory?->stock ?? 0;

            if ($stock < 1) {
                return response()->json(['message' => 'This product is out of stock.'], 422);
            }

            $cart     = $this->resolveCart();
            $size     = $request->size ?? null;
            $quantity = $request->quantity;

            //? Check if the same product + size combo already exists in the cart
            $existing = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $product->id)
                ->where('size', $size)
                ->first();

            if ($existing) {
                $newQty = $existing->quantity + $quantity;

                if ($newQty > $stock) {
                    return response()->json([
                        'message' => "Only {$stock} unit(s) available. You already have {$existing->quantity} in your cart.",
                    ], 422);
                }

                $existing->update(['quantity' => $newQty]);
                $item = $existing->fresh();
            } else {
                if ($quantity > $stock) {
                    return response()->json(['message' => "Only {$stock} unit(s) available."], 422);
                }

                $item = CartItem::create([
                    'cart_id'    => $cart->id,
                    'product_id' => $product->id,
                    'quantity'   => $quantity,
                    'size'       => $size,
                ]);
            }

            $cart->touch();

            //? Compute price fields for the response
            $unitPrice   = $product->price;
            $discountPct = $product->discount_percent ?? 0;
            $finalPrice  = $unitPrice - ($unitPrice * ($discountPct / 100));

            return response()->json([
                'message' => 'Item added to cart.',
                'item'    => [
                    'id'           => $item->id,
                    'product_id'   => $product->id,
                    'product_name' => $product->name,
                    'size'         => $item->size,
                    'quantity'     => $item->quantity,
                    'unit_price'   => round($unitPrice, 2),
                    'discount_pct' => $discountPct,
                    'final_price'  => round($finalPrice, 2),
                    'subtotal'     => round($finalPrice * $item->quantity, 2),
                    'stock'        => $stock,
                    'added_at'     => $item->added_at,
                ],
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // Function (PATCH API) updates the quantity of a specific cart item
    public function update(Request $request, int $id)
    {
        try {
            $request->validate([
                'quantity' => 'required|integer|min:1|max:100',
            ]);

            $item = $this->findOwnedItem($id);

            if (!$item) {
                return response()->json(['message' => 'Cart item not found.'], 404);
            }

            $product = Product::with('inventory')->find($item->product_id);
            $stock   = $product->inventory?->stock ?? 0;

            if ($request->quantity > $stock) {
                return response()->json(['message' => "Only {$stock} unit(s) available."], 422);
            }

            $item->update(['quantity' => $request->quantity]);
            $item->cart->touch();

            $unitPrice   = $product->price;
            $discountPct = $product->discount_percent ?? 0;
            $finalPrice  = $unitPrice - ($unitPrice * ($discountPct / 100));

            return response()->json([
                'message' => 'Cart item updated.',
                'item'    => [
                    'id'           => $item->id,
                    'product_id'   => $product->id,
                    'product_name' => $product->name,
                    'size'         => $item->size,
                    'quantity'     => $item->quantity,
                    'unit_price'   => round($unitPrice, 2),
                    'discount_pct' => $discountPct,
                    'final_price'  => round($finalPrice, 2),
                    'subtotal'     => round($finalPrice * $item->quantity, 2),
                    'stock'        => $stock,
                    'added_at'     => $item->added_at,
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    // Function (DELETE API) removes a specific item from the cart
    public function destroy(int $id)
    {
        try {
            $item = $this->findOwnedItem($id);

            if (!$item) {
                return response()->json(['message' => 'Cart item not found.'], 404);
            }

            $cart = $item->cart;
            $item->delete();
            $cart->touch();

            return response()->json(['message' => 'Item removed from cart.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}