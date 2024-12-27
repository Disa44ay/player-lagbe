import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id = 'footer'>
        <div className="footer-content">

            <div className="footer-content-left">
                <img src={assets.logo_new_t_bg} className= "logo" alt="Logo" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam earum velit, est et quod modi consectetur pariatur dolores quo a ut aperiam maxime nobis ex necessitatibus molestiae accusantium distinctio asperiores!</p>
                <div className='footer-social-items'>
                    <img src={assets.logo_fb} alt="" />
                    <img src={assets.logo_x} alt="" />
                    <img src={assets.logo_linked_in} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>privacy policy</li>
                </ul>

            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+880-90-112-45</li>
                    <li>contact@PlayerLagbe.com</li>
                </ul>
            </div>
        </div>
      <hr />
      <p className="footer-copyright">
        copyright 2024 © PlayerLagbe.com - All Right Reserved
      </p>
    </div>
  )
}

export default Footer
