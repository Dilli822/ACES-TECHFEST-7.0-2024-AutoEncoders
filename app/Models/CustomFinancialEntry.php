<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomFinancialEntry extends Model
{
    use HasFactory;

    // You can add this if you want to protect some fields from mass assignment
    protected $fillable = ['details', 'amount', 'is_expense', 'is_income', 'is_transaction'];
}
