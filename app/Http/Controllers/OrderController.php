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
        return Inertia::render('Orders', [
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
            'shippingMethod' => 'required|integer',
            'paymentMethod' => 'required|integer',
            'shippingAddress' => 'required|string',
            'shippingCity' => 'required|string',
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $totalPrice = collect($request->items)->sum(fn($item) => $item['quantity'] * Product::find($item['productId'])->price);

            $order = Order::create([
                'user_id' => Auth::id(),
                'totalPrice' => $totalPrice,
                'shippingMethod' => $request->shippingMethod,
                'paymentMethod' => $request->paymentMethod,
                'shippingAddress' => $request->shippingAddress,
                'shippingCity' => $request->shippingCity,
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'phone' => $request->phone,
                'finalised' => false,
            ]);

            foreach ($request->items as $item) {
                $product = Product::find($item['productId']);
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
        return Inertia::render('OrderShow', [
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
