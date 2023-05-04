import React from 'react';

export default function HeaderMobileMenu(props) {

  return (
    <div className={`header__mobile-menu ${props.isMobileMenuOpen && "header__mobile-menu_opened"}`}>
      <h2 className="header__mobile-menu_email">{props.email}</h2>
      <input 
        className="header__mobile-menu_exit"
        type="button"
        onClick={props.handleLogout}
        value="Выйти"
      />        
    </div>
  )
}