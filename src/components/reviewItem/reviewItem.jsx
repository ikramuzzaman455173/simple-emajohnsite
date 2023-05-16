import React from 'react';
import "./reviewItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const OrderItem = ({ product,handleRemoveCart }) => {
  // console.log(`product`, product);
  const { _id, name, price, img, quantity } = product

  return (
    <div className='review-item'>
      <img src={img} alt="product images" />
      <div className="review-details">
        <p className='product-title'>{name}</p>
        <p>Price: <span className='orange-text'>{price}</span></p>
        <p>Order Quantity: <span className='orange-text'>{quantity}</span></p>
      </div>
      <button className='btn-delete' onClick={()=>handleRemoveCart(_id)}>
        {/* <span> */}
        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
        {/* </span> */}
      </button>
    </div>
  );
};

export default OrderItem;