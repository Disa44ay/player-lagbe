import React, { useContext } from "react";
import "./Cart.css";
import { Storecontext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, item_list, removeFromCart, getTotalCartAmount } = useContext(Storecontext);

  const navigate = useNavigate();
  /* Calculate the total price
  const calculateTotalPrice = () => {
    let total = 0;
    item_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total.toFixed(2); // Format the total to 2 decimal places
  };*/

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {item_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-toatal-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-toatal-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-toatal-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick = {()=>navigate('/order')}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
