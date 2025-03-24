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
        Schema::create('shipping_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Standard", "Express", "SameDay"
            $table->integer('price');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    DB::statement('PRAGMA foreign_keys=off;'); // Disable foreign key checks for SQLite
    Schema::dropIfExists('shipping_methods');
    DB::statement('PRAGMA foreign_keys=on;'); // Re-enable foreign key checks
}

};
