<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarModelController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/orders', [OrderController::class, 'store']);
Route::post('/orderdetails', [OrderDetailController::class, 'store']);
Route::delete('/orderdetails', [OrderDetailController::class, 'destroy']);
Route::get('/models', [CarModelController::class, 'index']);