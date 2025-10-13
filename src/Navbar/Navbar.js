import './Navbar.css';
import { useState } from 'react';
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div>
      <ul>
        <h1 id="splash-nav-h1">Deeinder</h1>

        <div id="splash-nav-links">
          <p><Link>About Us</Link> | <Link>Terms&Conditions</Link> | <Link>Privacy Policy</Link></p>
        </div>
        <Link to="Login"><button id="splash-nav-login">Log In</button></Link>
      </ul>

     
    </div>
  )
}

export default Navbar

