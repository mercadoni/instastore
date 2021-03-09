import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logo from '../../images/logo.png'

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

return (
    <header>
      <div className='navbar insta-color'>
        <Container className='navbar__brand' fluid>
          <Link to='#' className='navbar__bars'>
            <IoIcons.IoIosMenu onClick={showSidebar} />
          </Link>
          <Link to='/'>
            <img src={Logo} alt="Logo" className='logo'/>
            {/* <h2>INSTASTORE</h2> */}
          </Link>
        </Container>
      </div>
      {sidebar && <div className='navbar__mask'/>}
      <nav className={sidebar ? 'navbar__menu active' : 'navbar__menu'}>
        <ul className='navbar__items'>
          <li className='navbar__text' onClick={showSidebar}>
            <Link to='/'>
              <IoIcons.IoIosHome />
              <span>Home</span>
            </Link>
          </li>
          <li className='navbar__text' onClick={showSidebar}>
            <Link to='/stores'>
              <AiIcons.AiFillShop />
              <span>Stores</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar
