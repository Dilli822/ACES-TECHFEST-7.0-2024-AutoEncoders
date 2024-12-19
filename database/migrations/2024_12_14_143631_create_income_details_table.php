<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncomeDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('income_details', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('user_id'); // Foreign Key to reference users table
            $table->decimal('income_salary', 10, 2)->default(0.00);
            $table->decimal('income_investment', 10, 2)->default(0.00);
            $table->timestamps();

            // Setting up the foreign key constraint
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Cascade delete: removes income details if the user is deleted
        });
    }

    public function down()
    {
        Schema::dropIfExists('income_details');
    }
}
