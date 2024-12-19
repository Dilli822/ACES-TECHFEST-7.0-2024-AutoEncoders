<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    // Table associated with the model
    protected $table = 'transfers';

    // Fillable attributes for mass assignment
    protected $fillable = [
        'user_id',
        'cash_to_cash',
        'bank_to_bank',
    ];

    // Default values for attributes
    protected $attributes = [
        'cash_to_cash' => 0.00,
        'bank_to_bank' => 0.00,
    ];

    // Relationship: Each transfer belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

