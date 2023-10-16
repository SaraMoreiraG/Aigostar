import React from 'react'

import logo from '../../assets/images/logo-black.png'
import './navbar.css'

function NavBar() {
  return (
	<div className='nav-bar'>
		<img src={logo} alt='aigostar logo' />
	</div>
  )
}

export default NavBar
