import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';

import Tags from '../Tags/Tags';
import { editableValidation } from '../../validations/validations';
import { createArticle } from '../../redux/action/actionCreator';

import classes from './CreateArticle.module.css';

const CreateArticle = () => {
  const { isAuth, token, error, accountLoaded} = useSelector(
    ({ isAuth, token, error, accountLoaded }) => ({
      isAuth,
      token,
      error,
      accountLoaded,
      
    })
  );
 
  const navigate = useNavigate();
 
  const dispatch = useDispatch();
  const pathname = useLocation()
  const title = JSON.parse(localStorage.getItem('fullarticle'))?.title
  const body = JSON.parse(localStorage.getItem('fullarticle'))?.body
  const description = JSON.parse(localStorage.getItem('fullarticle'))?.description
  const slug = JSON.parse(localStorage.getItem('fullarticle'))?.slug
  const tagList = JSON.parse(localStorage.getItem('fullarticle'))?.tagList
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editableValidation),
    defaultValues: {
      tagList: pathname.pathname==="/new-article" 
        ? 
        [
            {
              name: '',
            },
          ] : tagList?.map((tag) => ({ name: tag }))
      ,
      title: pathname.pathname ==="/new-article" ?  " " : title,
      description:pathname.pathname ==="/new-article" ?  " " : description,
      text:pathname.pathname ==="/new-article" ? " " : body,
    },
  }); 

   useEffect(() => {
   
    if (!isAuth) {
      navigate('/sign-in');
    }
    
    if (pathname.pathname !== "/new-article") {
      
      navigate(`/articles/${slug}/edit` )
    }
    
    if (isAuth && !error && isSubmitSuccessful) {
      navigate('/articles');
    }

  }, [ isAuth, error, isSubmitSuccessful, pathname.pathname ]); 
  

  const onSubmit = (data) => {
    dispatch(createArticle(data.title, data.description, data.text, data.tagList, token, pathname, slug));
    navigate('/articles')
  };

  return (
    
    
    <div className={classes.wrapper}>
      
      <h5 className={classes.title}>{pathname.pathname ==="/new-article" ? 'Create new article' : 'Edit Article'}</h5>
      <div className={classes.spinner}>{!accountLoaded && <Spin size="small" className={classes.spin} />}</div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form} >
        
        <label htmlFor="title" className={classes['form-item']}>
          
          <span className={classes['input-title']}>Title</span>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                id="title"
                type="text"
                className={!errors.title ? classes.input : classes['input-error']} 
                placeholder="Title"
                {...field}
                autoFocus
                
              />
            ) }
          /> 
          <div className={classes['form-error-wrapper']}>
            {errors.title && <span className={classes['form-error']}>{errors.title.message}</span>}
          </div>
        </label> 
        <label htmlFor="description" className={classes['form-item']}>
          <span className={classes['input-title']}>Short description</span>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                id="description"
                type="text"
                className={!errors.description ? classes.input : classes['input-error']}
                placeholder="Title"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.description && <span className={classes['form-error']}>{errors.description.message}</span>}
          </div>
        </label>
        <label htmlFor="text" className={classes['form-item']}>
          <span className={classes['input-title']}>Text</span>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <textarea
                id="text"
                type="text"
                className={!errors.title ? classes['text-input'] : classes['text-input-error']}
                placeholder="Text"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.text && <span className={classes['form-error']}>{errors.text.message}</span>}
          </div>
        </label>
        <div className={classes['tags-wrapper']}>
          <Tags control={control} />
        </div>
        <button type="submit" className={classes['submit-button']}>
          Send
        </button>
      </form>
    </div>
    
  );
};

export default CreateArticle ;
