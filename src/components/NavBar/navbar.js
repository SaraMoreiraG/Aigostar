import React from 'react'
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo-black.png'
import './navbar.css'

function NavBar() {
  return (
	<div className='nav-bar'>
		<img src={logo} alt='aigostar logo' />
	<Link to="/shopping-cart">Cart</Link>

	</div>
  )
}

export default NavBar
