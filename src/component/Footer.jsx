import { Link } from 'react-router-dom'
import Logo from '../icons/LOGO.svg'
import Likes from '../icons/react.svg'

import '../css/navbar.css'



const Footer = () => {
  return (
    <div className="footer-container">
        <div className='footer-flex'>
            <div className='about-us'>
                <h4>ARTPRIMES FASHION</h4>
                    <div className='flex-1'>
                    <div className='logo'>
                        <img src={Logo} alt="Artprimes-logo" />
                    </div>
                    <div className='about_social'>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus porro voluptatum a fuga ullam. Odit, perspiciatis.</span>
                        <div className='social-img'>
                        <img className='social-links' src={Likes} alt="" />
                        <img className='social-links' src={Likes} alt="" />
                        <img className='social-links' src={Likes} alt="" />
                        <img className='social-links' src={Likes} alt="" />
                        </div>
                    </div>
                    </div>
            </div>
            <div className='flex-2'>
                <div className='Address'>
                    <h4>ADDRESS</h4>
                    <Link><p>Company Address</p></Link>
                    <Link><p>Privacy policy</p></Link>
                    <Link><p>Company Number</p></Link>
                    <Link><p>Company Email</p></Link>
                </div>
                <div className='Collection'>
                    <h4>COLLECTION</h4>
                    <Link><p>Frames</p></Link>
                    <Link><p>Curtains</p></Link>
                    <Link><p>Beddings</p></Link>
                    <Link><p>Office Equipments</p></Link>
                </div>
            </div>
            <div className='flex-3'>
                <div className='Site'>
                    <h4>SITE</h4>
                    <Link><p>Terms of Service</p></Link>
                    <Link><p>Privacy policy</p></Link>
                    <Link><p>About-us</p></Link>
                    <Link><p>Suport</p></Link>
                </div>
                <div className='Shop'>
                    <h4>Shop</h4>
                    <Link><p>About-us</p></Link>
                    <Link><p>Contact</p></Link>
                    <Link><p>About-us</p></Link>
                    <Link><p>About-us</p></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer