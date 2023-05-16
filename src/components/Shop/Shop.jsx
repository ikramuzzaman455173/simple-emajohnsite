import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Cart from "../../Cart/Cart";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
    const [current, setCurrent] = useState(0)
    const [itemsPerpage, setItemsPerpage] = useState(10)
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData()
    // const itemsPerpage = 10
    const totalPages = Math.ceil(totalProducts / itemsPerpage)
    console.log(totalProducts, totalPages)

    // const pageNumbers = []
    // for (let i = 0; i < 10; i++){
    //     pageNumbers.push(i)
    // }

    const pageNumbers = [...Array(totalPages).keys()]
    console.log(pageNumbers);

    const options = [5, 10, 15, 20]
    const handleSelectChange = (event) => {
        setItemsPerpage(event.target.value)
        setCurrent(0)
    }

    const handleAddToCart = (product) => {
        let newCart = []
        // newCart = [...cart, product]
        const existsProduct = cart.find(pd => pd._id === product._id)
        if (!existsProduct) {
            product.quantity = 1
            newCart = [...cart, product]
            // console.log(existsProduct,'existsProduct');
        } else {
            // console.log(existsProduct, 'existsProduct else part');
            existsProduct.quantity = existsProduct.quantity + 1
            const remainingProduct = cart.filter(pd => pd._id !== product._id)
            newCart = [...remainingProduct, existsProduct]
            // console.log(newCart = [...remainingProduct, existsProduct],'Filter product');
        };
        setCart(newCart)
        addToDb(product._id)
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

    // useEffect(() => {
    //     fetch("http://localhost:4000/products")
    //         .then((res) => res.json())
    //         .then((data) => setProducts(data));
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/products?page=${current}&limit=${itemsPerpage}`)
            const data = await response.json()
            setProducts(data)
        }
        fetchData()
    }, [current, itemsPerpage])

    useEffect(() => {
        const storeCart = getShoppingCart()
        const ids = Object.keys(storeCart)
        // console.log(ids);
        fetch('http://localhost:4000/productById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                let saveCart = []
                for (const id in storeCart) {
                    const addedProduct = cartProducts.find(pd => pd._id === id)
                    if (addedProduct) {
                        const quantity = storeCart[id]
                        addedProduct.quantity = quantity
                        saveCart.push(addedProduct)
                    }
                }
                setCart(saveCart)
            })
        // console.log(storeCart);

    }, [])

    return (
        <>
            <div className="shop-container">
                <div className="products-container">
                    {products.map((product) => (
                        <Product
                            key={product._id}
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
            {/* ====pagination===== */}
            <div className="pagination">
                <p>Current Number Is:{current}</p>
                {pageNumbers.map(number => <button className={current === number ? 'selected' : ''} onClick={() => setCurrent(number)} key={number}>{number}</button>)}
                <select value={itemsPerpage} onChange={handleSelectChange}>
                    {options.map(option => <option key={option} value={option}>
                        {option}
                    </option>)}
                </select>
            </div>
        </>
    );
};

export default Shop;