<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Icategory extends Model
{
    use HasFactory;
    /**
     * Get the income that owns the Icategory
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function income(): BelongsTo
    {
        return $this->belongsTo(Income::class);
    }
}
