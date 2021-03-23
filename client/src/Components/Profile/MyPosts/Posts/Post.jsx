import React, { useState } from 'react';
import style from'./Post.module.css';
import userImg from '../../../../assets/images/user_null.png';
import { formatDate } from '../../../../Utils/Helper/helper';

const Post = (props) => {
  const [ editMode, setEditMode ] = useState(false);

  const activateEditMode = () => {
    setEditMode(prevState => !prevState);
  };

  const deletePost = () => {
    props.deletePost(props.pk);
    setEditMode(prevState => !prevState);
  };

  let ava = '';
  if(!!props.avatar) ava = props.avatar;
  else ava = userImg;

  let refDate = formatDate(props.date);

  return (
    <div className={style.item} id={`post_id_${props.pk}`}>
      <div className={style.ava}>
        <img className={style.img} src={ava} alt="ava"/>
      </div>
        
      <div className={style.content}>
        <div className={style.mainLine}>
          <span className={style.author}>{props.author}</span>
          <span className={style.date}>{refDate}</span>
          <div className={style.container}>
            <span className={style.like}>{props.likeCount} Like</span>
            <button className={style.button} onClick={activateEditMode}>
              <span className={style.cub}></span>
            </button>
          </div>

          { editMode &&
            <div className={style.panel}>
              <button className={style.action} onClick={deletePost}>Delete post</button>
              <span className={style.line}></span>
              <button className={style.action}>Edit post</button>
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