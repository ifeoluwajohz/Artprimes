import { useState, useEffect, useContext } from "react"
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/Cart"
import axios from "axios";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import '../css/carts.css'

import Logo from '../img/home_decors.jpg'

const Cart = () => {
  const { category, productId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()
  const { CartItems, addItem, reduceOne, removeItem, clearCart, ShipNow } = useCart()
  const userId  = user.email.userId;
  
  const [ quantity, setQuantity ] = useState(1)

  const totalprice = CartItems.reduce((total, product) => total + parseFloat(product.productPrice * product.productQuantity), 0)

  const handleRemoveItem = (ProductId) => {
    removeItem(ProductId)
  }

  const addToOne = async (product) => {
    const userId = user.email.userId;
    const productId = product.productId
    const quantity = 1;
    addItem(productId, quantity);   
  }


  const minusOne = async (product) => {
    const userId = user.email.userId;
    const productId = product.productId
    reduceOne(productId, quantity)

  }

  return (
    <div id='main-cart'>
      <h2>SUBTOTAL     ${totalprice.toLocaleString()}</h2>
      { loading ? (
        <p>Loading ...</p>
      ): CartItems.length > 0 ? (
      <div className="products-list">
        {CartItems.map((product) => (
          <div id="individual" key={product.productId}>
            
            <Link className="products-link flex1" key={product.productId} to={`/products/drink/${product.productId}`} >
              <div className="product-img">
                <img src={Logo} alt="" />
              </div>
            </Link>
            
            <div>
              <Link className="products-link" key={product.productId} to={`/products/drink/${product.productId}`}>
                  <p className="c-name">{product.productName}</p><br/>
                  <p className="c-price">$ {parseFloat(product.productPrice).toLocaleString()} <span>per unit</span></p>
              </Link>

              <div className=" flex1 quantity">
                <div className=" btns">
                  {
                    product.productQuantity <= 1 ?
                  <p className="cq-minus btn">-</p>:
                  <p onClick={() => minusOne(product)} className="cq-minus btn">-</p>  
                  }
                  <p className="c-quantity">{product.productQuantity}</p>
                  <p onClick={() => addToOne(product)} className="cq-add btn">+</p>
                </div>
                <span onClick={()=> handleRemoveItem(product)}>remove</span>

            </div>
            </div>
          </div>
        ))}
      </div>

      ) : (
        <p>No Products found in the cart category</p>
      )}
      <button className='c-cart button-d'>{CartItems.length > 0 ? `Checkout $${totalprice.toLocaleString()}` : ''} </button>
      <button onClick={() => clearCart()}>  {CartItems.length > 0 ? 'Clear cart' : ''}</button>
    </div>
  )
}

export default Cart
