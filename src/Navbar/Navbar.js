import './Navbar.css';
import { useState } from 'react';
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div>
      <ul>
        <Link to="/" style={{textDecoration:"none"}}>
        <h1 id="splash-nav-h1">Deeinder</h1>
        </Link>

        <div id="splash-nav-links">
          <p><Link to="/AboutUs">About Us</Link> | <Link to="/T&Cs">Terms&Conditions</Link> | <Link to="/PrivacyPolicy">Privacy Policy</Link></p>
        </div>
        <Link to="/Login"><button id="splash-nav-login">Log In</button></Link>
      </ul>

     
    </div>
  )
}

export default Navbar

