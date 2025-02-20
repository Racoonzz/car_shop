<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
   public $timestamps = false;
    protected $fillable = ['user_id', 'orderDate', 'finalised'];
    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'orderId');
    }
}
