<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['user', 'orderDetails.product', 'shippingMethod', 'paymentMethod'])->get();

        // Pass the orders to Inertia view
        return Inertia::render('Admin/Orders', [
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            // Create the order
            $order = Order::create([
                'user_id' => auth()->id(),
                'shipping_method_id' => $request->shippingMethod,
                'payment_method_id' => $request->paymentMethod,
                'shippingAddress' => $request->shippingAddress,
                'shippingCity' => $request->shippingCity,
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'phone' => $request->phone,
                'totalPrice' => $request->totalPrice,
            ]);

            // Insert the order details
            foreach ($request->items as $item) {
                // Ensure the order_id is properly set
                $order->details()->create([
                    'product_id' => $item['productId'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => 'Order placed successfully!',
                'order' => $order,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error placing order: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Use eager loading to fetch the relationships
        $order = Order::with(['user', 'orderDetails.product', 'shippingMethod', 'paymentMethod'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Check if the shipping and payment methods exist
        if ($order->shippingMethod && $order->paymentMethod) {
            return Inertia::render('Admin/OrderShow', [
                'order' => $order
            ]);
        } else {
            // Log the issue or return an error if methods are missing
            \Log::error('Shipping or payment method not found for order', ['order_id' => $id]);
            return response()->json(['message' => 'Shipping or Payment method not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'finalised' => 'required|boolean'
        ]);

        $order->update(['finalised' => $request->finalised]);
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}
