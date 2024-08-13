import { Link } from "react-router-dom"
import { useState } from "react"

import '../css/navbar.css'


const All = () => {
const [open, setOpen] = useState(true)

  return (
    <div>
      { open && 
        <div className="all-links">
        <div className="cancel">
          <p onClick={() =>setOpen(!open)} >X</p>
        </div>
        <h1>All Categories</h1>
        <div className="links-link">
          <Link to='/products/Office tools'><p>Office Equipments</p></Link>
          <Link to='/products/electronic' ><p>Electronic</p></Link>
          <Link to='/products/Home Decor' ><p>Home Decors</p></Link>
          <Link to='/products/lightings' ><p>Lightings</p></Link>
          <Link to='/products/tech' ><p>Tech tools</p></Link>
          <Link to='/products/drink' ><p>Breverages</p></Link>
          <Link to='/products/bakes'><p>Bakes</p></Link>
        </div>
      </div>
      }
    </div>
  )
}

export default All