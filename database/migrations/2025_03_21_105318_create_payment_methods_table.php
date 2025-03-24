<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Credit Card", "Debit Card", "PayPal"
            $table->integer('fee');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::disableForeignKeyConstraints();
    Schema::dropIfExists('payment_methods');
    Schema::enableForeignKeyConstraints();
}

   
};
