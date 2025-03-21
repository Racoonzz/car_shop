<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ShippingMethod; // Add this line
use App\Models\PaymentMethod;  // Add this line
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Seed categories
        $categories = [
            ['name' => 'külső kiegészítők'],
            ['name' => 'belső kiegészítők'],
            ['name' => 'alkatrészek'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Seed products from JSON file
        $json = File::get(database_path('data/products.json'));
        $products = json_decode($json, true);

        foreach ($products as $product) {
            Product::create($product);
        }

        // Seed shipping methods
        $shippingMethods = [
            ['name' => 'Standard (3-5 business days)', 'price' => 1000],
            ['name' => 'Express (1-2 business days)', 'price' => 2500],
            ['name' => 'SameDay Delivery', 'price' => 4000],
        ];

        foreach ($shippingMethods as $method) {
            ShippingMethod::create($method);
        }

        // Seed payment methods
        $paymentMethods = [
            ['name' => 'Credit Card', 'fee' => 0],
            ['name' => 'Bank Transfer', 'fee' => 500],
            ['name' => 'Cash on Delivery', 'fee' => 500],
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::create($method);
        }

        // Uncomment and use the following if you want to seed orders and order details from JSON files
        /*
        $json = File::get(database_path('data/orders.json'));
        $orders = json_decode($json, true);

        foreach ($orders as $order) {
            Order::create($order);
        }

        $json = File::get(database_path('data/ordersDetails.json'));
        $ordersDetails = json_decode($json, true);

        foreach ($ordersDetails as $orderDetail) {
            OrderDetail::create($orderDetail);
        }
        */
    }
}