import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import "./Cart.css";
const Cart = ({ cart,handleClearCart,children}) => {
  let totalPrice = 0;
  let totalShipping = 0;
  let totalTax = 0;
  let grandTotal = 0;
  let quantity = 0
  for (const product of cart) {
    if (product.quantity === 0) {
      quantity = product.quantity = 1
    }
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    totalTax = (totalPrice * 7) / 100; //Every product tax added for 7%
    grandTotal = totalPrice + totalShipping + totalTax;
    quantity = product.quantity + quantity
  }
  return (
    <div className="cart">
      <h3>Order Summary</h3>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping Charge: ${totalShipping}</p>
      <p>Tax: ${totalTax.toFixed(2)}</p>
      <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
      {cart.length>0?<button className='btn-clear-cart' onClick={()=>handleClearCart()}>
        <span>
          Clear Cart
        </span>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>:<button className='btn-clear-cart'>
        <span>
          Clear Cart
        </span>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>}
      {children}
    </div>
  );
};

export default Cart;
