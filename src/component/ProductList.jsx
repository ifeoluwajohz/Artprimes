import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import  axios  from  "axios";
import { useParams } from "react-router-dom"
import { useCart } from "../context/Cart"
import '../css/product.css'
import Logo from '../img/home_decors.jpg'


const ProductList = () => {
  const { category, productId } = useParams();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const { CartItems, addItem, ShipNow } = useCart()
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://artprimes-backend.onrender.com/product?searchTerm=${category}`);
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products:', error.message);
      } 
      setLoading(false);
    };
  
      fetchData();

  }, [category])

  const handleAddItem = (product) => {
    const productId = product._id;
    const quantity = 1

    addItem(productId, quantity); 

  }
  const addFavorite = () =>{
    alert('hello world removed from favorites')
  }
  return (
    <div>
      <h2>{category} category</h2>
      { loading ? (
        <p>Loading ...</p>
      ): products.length > 0 ? (
      <div className="product-list flex">
        {products.map((product) => (
          <div className="product-link" key={product._id}>
            <Link className="product-img" to={`/products/${category}/${product._id}`}>
              <img src={Logo} alt="" />
            </Link>
            <div className="list-detail">
              <h2 className="p-name">{product.ProductName}</h2>
              <span className="p-price">$ {product.ProductPrice}</span><br/>
              { favorites ?
                <p key={product._id}  onClick={() => addFavorite()} >remove from favorites</p>
                :
                <p key={product._id} onClick={() =>setFavorites(!favorites)} >add to favorites</p>
              }
              <div className="product-link" >
                <button onClick={() => handleAddItem(product)} className="p-cart button-dark">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
        
      </div>
      ) : (
        <p>{error && <span className='error'>{error}</span>}</p>
      )}
    </div>
  )
}

export default ProductList