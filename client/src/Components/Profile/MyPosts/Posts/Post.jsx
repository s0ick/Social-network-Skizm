import React, { useState } from 'react';
import style from'./Post.module.css';
import userImg from '../../../../assets/images/user_null.png';
import { formatDate } from '../../../../Utils/Helper/helper';

const Post = (props) => {
  const [ editPanel, setEditPanel ] = useState(false);

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
            <span className={style.like}>{props.likeCount} Like</span>
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
      </div>
    </div>
  )
}
export default Post;