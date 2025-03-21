import React from 'react';
import '../../css/app.css';
export default function Orders({orders}) {
    return (
        <div>
            <h1>Orders</h1>
            {orders.map(order => (
                <div key={order.id}>
                    <h2>{order.user.name}</h2>
                    {order.order_details.map(orderDetail => (
                        <p key={orderDetail.id}>{orderDetail.product.name}</p>
                    ))}
                </div>
            ))}
            
        </div>
        
    );
}