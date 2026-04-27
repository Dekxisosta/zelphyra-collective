<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\OrderItem;
use App\Models\Order;
//? Imports the Auth class
use Illuminate\Support\Facades\Auth;

class OrderItemController extends Controller
{
    //  Function (GET API) retrieves all items belonging to a specific order (must belong to authenticated user)
    public function index($orderId)
    {
        try {
            //? Verify the order belongs to the authenticated user before exposing its items
            $order = Order::where('id', $orderId)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            $orderItems = OrderItem::where('order_id', $orderId)
                ->with('product')
                ->get();

            return response()->json($orderItems, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    //  Function (GET API) retrieves a single order item by ID
    public function show($orderId, $itemId)
    {
        try {
            //? Verify the parent order belongs to the authenticated user
            $order = Order::where('id', $orderId)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            $orderItem = OrderItem::where('id', $itemId)
                ->where('order_id', $orderId)
                ->with('product')
                ->first();

            if (!$orderItem) {
                return response()->json(['message' => 'Order item not found.'], 404);
            }

            return response()->json($orderItem, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}