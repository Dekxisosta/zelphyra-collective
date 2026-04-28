<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'address_id', 'total_amount', 'payment_method', 'status', 'shipping_name', 'shipping_phone', 'shipping_address'];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
