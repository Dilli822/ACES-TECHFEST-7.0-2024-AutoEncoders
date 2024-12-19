<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Income extends Model
{
    use HasFactory;

    /**
     * Get the icategory that owns the Income
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

     /**
      * Get all of the icategories for the Income
      *
      * @return \Illuminate\Database\Eloquent\Relations\HasMany
      */
     public function icategories(): HasMany
     {
         return $this->hasMany(Icategory::class);
     }
}
