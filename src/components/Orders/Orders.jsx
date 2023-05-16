import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../../Cart/Cart';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import OrderItem from '../reviewItem/reviewItem';
import "./Order.css";
import { faCreditCardAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
const Orders = () => {
  const saveCart = useLoaderData()
  const [cart, setCart] = useState(saveCart)
  const handleRemoveCart = (id) => {
    const remainingProduct = cart.filter(product => product._id !== id)
    // console.log('remainingProduct:',remainingProduct);
    if (remainingProduct) {
      setCart(remainingProduct)
      removeFromDb(id)
      toast("Cart Product Delete Successfully !!!");
      return
    }
  }
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
  // console.log(`products:`,products);

  return (
    <div className='shop-container'>
      <div className="review-container">
        {cart.map(product=><OrderItem product={product} key={product._id} handleRemoveCart={handleRemoveCart} />)}
      </div>
      <div className="saveCart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link className="proced-link" to="/checkout">
            <button className='btn-processed'>
            <span style={{fontSize:'1rem'}}>Proceed Checkout</span>
            <FontAwesomeIcon icon={faCreditCardAlt} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
