<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', // Name of the shipping method
        'price', // Price of the shipping method
    ];

    // Relationship to the Order model
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
