import logo from '../images/header/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return(
    <header className='header'>
      <img className='header__logo' src={logo} alt='логотип сервиса Mesto' />
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
  )
}
