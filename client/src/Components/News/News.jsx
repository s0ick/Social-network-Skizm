import React from 'react';
import style from './News.module.css';
import Preloader from '../common/Preloader/Preloader';
import PostsHook from './Posts/PostsHook';
import NewsForm from './form/NewsForm';
import Author from './Authors/Author';

const News =  React.memo(({fetching, tags, authors, username, updateFetching, updateTags, setAuthor, match}) => {
  const onSubmit = (formData) => {
    updateFetching(true);
    const { tagsForSearch } = formData;

    updateTags(tagsForSearch.replace(/\s+/g, ' ').trim(), username);
  };


  return (
    <div className={style.block}>
      {
        fetching ? 
        <div className={style.fetching}><Preloader /></div> : 
        <PostsHook tags={tags} setAuthor={setAuthor} username={match.params.login} login={username} />
      }
      <NewsForm onSubmit={onSubmit} tags={tags} />
      <div className={style.container}>
        <div className={style.slick}>
          <h3 className={style.title}>Авторы постов</h3>
          
          {
            authors && authors.map(elem => {
              return <Author key={`author_${elem.pk}`} author={elem.author} avatarURL={elem.avatarURL} backgroundURL={elem.backgroundURL} />
            })
          }

        </div>
      </div>

    </div>
  );
});

export default News;