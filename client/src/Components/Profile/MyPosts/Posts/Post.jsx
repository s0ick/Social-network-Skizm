import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import style from'./Post.module.css';
import userImg from '../../../../assets/images/user_null.png';
import { LikeIcon, CommentIcon } from '../../../common/Icons/Icons';
import { formatDate } from '../../../../Utils/Helper/helper';
import CommentHook from './Comment/CommentHook';

const Post = (props) => {
  const [ fetching, setFetching ] = useState(true);
  const [ like, setLike ] = useState(false);
  const [ likeCount, setLikeCount ] = useState(props.likeCount);
  const [ commentCount, setCommentCount ] = useState(props.commentCount);
  const [ commentPanel, setCommentPanel ] = useState(false);

  useEffect(() => {
    if(fetching) {
      const url = `http://127.0.0.1:8000/api/reactive/users/check_like/${props.login}?id=${props.pk}`;

      Axios
        .get(url)
        .then(response => {
          if(response.status === 200) {
            setLike(response.data.flag);
          }
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);


  const deletePost = () => {
    props.deletePost(props.pk);
  };

  const editPost = () => {
    props.setEdit(prevState => !prevState);
    props.setPostContent({
      id: props.pk,
      text: props.message,
      tags: props.tags,
      photoURL: props.photoURL
    });
  };

  const likePost = () => {
    if(!like) setLikeCount(prevState => ++prevState);
    else setLikeCount(prevState => --prevState);
    
    props.likePost(props.pk, props.login);
    setLike(prevState => !prevState);
  };

  const sendComment = (value) => {
    setCommentCount(prevState => ++prevState);
    props.commentPost(props.pk, props.login, value);
  };

  return (
    <div className={style.item} id={`post_id_${props.pk}`}>
      <div className={style.row}>
        <div className={style.left}>
          <div className={style.ava}>
            <img className={style.img} src={!!props.avatar ? props.avatar : userImg} alt="ava"/>
          </div>
          <span className={style.author}>{props.author}</span>
        </div>
        
        <div className={style.right}>
          { props.login === props.username && 
            <div className={style.container}>
              <button className={style.action} onClick={deletePost}>Удалить</button>
              <button className={style.action} onClick={editPost}>Изменить</button>
            </div>
          }
        </div>
      </div>
        
      <div className={style.content}>
        {
          props.photoURL && <div className={style.parent}><img src={props.photoURL} alt={`img_post_${props.pk}`} className={style.image} /></div>
        }

        <p className={style.message}>{props.message}</p>
        <p className={style.tags}>{props.tags}</p>

        <div className={style.footer}>

          <span className={style.date}>{formatDate(props.date)}</span>

          <div className={style.actions}>
            <span onClick={() => setCommentPanel(prevState => !prevState)} className={style.comment}>
              {commentCount}
              <CommentIcon 
                width={18} 
                height={18} 
                fill={'#acacac'} 
                stroke={'#acacac'} 
              />
            </span>
            <span onClick={likePost} className={style.like}>
              {likeCount}
              <LikeIcon 
                width={18} 
                height={18} 
                fill={like ? '#ff1744': 'none'} 
                stroke={like? '#ff1744' : '#acacac'} 
              />
            </span>
          </div>

        </div>

        { 
          commentPanel && <CommentHook id={props.pk} sendComment={sendComment} login={props.login} />
        }

      </div>  
    </div>
  )
}
export default Post;