<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'expenses';

    // Define the fillable fields
    protected $fillable = [
        'user_id',
        'details',
        'expenses_transportation',
        'expenses_fooding',
        'expenses_refreshment',
        'expenses_shopping',
    ];

    // Cast attributes to appropriate data types
    protected $casts = [
        'expenses_transportation' => 'decimal:2',
        'expenses_fooding' => 'decimal:2',
        'expenses_refreshment' => 'decimal:2',
        'expenses_shopping' => 'decimal:2',
    ];

    // Relationship: Each expense belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
