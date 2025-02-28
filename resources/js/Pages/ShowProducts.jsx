import { useState } from "react";

export default function ShowProducts({ products, addToCart }) {



    return (
        <div id="home" className="products">
            {products.length > 0 && (
                products.map((product) => (
                    <div key={product.id} className="listing">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <img src={product.pictureUrl} alt={product.name} />
                        <h3>{product.price} Ft</h3>
                        {product.quantity !== 0 ? (
                            <button onClick={() => addToCart(product)} className="addToCart">
                                Kosárba
                            </button>
                        ) : (
                            <span>Nem rendelhető</span>
                        )}

                    </div>
                ))
            )}
        </div>
    )


}


