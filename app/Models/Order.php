<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    

    protected $fillable = [
        'user_id',
        'orderDate',
        'totalPrice',
        'shipping_method_id',
        'payment_method_id',
        'shippingAddress',
        'shippingCity',
        'firstName',
        'lastName',
        'email',
        'phone',
        'finalised',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shippingMethod()
    {
        return $this->belongsTo(ShippingMethod::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}