<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Foreign key to reference the users table
            $table->string('details')->nullable(); // Optional details
            $table->decimal('expenses_transportation', 8, 2)->default(0.00); // Default to 0.00
            $table->decimal('expenses_fooding', 8, 2)->default(0.00); // Default to 0.00
            $table->decimal('expenses_refreshment', 8, 2)->default(0.00); // Default to 0.00
            $table->decimal('expenses_shopping', 8, 2)->default(0.00); // Default to 0.00
            $table->timestamps(); // Default timestamps

            // Adding the foreign key constraint
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Cascade delete: removes expenses if the user is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
