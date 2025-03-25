<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($order) {
            $order->orderDetails()->delete(); // Delete related order details
        });
    }

    public function ShippingMethod()
    {
        return $this->belongsTo(ShippingMethod::class);
    }

    public function PaymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }


    protected $fillable = [
        'user_id',
        'shipping_method_id',
        'payment_method_id',
        'shippingAddress',
        'shippingCity',
        'firstName',
        'lastName',
        'email',
        'phone',
        'totalPrice'
    ];

    // Define the relationship to OrderDetail
    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
