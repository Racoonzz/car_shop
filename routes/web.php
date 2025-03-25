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
use App\Http\Controllers\Admin\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard route (authenticated only)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
});

// General Routes (Non-authenticated users can place orders)
Route::post('/orders', [OrderController::class, 'store']); // This route will allow non-authenticated users to place orders

// Home route
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Orders route for authenticated users
Route::get('/orders/{id}', [OrderController::class, 'show'])->name('order')->middleware('auth');
Route::get('/CartModal', [CartController::class, 'index'])->name('cart');

// Admin Routes (with middleware and prefix 'admin')
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    // Dashboard Route
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Product Routes
    Route::get('/products', [ProductController::class, 'index'])->name('admin.products'); // List Products
    Route::get('/products/create', [ProductController::class, 'create'])->name('admin.products.create'); // Add Product
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('admin.products.edit'); // Edit Product
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('admin.products.update'); // Update Product
    Route::post('/products', [ProductController::class, 'store'])->name('admin.products.store'); // Store New Product

    // Admin Order Routes
    Route::put('/orders/{id}', [OrderController::class, 'update']); // Update Order
    Route::get('/orders', [OrderController::class, 'index'])->name('admin.orders'); // List Orders
    Route::delete('/admin/orders/{id}', [OrderController::class, 'destroy'])->name('orders.destroy');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('admin.orders.show'); // View Order Details
    Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->name('admin.orders.destroy'); // Delete Order
});

require __DIR__ . '/auth.php';
