import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ava from '../../../img/ava.png';
import { logOut } from '../../../redux/action/actionCreator';
import classes from '../Header.module.css';

const NotAuthButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { username, logo } = useSelector(({ username, logo  }) => ({ username, logo }));

  const onClick = () => {
    dispatch(logOut());
  };
  const onNewClick = () => {
    dispatch()
    navigate('/new-article')
  }
  return (
    <div className={classes.buttons}>
      <Link to="/new-article" onClick={onNewClick}>
        <button type="button" className={classes['create-article']} >
          CreateArticle
        </button>
      </Link>
      <Link to="/profile">
        <div className={classes.profile}>
          <span className={classes['profile-name']}>{username}</span>
          <img src={logo || ava} alt="logo" className={classes['profile-image']} />
        </div>
      </Link>
      <button type="button" className={classes['log-out']} onClick={onClick}>
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default NotAuthButtons;
