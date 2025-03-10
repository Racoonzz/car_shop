<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarModelController;
use App\Http\Controllers\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/orders', [OrderController::class, 'store']);
//Route::post('/orderdetails', [OrderDetailController::class, 'store']);
Route::get('/models', [CarModelController::class, 'index']);
Route::delete('/ordersDetails/{id}', [OrderDetailController::class, 'destroy'])->name('ordersDetails.destroy');
Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->name('orders.destroy');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::post('/products', [ProductController::class, 'store']);

Route::get('orderdetails', [OrderDetailController::class, 'index']); 
Route::post('orderdetails', [OrderDetailController::class, 'store']);
Route::get('orderdetails/{id}', [OrderDetailController::class, 'show']);
Route::put('orderdetails/{id}', [OrderDetailController::class, 'update']);
Route::delete('orderdetails/{id}', [OrderDetailController::class, 'destroy']);