import React from 'react';
import style from'./Post.module.css';
import userImg from '../../../../assets/images/user_null.png';
import { formatDate } from '../../../../Utils/Helper/helper';

const Post = ({pk, message, photoURL, tags, likeCount, avatar, author, date}) => {
  let ava = '';
  if(!!avatar) ava = avatar;
  else ava = userImg;

  let refDate = formatDate(date);

  return (
    <div className={style.item} id={`post_id_${pk}`}>
      <div className={style.ava}>
        <img className={style.img} src={ava} alt="ava"/>
      </div>
        
      <div className={style.content}>
        <div className={style.mainLine}>
          <span className={style.author}>{author}</span>
          <span className={style.date}>{refDate}</span>
          <span className={style.like}>{likeCount} Like</span>
        </div>
        {
          photoURL && <div className={style.parent}><img src={photoURL} alt={`img_post_${pk}`} className={style.image} /></div>
        }
        <p className={style.message}>{message}</p>
        <p className={style.tags}>{tags}</p>
      </div>
    </div>
  )
}
export default Post;