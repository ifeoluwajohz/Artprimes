import { Link } from "react-router-dom"
import Logo from '../img/home_decors.jpg'

import '../css/product.css'


const Category = () => {
  return (
    <div className="fluid-category">
        <h2>Category</h2>
        <div className="main-category flex">
          <Link className='category' to='/products/Tech'>
            <img  src={Logo} alt="" />
            <p>Electronics</p>
          </Link>
          <Link className='category' to='/products/drink'>
            <img src={Logo} alt="" />
            <p>Drink</p>
          </Link>
          <Link className='category' to='/products/furniture'>
            <img src={Logo} alt="" />
            <p>Furniture</p>
          </Link>
          <Link className='category' to='/products/home decors'>
            <img src={Logo} alt="" />
            <p>Home Decors</p>
          </Link>
          <Link className='category' to='/products/office tools'>
            <img src={Logo} alt="" />
            <p>Office tools</p>
          </Link>
          <Link className='category' to='/products/bakes'>
            <img src={Logo} alt="" />
            <p>Bakes</p>
          </Link>
          <Link className='category' to='/products/lightings'>
            <img src={Logo} alt="" />
            <p>Lightings</p>
          </Link>
        </div>
    </div>
  )
}

export default Category