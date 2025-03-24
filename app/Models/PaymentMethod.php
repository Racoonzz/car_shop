<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', // Name of the payment method
        'fee',  // Fee associated with the payment method
    ];

    // Relationship to the Order model
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
