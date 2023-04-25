import React from 'react';

export default function Footer(){

  const dt = new Date();
  const year = dt.getFullYear();


  return(
    <footer className="footer">
      <p className="footer__title">&copy; {year} DenisZыkov - Mesto Russia </p>
    </footer>
  )
}