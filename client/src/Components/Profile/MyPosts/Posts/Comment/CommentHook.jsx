import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Comment from './Comment';
import CommentForm from '../../Forms/CommentForm';
import { formatDate } from '../../../../../Utils/Helper/helper';
import style from './Comment.module.css';

const CommentHook = (props) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [avatar, setAvatar] = useState('');

  const container = useRef();

  useEffect(() => {
    if(fetching) {
      const url = `http://127.0.0.1:8000/api/reactive/users/get_comment_post_on_id/${props.id}?page=${currentPage}`;
    
      Axios
        .get(url)
        .then(response => {
          setComments([...comments, ...response.data.data]);
          setCurrentPage(prevState => prevState + 1);
          setTotalCount(response.data.count);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    container.current.addEventListener('scroll', scrollHandler);

    return function () {
      container.current.removeEventListener('scroll', scrollHandler);
    };
  }, [comments, totalCount]);

  const scrollHandler = (event) => {
    if(event.target.scrollHeight - (event.target.scrollTop + window.innerHeight) < 100
      && comments.length < totalCount) {
        setFetching(true);
      }
  };

  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/reactive/users/get_avatar/${props.login}`;
    
      Axios
        .get(url)
        .then(response => {
          setAvatar(response.data.avatarURL);
        });
  }, [avatar]);

  const addComment = (value) => {
    setComments([...comments, {
      id: comments.length + 1,
      message: value,
      getAvatarCommentator: avatar,
      username: props.login,
      date: formatDate(new Date())
    }]);
  };

  return (
    <div className={style.comments}>
      <CommentForm sendComment={props.sendComment} addComment={addComment} />
      <div ref={container} className={style.commentsList}>
        {
           comments.map(c => <Comment id={c.id}
            key={`comment_key_${c.id}`}
            message={c.message}
            avatar={c.getAvatarCommentator}
            username={c.username}
            date={formatDate(c.date)}
          />)
        }
      </div>
    </div>
  )
}
export default CommentHook;