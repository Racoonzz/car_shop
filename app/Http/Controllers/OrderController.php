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

        // Format the order data to pass only relevant fields
        $ordersFormatted = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'firstName' => $order->firstName,
                'lastName' => $order->lastName,
                'shippingMethod' => $order->shippingMethod ? $order->shippingMethod->name : 'N/A',
                'paymentMethod' => $order->paymentMethod ? $order->paymentMethod->name : 'N/A',
                'totalPrice' => $order->totalPrice,
                // add other fields as necessary
            ];
        });

        return Inertia::render('Admin/Orders', [
            'orders' => $ordersFormatted
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
        $order = Order::with(['user', 'orderDetails.product', 'shippingMethod', 'paymentMethod'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Format the order data to pass only relevant fields
        $orderFormatted = [
            'id' => $order->id,
            'firstName' => $order->firstName,
            'lastName' => $order->lastName,
            'email' => $order->email,
            'phone' => $order->phone,
            'shippingAddress' => $order->shippingAddress,
            'shippingCity' => $order->shippingCity,
            'shippingMethod' => $order->shippingMethod ? $order->shippingMethod->name : 'N/A',
            'paymentMethod' => $order->paymentMethod ? $order->paymentMethod->name : 'N/A',
            'totalPrice' => $order->totalPrice,
            'created_at' => $order->created_at->format('Y. m. d. H:i:s'), // Format the date
            'finalised' => $order->finalised,
            // Get the order details (products)
            'order_details' => $order->orderDetails->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'product' => [
                        'name' => $detail->product->name,
                        'models' => $detail->product->models,
                        'description' => $detail->product->description,
                        'pictureUrl' => $detail->product->pictureUrl,
                    ],
                    'quantity' => $detail->quantity,
                    'price' => $detail->price,
                ];
            }),
        ];

        return Inertia::render('Admin/OrderShow', [
            'order' => $orderFormatted
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    // OrderController.php
    // OrderController.php

    public function update(Request $request, $id)
    {
        // Find the order by ID
        $order = Order::findOrFail($id);

        // Check if the 'finalised' field exists in the request and set it to 1 (Shipping)
        if ($request->has('finalised')) {
            $order->finalised = $request->input('finalised');
            $order->save();

            return response()->json(['message' => 'Order status updated to Shipping']);
        }

        return response()->json(['message' => 'Invalid request'], 400);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $order = Order::findOrFail($id);

            // Delete related order details
            $order->orderDetails()->delete();

            // Now delete the order
            $order->delete();

            return redirect()->back()->with('success', 'Order deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete order: ' . $e->getMessage());
        }
    }


}
