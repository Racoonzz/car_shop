<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $orders =  Order::with(['user', 'orderDetails.product'])->get();
        return Inertia::render('Orders', ['orders' => $orders]);
        //return $orders;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $validator = Validator::make($request->all(),[
        //     'user_id' => 'required|exists:users,id',
        //     'finalised' => 'required'
        // ]);
        // if ($validator->fails()){
        //     return response()->json($validator->errors(), 400);
        // };
        // $order = Order::create($request->all());
        // return response()->json($order, 201);

        $request->validate([
            'items' => 'required|array',
            'items.*.productId' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => Auth::user()->id,
                'totalPrice' => collect($request->items)->sum(fn($item) => $item['quantity'] * Product::find($item['productId'])->price),
                'finalised' => false,
            ]);

            foreach ($request->items as $item) {
                OrderDetail::create([
                    'orderId' => $order->id,
                    'productId' => $item['productId'],
                    'quantity' => $item['quantity'],
                    'price' => Product::find($item['productId'])->price,
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
        if(!$order) {
            return response()->json(['message' => 'order not found'], 404);
        }
        return $order;
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'finalised' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $order->update($request->all());
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'order deleted successfully'], 200);
    }
}
