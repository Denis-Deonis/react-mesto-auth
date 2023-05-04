import logo from '../images/header/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMobileMenu from './HeaderMobileMenu';

export default function Header(props) {
  return(
    <>
      <header className='header header__container'>
        <a href="foo" target="_self">
          <img className='header__logo' src={logo} alt='логотип сервиса Mesto' />
        </a>        
        <nav className="header__auth">
          <p className="header__text">{props.email}</p>
          <Link
            to={props.route}
            className="header__link"
            type="button"
            onClick={props.onClick}
          >
            {props.title}
          </Link>
        </nav>
      </header>
      <HeaderMobileMenu
        email={props.email}
        handleLogout={props.onSignOut}
        isMobileMenuOpen={props.isMobileMenuOpen}
      />
    </>
  )
}
