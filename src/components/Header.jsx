import logo from "../images/header/logo.svg";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import HeaderMobileMenu from "./HeaderMobileMenu";
import closeMenuIcon from "../images/header/Close-IconMobile.png";
import burgerMenu from "../images/header/burgerMenu.svg";

export default function Header(props) {
  const location = useLocation();
  return (
    <>
      <HeaderMobileMenu
        email={props.email}
        handleLogout={props.onSignOut}
        isMobileMenuOpen={props.isMobileMenuOpen}
      />
      <header className="header header__container">
        <a href="foo" target="_self">
          <img
            className="header__logo"
            src={logo}
            alt="логотип сервиса Mesto"
          />
        </a>

        {location.pathname === "/sign-in" && (
          <div className="header__user-info">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </div>
        )}
        {location.pathname === "/sign-up" && (
          <div className="header__user-info">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </div>
        )}
        {location.pathname === "/" && (
          <div className="header__user-info header__user-info_disabled">
            <p className="header__email">{props.email}</p>
            <Link
              to="/sign-in"
              className="header__link"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        )}

        {props.isLoggedIn && (
          <button
            className="header__burger"
            type="button"
            onClick={props.handleClickOpenMobileMenu}
            style={{
              backgroundImage: `url(${
                props.isMobileMenuOpen ? closeMenuIcon : burgerMenu
              })`,
            }}
          />
        )}
      </header>
    </>
  );
}
