<?php

// app/Models/IncomeDetail.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeDetail extends Model
{
    use HasFactory;

    // Define the fields that can be mass-assigned
    protected $fillable = [
        'income_salary',
        'income_investment',
    ];
}
