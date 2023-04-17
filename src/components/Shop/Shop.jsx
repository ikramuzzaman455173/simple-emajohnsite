import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cart from "../../Cart/Cart";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        let newCart = []
        // newCart = [...cart, product]
        const existsProduct = cart.find(pd => pd.id === product.id)
        if (!existsProduct) {
            product.quantity = 1
            newCart = [...cart, product]
            // console.log(existsProduct,'existsProduct');
        } else {
            // console.log(existsProduct, 'existsProduct else part');
            existsProduct.quantity = existsProduct.quantity + 1
            const remainingProduct = cart.filter(pd => pd.id !== product.id)
            newCart = [...remainingProduct, existsProduct]
            // console.log(newCart = [...remainingProduct, existsProduct],'Filter product');
        };
        setCart(newCart)
        addToDb(product.id)
    };

    const handleClearCart = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't To Clear The Products Carts!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Clear Cart!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your Cart Has Been Clears.',
                    'success',
                    setCart([]),
                    deleteShoppingCart()
                  )
              }
          })
    }

    useEffect(() => {
        fetch("products.json")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        const storeCart = getShoppingCart()
        // console.log(storeCart);
        let saveCart = []
        for (const id in storeCart) {
            const addedProduct =products.find(pd => pd.id === id)
            if (addedProduct) {
                const quantity = storeCart[id]
                addedProduct.quantity = quantity
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart)

    }, [products])

    return (
        <div className="shop-container">
            <div className="products-container">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>
                ))}
            </div>
            <div className="cart-container">
                <Cart handleClearCart={handleClearCart} cart={cart}>
                    <Link className="proced-link" to="/orders">
                        <button className='btn-processed'>
                            <span>Review Order</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>

                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;