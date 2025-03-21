<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade'); // Allow null for guest orders
            $table->date('orderDate')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->integer('totalPrice');
            $table->foreignId('shipping_method_id')->constrained('shipping_methods')->onDelete('cascade'); // Foreign key to shipping_methods
            $table->foreignId('payment_method_id')->constrained('payment_methods')->onDelete('cascade');   // Foreign key to payment_methods
            $table->string('shippingAddress');
            $table->string('shippingCity');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email');
            $table->string('phone');
            $table->boolean('finalised')->default(false);
            $table->timestamps(); // Add created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};