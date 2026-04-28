<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Order;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    use ApiResponseTrait;

    // POST - process payment for an order
    public function store(Request $request)
    {
        try {
            $request->validate([
                'order_id' => 'required|exists:orders,id',
                'amount'   => 'required|numeric',
                'method'   => 'required|in:cod,gcash,card,paypal',
            ]);

            $order = Order::where('id', $request->order_id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            // Check if payment already exists
            $existing = Payment::where('order_id', $request->order_id)->first();
            if ($existing) {
                return response()->json(['message' => 'Payment already exists for this order.'], 422);
            }

            $payment = Payment::create([
                'order_id'        => $request->order_id,
                'amount'          => $request->amount,
                'method'          => $request->input('method'),
                'status'          => 'pending',
                'transaction_ref' => $request->transaction_ref ?? null,
                'paid_at'         => null,
            ]);

            return response()->json(['message' => 'Payment created successfully!!', 'payment' => $payment], 201);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // GET - get payment for a specific order
    public function show($orderId)
    {
        try {
            $order = Order::where('id', $orderId)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found.'], 404);
            }

            $payment = Payment::where('order_id', $orderId)->first();

            if (!$payment) {
                return response()->json(['message' => 'Payment not found.'], 404);
            }

            return response()->json(['payment' => $payment], 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // PATCH - update payment status (admin only)
    public function updateStatus(Request $request, $id)
    {
        try {
            if (Auth::user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized.'], 403);
            }

            $request->validate([
                'status' => 'required|in:pending,completed,failed,refunded',
            ]);

            $payment = Payment::findOrFail($id);

            $payment->update([
                'status'  => $request->status,
                'paid_at' => $request->status === 'completed' ? now() : $payment->paid_at,
            ]);

            return response()->json(['message' => 'Payment status updated!!'], 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}