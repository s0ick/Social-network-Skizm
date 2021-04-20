import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import style from'./Post.module.css';
import userImg from '../../../../assets/images/user_null.png';
import { LikeIcon } from '../../../common/Icons/Icons';
import { formatDate } from '../../../../Utils/Helper/helper';

const Post = (props) => {
  const [ fetching, setFetching ] = useState(true);
  const [ editPanel, setEditPanel ] = useState(false);
  const [ like, setLike ] = useState(false);
  const [ likeCount, setLikeCount ] = useState(props.likeCount);

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

  const activateEditMode = () => {
    setEditPanel(prevState => !prevState);
  };

  const deletePost = () => {
    props.deletePost(props.pk);
    setEditPanel(false);
  };

  const editPost = () => {
    props.setEdit(prevState => !prevState);
    props.setPostContent({
      id: props.pk,
      text: props.message,
      tags: props.tags,
      photoURL: props.photoURL
    });
    setEditPanel(false);
  };

  const likePost = () => {
    if(!like) setLikeCount(prevState => ++prevState);
    else setLikeCount(prevState => --prevState);
    
    props.likePost(props.pk, props.login);
    setLike(prevState => !prevState);
  };

  let refDate = formatDate(props.date);

  return (
    <div className={style.item} id={`post_id_${props.pk}`}>
      <div className={style.ava}>
        <img className={style.img} src={!!props.avatar ? props.avatar : userImg} alt="ava"/>
      </div>
        
      <div className={style.content}>
        <div className={style.mainLine}>
          <span className={style.author}>{props.author}</span>
          <span className={style.date}>{refDate}</span>
          <div className={style.container}>
            
            { props.login === props.username && 
              <button className={style.button} onClick={activateEditMode}>
                <span className={style.cub}></span>
              </button>
            }
          </div>

          { editPanel &&
            <div className={style.panel}>
              <button className={style.action} onClick={deletePost}>Удалить</button>
              <span className={style.line}></span>
              <button className={style.action} onClick={editPost}>Изменить</button>
            </div>
          }
        </div>
        {
          props.photoURL && <div className={style.parent}><img src={props.photoURL} alt={`img_post_${props.pk}`} className={style.image} /></div>
        }
        <p className={style.message}>{props.message}</p>
        <p className={style.tags}>{props.tags}</p>

        <div className={style.footer}>
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
    </div>
  )
}
export default Post;