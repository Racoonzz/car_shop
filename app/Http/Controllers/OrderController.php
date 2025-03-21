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
        $orders = Order::with(['user', 'orderDetails.product'])->get();

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
    $request->validate([
        'items' => 'required|array',
        'items.*.productId' => 'required|exists:products,id',
        'items.*.quantity' => 'required|integer|min:1',
        'shippingMethod' => 'required|exists:shipping_methods,id',
        'paymentMethod' => 'required|exists:payment_methods,id',
        'shippingAddress' => 'required|string',
        'shippingCity' => 'required|string',
        'firstName' => 'required|string',
        'lastName' => 'required|string',
        'email' => 'required|email',
        'phone' => 'required|string',
    ]);

    // Log incoming request data for debugging
    \Log::info('Order request data:', $request->all());

    DB::beginTransaction();
    try {
        // Calculate the total price of products
        $totalPrice = collect($request->items)->sum(function($item) {
            $product = Product::find($item['productId']);
            if (!$product) {
                throw new \Exception('Product not found: ' . $item['productId']);
            }
            return $item['quantity'] * $product->price;
        });

        // Fetch shipping and payment methods from the database
        $shippingMethod = DB::table('shipping_methods')->find($request->shippingMethod);
        $paymentMethod = DB::table('payment_methods')->find($request->paymentMethod);

        if (!$shippingMethod || !$paymentMethod) {
            throw new \Exception('Invalid shipping or payment method');
        }

        // Get the shipping fee and payment fee
        $shippingFee = $shippingMethod->price ?? 0;
        $paymentFee = $paymentMethod->fee ?? 0;

        // Calculate the final total price (products + shipping + payment)
        $finalTotalPrice = $totalPrice + $shippingFee + $paymentFee;

        // Check if the user is authenticated, otherwise handle as a guest
        $userId = Auth::check() ? Auth::id() : null;

        // Create the order
        $order = Order::create([
            'user_id' => $userId, // Store user_id as null if not authenticated
            'totalPrice' => $finalTotalPrice,  // Store the final total price
            'shipping_method_id' => $shippingMethod->id, // Store shipping method ID
            'payment_method_id' => $paymentMethod->id,   // Store payment method ID
            'shippingAddress' => $request->shippingAddress,
            'shippingCity' => $request->shippingCity,
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'phone' => $request->phone,
            'finalised' => false,
        ]);

        // Create order details for each product
        foreach ($request->items as $item) {
            $product = Product::find($item['productId']);
            if (!$product) {
                throw new \Exception('Product not found: ' . $item['productId']);
            }
            OrderDetail::create([
                'orderId' => $order->id,
                'productId' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        DB::commit();
        return response()->json(['message' => 'Order placed successfully'], 201);
    } catch (\Exception $e) {
        DB::rollBack();
        // Log the error for debugging
        \Log::error('Order placement failed: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::with(['user', 'orderDetails.product'])->find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return Inertia::render('Admin/OrderShow', [
            'order' => $order
        ]);
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
