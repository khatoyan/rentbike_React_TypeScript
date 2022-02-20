import React from 'react';

import classes from './Layout.module.css';

import Logo from './icons/logo.png';
import Copyright from './icons/copyright.svg';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <header className={classes.bar}>
        <div className={classes.header}>
          <img src={Logo} alt="Rent bike" />
        </div>
      </header>
      <main className={classes.content}>{children}</main>
      <footer className={classes.bar}>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </footer>
    </div>
  );
};
