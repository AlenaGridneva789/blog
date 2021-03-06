import React, { useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Popconfirm, Button, Spin } from 'antd';

import Avatar from '../Avatar/Avatar';
import Tag from '../Tag/Tag';
import Like from '../Like/Like';
import { deletePost, getFullArticle } from '../../redux/action/actionCreator';

import classes from './FullArticle.module.css';


const ArticleFull = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = useLocation()


  const { slug } = useParams();
  const { fullArticle, isAuth, token, isDeleteItem } = useSelector(({ fullArticle, isAuth, token, isDeleteItem }) => ({
    fullArticle,
    isAuth,
    token,
    isDeleteItem,
    
  }));
  
  useEffect(() => {
    
    if (isAuth && !isDeleteItem ) {
      dispatch(getFullArticle(slug, token));
     
    } else if (!isAuth && !isDeleteItem) {
      dispatch(getFullArticle(slug));
    }
    if (isDeleteItem) {
      navigate('/articles');
    }
   
  }, [slug, isAuth, isDeleteItem, pathname]);
  
  const confirmDelete = () => {
    dispatch(deletePost(slug, token));
  };

  return !fullArticle.articleLoaded ? (
    <div className={classes.list}>
      <div className={classes.wrapper}>
        <h5 className={classes.title}>{fullArticle.title}</h5>
        <Like favorited={fullArticle.favorited} slug={fullArticle.slug} favoritesCount={fullArticle.favoritesCount} />
        <Avatar author={fullArticle.author.username} image={fullArticle.author.image} date={fullArticle.createdAt} />
      </div>
      <div className={classes['tags-wrapper']}>
        {fullArticle.tagList &&
          fullArticle.tagList.map((element) => {
            if (element.trim()) {
              return (
                <Tag key={uuid()} className={classes.tags}>
                  {element}
                </Tag>
              );
            }
            return null;
          })}
      </div>

      <div className={classes.container}>
        <p className={classes.descr}>{fullArticle.description}</p>
        {isAuth && fullArticle.author.username === JSON.parse(localStorage.getItem('user')).username ? (
          <>
            <Popconfirm
              placement="rightTop"
              title="???????????????"
              onConfirm={confirmDelete}
              okText="????"
              cancelText="??????"
              className={classes['button-delete-notification']}
            >
              <Button className={classes['button-delete']} danger>
                Delete
              </Button>
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`}>
            <Button className={classes['button-edit']}  >Edit</Button>
            </Link>
          </>
        ) : null}
      </div>
      <div className={classes.info}>
         <ReactMarkdown className={classes.text} remarkPlugins={[gfm]}>
          {fullArticle.body}
        </ReactMarkdown>
      </div>
    </div>
  ) : (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  );
};

export default ArticleFull;
