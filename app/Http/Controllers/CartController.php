<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        // Return the cart data here
        return response()->json(['cart' => 'data']);
    }
}
