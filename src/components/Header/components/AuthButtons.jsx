import React from 'react';
import { Link } from 'react-router-dom';

import classes from '../Header.module.css';

const AuthButtons = () => (
  <div className={classes.buttons}>
    <Link to="sign-in">
      <button type="button" className={classes['sign-in']}>
        Sign In
      </button>
    </Link>
    <Link to="sign-up">
      <button type="button" className={classes['sign-up']}>
        Sign Up
      </button>
    </Link>
  </div>
);

export default AuthButtons;
