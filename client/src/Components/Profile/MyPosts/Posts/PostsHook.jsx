import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Post from './Post';

const PostsHook = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if(fetching) {
      const url = `http://127.0.0.1:8000/api/reactive/users/get_posts/${props.username}?page=${currentPage}`;
    
      Axios
        .get(url)
        .then(response => {
          setPosts([...posts, ...response.data.data]);
          setCurrentPage(prevState => prevState + 1);
          setTotalCount(response.data.count);
          
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    const appWrapperContent = document.querySelector('.app-wrapper-content');
    appWrapperContent.addEventListener('scroll', scrollHandler);

    return function () {
      appWrapperContent.removeEventListener('scroll', scrollHandler);
    };
  }, [posts, totalCount]);

  const scrollHandler = (event) => {
    if(event.target.scrollHeight - (event.target.scrollTop + window.innerHeight) < 100
      && posts.length < totalCount) {
        setFetching(true);
      }
  };
  return (
    <div>
      {
        posts.map(p => <Post pk={p.pk}
          key={`post_${p.pk}`}  
          message={p.text} 
          photoURL={p.imgURL} 
          tags={p.tags} 
          avatar={p.avatarURL} 
          author={p.author} 
          date ={p.date}
          likeCount="0" />)
      }
    </div>
  )
}
export default PostsHook;