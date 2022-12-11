import React, { useEffect, useState } from 'react'
import "../styles/Cart.css"
import CartItem from './CartItem'


 function Cart({ cart, removeItem, handleChange }) {
  const [price, setPrice] = useState(0)

  function handlePrice() {
    let total = 0
    { cart.map((item) => (total += item.price * item.quantity)) }
    setPrice(total)
  }

  useEffect(() => {
    handlePrice()
  })
  return (
    <div>
      {cart.length === 0 && 
        <div className="cart">
          <h1 className='welcome-to-cart'>Nothing in your cart, it's empty</h1>
        </div>
      }
      {cart.length > 0 &&
        <div className='cart'>
          <h1>Property shortlist</h1>
          {cart.map((item, index) =>
            <CartItem item={item} removeItem={removeItem} key={index} handleChange={handleChange} />
          )}
          <hr />
          <div className='net'>
            <div></div>
            <div></div>
            <div></div>
            <div className='checkout'>
              <h1>$ {price}</h1>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Cart;
