<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomFinanceDetails extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'custom_financial_entries';

    // Mass assignable attributes
    protected $fillable = ['user_id', 'details', 'amount', 'is_expense', 'is_income', 'is_transaction'];

    // Relationship with the User model (optional)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
