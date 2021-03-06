import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NotAuthButtons from './components/NotAuthButtons';
import AuthButtons from './components/AuthButtons';
import classes from './Header.module.css';

const Header = () => {
  const isAuth = useSelector(({ isAuth }) => isAuth);

  return (
    <header className={classes.header}>
      <Link to="/articles">
        <h1>RealWorld Blog</h1>
      </Link>
      {!isAuth ? <AuthButtons /> : <NotAuthButtons />}
    </header>
  );
};

export default Header;
