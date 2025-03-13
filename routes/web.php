<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ModelController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
       
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
// Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Route::middleware(['admin'])->group(function () {
//     Route::get('/admin', [AdminController::class, 'index']);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    
    Route::post('/orders', [OrderController::class, 'store']);
});

Route::get('/', function () { return Inertia::render('Home'); })->name('home');
//Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/orders', [OrderController::class, 'index'])->name('orders')->middleware('auth');
//Route::get('/ordersDetails', [OrderDetailController::class, 'index'])->name('ordersDetails')->middleware('auth');
Route::get('/orders/{id}', [OrderController::class, 'show'])->name('order')->middleware('auth');
Route::get('/CartModal', [CartController::class, 'index'])->name('cart');

// Route::get('image/{filename}', function ($filename) {
//     // Check if the user is an admin
//     if (auth()->check() && auth()->user()->is_admin) {
//         $path = storage_path("app/public/img/{$filename}");
        
//         // Check if file exists and return it
//         if (file_exists($path)) {
//             return response()->file($path);
//         } else {
//             abort(404);
//         }
//     } else {
//         abort(403); // Forbid access if not admin
//     }
// });


require __DIR__.'/auth.php';
