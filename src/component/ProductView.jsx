import { useState, useEffect, useContext } from "react"
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/Cart"
import { useParams } from "react-router-dom"
import  axios  from  "axios";
import { Link } from "react-router-dom"



import '../css/product.css'
import Logo from '../img/home_decors.jpg'

const ProductView = () => {
    const {category, productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1)
    const { user } = useAuth()
    const [error, setError] = useState(null)
    const { CartItems, addItem, removeOne, reduceOne, clearCart, ShipNow } = useCart()


    //get product details rom server
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://artprimes-backend.onrender.com/productId?productId=${productId}`);
          setProduct(response.data);
        } catch (error) {
          setError('Error fetching products:', error.response.data.error);
        }
        setLoading(false);
      };   
    
  fetchData();
    },[productId])
    const currentCartItem = CartItems.find(item => item.productId === productId);

    const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

  const addToCart = () => {
    const quantity = 1;
    addItem(productId, quantity); 

   }

   const minusOne = async (product) => {
    const userId = user.email.userId;
    const productId = product.productId
  }

   const checkcart = (product) => {
    CartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.productId === productId)
      if (existingItem) {
          if (existingItem.quantity > 1) {
              const updatedItems = prevItems.map(item => 
                  item.productId === productId
                  ? { ...item, quantity: item.quantity - quantity}
                  : item
              );
              CartItems(updatedItems);
              return updatedItems
          } else {
              const updatedItems = prevItems.filter(item => item.productId !== productId);
              CartItems(updatedItems);
          } 
      }
      return prevItems;
  })
   }
    
  return (
    <div className="product-view" >
        {loading ? (
            <p>loading ...</p>
        ) : product ? (
            <div className="product-flex flex">
              <div className="product-img">
                <img src={Logo} alt="" />
              </div>
              <div className="product-info">
                <h4 className="p-name">{product.ProductName}</h4>
                <p className="p-detail">description : {product.ProductDetail}</p>
                <span className="p-price">price : ${product.ProductPrice}</span>
                <p className="p-category">category : {product.Category}</p>
                <div className="purchase flex ">
                  <button className="button-dark">Buy now</button>
                  {!user ? <Link to='/login'><p>Add to cart</p></Link>: 
                  <button onClick={addToCart} className="button-dark">Add to cart</button>

                  }

              </div>
              </div>
            </div>
        ): (
            <p>{error && <span className='error'>{error}</span>}</p>
        )}
    </div>
  )
}

export default ProductView