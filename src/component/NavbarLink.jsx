import { Link } from "react-router-dom"
import category from '../icons/category.svg'
import trolley from '../icons/trolley.svg'
import react from '../icons/react.svg'
import likes from '../icons/likes.svg'
import '../css/navbar.css'



const NavbarLink = () => {
  const links = [
    {linkName: "Lightings", img: trolley, url: "/products/lightings", id: 1},
    {linkName: "Electronics",img: react, url: "/products/electronic", id: 2},
    {linkName: "Bakes", img: category, url:"/products/bakes", id: 3},
    {linkName: "Frames", img: trolley, url: "/products/home decors", id: 4},
    {linkName: "Office tools", img: likes, url: "/products/Office tools", id: 5},
    {linkName: "drinks", img: react, url:"/products/drink", id: 6},
    {linkName: "Computers", img: likes, url: "/products/tech", id: 7},
    {linkName: "Best of home decors", img: category, url: "/products/home decors", id: 8}
  ];
  return (
    <div className='nav-link'>
        {links.map(link =>{
            return ( <li key={link.id}>
              <img src={link.img} />
              <Link to={link.url}>{link.linkName}</Link>
            </li>)
        })}
        
    </div>
  )
}

export default NavbarLink