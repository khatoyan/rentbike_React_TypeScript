import React from 'react';

import classes from './Layout.module.css';

import Logo from './icons/logo.png';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <header className={classes.bar}>
        <div className={classes.header}>
          <img src={Logo} alt="Rent bike" />
        </div>
      </header>
      <main className={classes.content}>
        <h1>Rent bike</h1>
      </main>
      <footer className={classes.bar}>
        <div className={classes.footer}>© 2018</div>
      </footer>
    </div>
  );
};
