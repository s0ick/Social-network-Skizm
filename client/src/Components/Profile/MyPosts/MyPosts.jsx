import React from 'react';
import style from'./MyPosts.module.css';
import MyPostForm from './MyPostForm';
import Preloader from '../../common/Preloader/Preloader';
import { pushPost } from '../../../Utils/Helper/helper';
import PostsHook from './Posts/PostsHook';

const MyPosts = React.memo(({feedName, fetching, login, setPost, updateFetching, match, avatarPhoto}) => {

  const addNewPost = (values) => {
    const { imgForPost, postBody, tags } = values;
    updateFetching(true);
    let avatarURL = avatarPhoto;
    pushPost(imgForPost, {postBody, tags, login, avatarURL}, setPost);
  };

  return (
    <div className={style.block}>
      <div className={style.myPostBlock}>
        <h3 className={style.title}>
          {
            feedName !== null ? feedName : "What's new?"
          }
        </h3>
        { login == match.params.login &&
          (
            fetching ? <div className={style.fetching}><Preloader /></div> : <MyPostForm onSubmit={addNewPost} />
          )
        }
      </div>
      <div className={style.postsBlock}>
        { login == match.params.login &&
          (
            fetching ? <div className={style.fetching}><Preloader /></div> : <PostsHook username={match.params.login} />
          )
        }
      </div>
    </div>
  )
});
export default MyPosts;