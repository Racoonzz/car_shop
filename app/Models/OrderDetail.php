<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    public $table = 'order_details';
    public $timestamps = false;
    protected $fillable = ['orderId', 'productId', 'quantity'];
    public function order()
    {
        return $this->belongsTo(Order::class, 'orderId');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'productId')->withDefault();;
    }
}
