import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import '../css/navbar.css'
import Search from '../icons/search-icon.svg'



const SearchBar  = () => {
  const [open, setOpen] = useState(true)
  const [error, setError] = useState(null)
    const [searchTerm, setInput] = useState('')
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://artprimes-backend.onrender.com/product?searchTerm=${searchTerm}&Limit=2`);
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products:', error.messgae);
    }
    setLoading(false);
  };

    fetchData();
  }, [searchTerm]);
        

  return (
    <div className='main-search'>
        { open &&
          <div className='search'>
            <div className="search-container">
          <p>What are you looking for today?</p>
          <div className="search-flex">
            <input required type="search" placeholder='search ...' name="search" onChange={(e)=>setInput(e.target.value)} value={searchTerm} className="search-input" />
            {searchTerm ? 
              <button className="search-cancel">Search</button> :
              <button onClick={() =>setOpen(!open)} className="search-cancel">cancel</button>
            }
          </div>
          { !searchTerm ? 
            <div className="trending-links">
              <p>TRENDING SEARCHES</p>

              <Link className='trend-flex' to='products/furniture'>
                  <img src={Search} alt="" />
                  <p>Furniture</p>
              </Link>
              <Link className='trend-flex' to='products/drink'>
                  <img src={Search} alt="" />
                  <p>Drinks</p>
              </Link>
              <Link className='trend-flex' to='products/Home Decors'>
                  <img src={Search} alt="" />
                  <p>Home Decorations</p>
              </Link>

            </div> : 
            <div>
              {loading ? (
                <div>
                  <Skeleton count={5} height={50} />
                </div>
              ) : products.length === 0 ? (
                <p>{error && <span className='error'>{error}</span>}</p>

              ) : (
                <div>
                  <h4>Products ...</h4>
                  {products.map((product) => (
                    <Link id='trend-flex' to={`/products/${searchTerm}/${product._id}`} key={product._id}>
                      <img src={Search} alt="" />
                      <p>{product.ProductName}</p>
                      <span>{product.ProductDetail}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          }
        </div>
          </div>
        }
    </div>
  )
}

export default SearchBar

