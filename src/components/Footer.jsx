import React from 'react';

export default function Footer(){

  return(
    <footer className="footer">
      <p className="footer__title">&copy; {new Date().getFullYear()} DenisZыkov - Mesto Russia </p>
    </footer>
  )
}