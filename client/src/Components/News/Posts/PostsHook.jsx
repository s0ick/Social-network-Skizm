import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Post from '../../Profile/MyPosts/Posts/Post';
import style from '../News.module.css';
import { uniqueAuthor } from '../../../Utils/Helper/helper';

const PostsHook = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const authors = [];

  const tags = props.tags;

  useEffect(() => {
    if(fetching) {
      const url = `http://127.0.0.1:8000/api/reactive/users/get_posts_in_feed/?page=${currentPage}`;
    
      Axios
        .post(url, {tags})
        .then(response => {
          if(response.data.count > 0) {
            setPosts([...posts, ...response.data.data]);
            setCurrentPage(prevState => prevState + 1);
            setTotalCount(response.data.count);
          }
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, tags]);

  useEffect(() => {
    const appWrapperContent = document.querySelector('.app-wrapper-content');
    appWrapperContent.addEventListener('scroll', scrollHandler);

    return function () {
      appWrapperContent.removeEventListener('scroll', scrollHandler);
    };
  }, [posts, totalCount]);

  

  useEffect(() => {
    posts.forEach(elem => {

      let obj = {
        author: elem.author,
        avatarURL: elem.avatarURL,
        backgroundURL: elem.getBackground,
        pk: elem.pk,
      };
      authors.push(obj);
    });
    props.setAuthor(uniqueAuthor(authors));
  }, [posts]);

  const scrollHandler = (event) => {
    if(event.target.scrollHeight - (event.target.scrollTop + window.innerHeight) < 100
      && posts.length < totalCount) {
        setFetching(true);
      }
  };


  return (
    <div>
      {
        (
          posts.length === 0 ? <h3 className={style.null}>No posts found. Add tags or follow someone</h3> :
            posts.map(p => <Post pk={p.pk}
              key={`post_${p.pk}`} 
              message={p.text} 
              photoURL={p.imgURL} 
              tags={p.tags} 
              avatar={p.avatarURL} 
              author={p.author} 
              date ={p.date}
              likeCount="0" />)
        )
      }
    </div>
  )
}
export default PostsHook;