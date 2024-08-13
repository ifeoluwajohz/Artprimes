import { useState } from 'react'
import { Link } from "react-router-dom"
import NavbarLink from './NavbarLink.jsx'
import All from './All.jsx'
import Cart from '../Orderandshipping/Cart.jsx'
import SearchBar from './SearchBar.jsx'
import { useAuthContext } from '../utilsHook/useAuthContext'
import { useLogout } from '../utilsHook/useLogout'
import LOGO from '../icons/LOGO.svg'
import Avatar from '../icons/avatar.svg'
import Likes from '../icons/likes.svg'
import Search from '../icons/search-icon.svg'
import CartImg from '../icons/trolley.svg'
import category from '../icons/category.svg'
import '../css/navbar.css'



const Navbar = () => {
  const [search, setSearch] = useState(false)
  const [category_link, setCategory_link] = useState(true)
  const [all_category, setAll] = useState(false)
  const [account_info, setAccount_info] = useState(false)
  const [openCart, setOpenCart] = useState(false);
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div className='navbar-container'>
      <div className="container">
        <div className='flex-left'>
          <Link to="/"><h2>Artprimes</h2></Link>
          <div onClick={() =>setAll(!all_category)} className='categories'>
            <img src={category} />
            <p className='todays-deal'>All</p>
          </div>
          <div className='categories'>
            <img src={Likes} />
            <Link className='todays-deal' to='/'>Categories</Link>
          </div>
        </div>

        <div className='flex-right'>
          {user && (
            <div className='right'>
              <div>
                <img onClick={() =>setSearch(!search)} className='search-icon' src={Search} alt='Artprimes-logo'/>
              </div>
              <img onClick={() =>setAccount_info(!account_info)} className='avartar' src={Avatar} alt='Artprimes-isLogedin'/>
              { account_info &&
                <div className='loggedin'>
                {user ? <Link to='/Settings'><p>account info</p></Link>: <Link to='/Login'>Login</Link>}
                {user ? <Link to='/Account_management'><p>order</p></Link>: ''}
                {user ? <p onClick={handleClick}>logout</p>: ''}
                <p onClick={() =>setAccount_info(!account_info)}  className="cancel">x</p>
              </div>
              }
              <Link to="/settings"><img src={Likes} className='likes'alt='Artprimes-favourites'/></Link>
              <Link to='/dashboard/cart' onClick={() =>setOpenCart(!openCart)}><img src={CartImg} alt='Artprimes-cart'/></Link>
            </div>
          )}



          {/** If No User Exist */}
          {!user && (
            <div className='right'>
              <div>
                <img onClick={() =>setSearch(!search)} className='search-icon' src={Search} alt='Artprimes-logo'/>
              </div>
              <img onClick={() =>setAccount_info(!account_info)} className='avartar' src={Avatar} alt='Artprimes-isLogedin'/>
              { account_info &&
                <div className='loggedin'>
                {user ? <Link to='/Account_management'><p>account info</p></Link>: <Link to='/Login'><p>Login</p></Link>}
                <Link to='/Account_management'><p>Order</p></Link>
                {user ? <p onClick={handleClick}>logout</p>: ''}
                <p onClick={() =>setAccount_info(!account_info)} className="cancel">x</p>
              </div>
              }
              <Link to="/Login"><img src={Likes} className='likes' alt='Artprimes-favourites'/></Link>
              <Link to="/Login"><img src={CartImg} alt='Artprimes-cart'/></Link>
            </div>
          )}
        </div>
      </div>
      { search && <SearchBar /> }
      {all_category && <All />}
      <div className='categories'>
        <div>
          <img src={category} />
          <p onClick={() =>setCategory_link(!category_link)} className='categories-link'>All Categories</p>
        </div>
          {category_link && <div onClick={() =>setCategory_link(!category_link)} className='cancel'>X</div>}
      </div>
      {category_link && <NavbarLink />}
      {openCart && <Cart />}

    </div>
  )
}

export default Navbar