<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        {
            return Order::with(['user', 'orderDetails.product'])->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'user_id' => 'required|exists:users,id',
            'finalised' => 'required'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        };
        $order = Order::create($request->all());
        return response()->json($order, 201);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
