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
    
public function up()
{
    Schema::create('orders', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained(); // Foreign key to the users table
        $table->foreignId('shipping_method_id')->constrained(); // Foreign key to the shipping_methods table
        $table->foreignId('payment_method_id')->constrained(); // Foreign key to the payment_methods table
        $table->string('shippingAddress');
        $table->string('shippingCity');
        $table->string('firstName');
        $table->string('lastName');
        $table->string('email');
        $table->string('phone');
        $table->decimal('totalPrice', 10, 2);
        $table->boolean('finalised')->default(false);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['shipping_method_id']);
            $table->dropForeign(['payment_method_id']);
        });
    
        Schema::dropIfExists('orders');
    }
    
};