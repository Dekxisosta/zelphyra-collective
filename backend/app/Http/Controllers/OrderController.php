<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Address;
use App\Models\ProductInventory;
//? Imports the Auth class
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    //  Function (GET API) retrieves all orders of the authenticated user
    public function index()
    {
        try {
            $orders = Order::where('user_id', Auth::id())
                ->with('orderItems')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($orders, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    //  Function (GET API) retrieves a single order by ID (must belong to authenticated user)
    public function show($id)
    {
        try {
            $order = Order::where('id', $id)
                ->where('user_id', Auth::id())
                ->with('orderItems')
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            return response()->json($order, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    //  Function (POST API) creates an order from the authenticated user's cart
    public function checkout(Request $request)
    {
        try {
            $request->validate([
                'address_id'     => 'required|exists:addresses,id',
                'payment_method' => 'required|in:cod,gcash,card,paypal',
            ]);

            $userId = Auth::id();

            //? Fetch the user's cart and its items with product details
            $cart = Cart::where('user_id', $userId)->first();

            if (!$cart) {
                return response()->json(['message' => 'Cart not found.'], 404);
            }

            $cartItems = CartItem::where('cart_id', $cart->id)
                ->with('product')
                ->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'Cart is empty.'], 422);
            }

            //? Fetch and snapshot the shipping address at checkout time
            $address = Address::where('id', $request->address_id)
                ->where('user_id', $userId)
                ->first();

            if (!$address) {
                return response()->json(['message' => 'Address not found.'], 404);
            }

            //* Wrap everything in a transaction — if anything fails, nothing is saved
            DB::transaction(function () use ($cartItems, $address, $request, $userId) {

                //? Calculate total amount from cart items
                $totalAmount = $cartItems->sum(function ($item) {
                    $price = $item->product->price;
                    $discount = $item->product->discount_percent ?? 0;
                    $discountedPrice = $price - ($price * ($discount / 100));
                    return $discountedPrice * $item->quantity;
                });

                //? Create the order with snapshotted shipping info
                $order = Order::create([
                    'user_id'          => $userId,
                    'address_id'       => $address->id,
                    'total_amount'     => $totalAmount,
                    'payment_method'   => $request->payment_method,
                    'status'           => 'pending',
                    'shipping_name'    => $address->full_name,
                    'shipping_phone'   => $address->phone,
                    'shipping_address' => implode(', ', array_filter([
                        $address->address_line1,
                        $address->address_line2,
                        $address->city,
                        $address->province,
                        $address->zip_code,
                        $address->country,
                    ])),
                ]);

                //? Loop through cart items and create order items + update inventory
                foreach ($cartItems as $item) {
                    $price = $item->product->price;
                    $discount = $item->product->discount_percent ?? 0;
                    $discountedPrice = $price - ($price * ($discount / 100));
                    $subtotal = $discountedPrice * $item->quantity;

                    OrderItem::create([
                        'order_id'      => $order->id,
                        'product_id'    => $item->product_id,
                        'product_name'  => $item->product->name,
                        'product_price' => $discountedPrice,
                        'size'          => $item->size,
                        'quantity'      => $item->quantity,
                        'subtotal'      => $subtotal,
                    ]);

                    //? Decrement stock and increment sold in product_inventory
                    ProductInventory::where('product_id', $item->product_id)
                        ->decrement('stock', $item->quantity);

                    ProductInventory::where('product_id', $item->product_id)
                        ->increment('sold', $item->quantity);
                }

                //? Clear the cart after successful order creation
                CartItem::where('cart_id', $item->cart_id ?? $cartItems->first()->cart_id)->delete();
            });

            return response()->json(['message' => 'Order placed successfully!!'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    //  Function (PATCH API) cancels an order (only if still pending)
    public function cancel($id)
    {
        try {
            $order = Order::where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            if ($order->status !== 'pending') {
                return response()->json(['message' => 'Only pending orders can be cancelled.'], 422);
            }

            $order->update(['status' => 'cancelled']);

            //? Restore stock when an order is cancelled
            $orderItems = OrderItem::where('order_id', $order->id)->get();

            foreach ($orderItems as $item) {
                ProductInventory::where('product_id', $item->product_id)
                    ->increment('stock', $item->quantity);

                ProductInventory::where('product_id', $item->product_id)
                    ->decrement('sold', $item->quantity);
            }

            return response()->json(['message' => 'Order cancelled successfully!!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    //  Function (GET API) retrieves ALL orders — admin only
    public function adminIndex()
    {
        try {
            if (Auth::user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized.'], 403);
            }

            $orders = Order::with('orderItems')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($orders, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    //  Function (PATCH API) updates order status — admin only
    public function updateStatus(Request $request, $id)
    {
        try {
            if (Auth::user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized.'], 403);
            }

            $request->validate([
                'status' => 'required|in:pending,paid,shipped,completed,cancelled',
            ]);

            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            $order->update(['status' => $request->status]);

            return response()->json(['message' => 'Order status updated successfully!!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}