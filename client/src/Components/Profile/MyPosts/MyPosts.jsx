import React, { useState } from 'react';
import style from'./MyPosts.module.css';
import MyPostForm from './Forms/MyPostForm';
import EditPostForm from './Forms/EditPostForm';
import Preloader from '../../common/Preloader/Preloader';
import { pushPost } from '../../../Utils/Helper/helper';
import PostsHook from './Posts/PostsHook';

const MyPosts = React.memo(({feedName, fetching, login, setPost, deletePost, updatePost, likePost, commentPost, updateFetching, matchLogin, match}) => {
  const [edit, setEdit] = useState(false);
  const [postContent, setPostContent] = useState({});

  const addNewPost = (formData) => {
    const { imgForPost, postBody, tags } = formData;
    updateFetching(true);
    pushPost(imgForPost, {postBody, tags, login}, setPost);
  };

  const closeModal = (event) => {
    let target = event.target;
    if(target.id === 'editModal') setEdit(false);
  };

  const updSelectedPost = (formData) => {
    const { imgForPost, postBody, tags, id } = formData;
    updateFetching(true);
    pushPost(imgForPost, {postBody, tags, id, username: login}, updatePost);
    setEdit(false);
  };

  return (
    <div className={style.block}>
      <div className={style.myPostBlock}>
        <h3 className={style.title}>
          {
            feedName !== null ? feedName : "Что нового?"
          }
        </h3>
        { login === matchLogin &&
          (
            fetching ? <div className={style.fetching}><Preloader /></div> : 
              <MyPostForm onSubmit={addNewPost} />
          )
        }
      </div>
      <div className={style.postsBlock}>
        { 
          matchLogin === match.params.login && 
          (
            fetching ? <div className={style.fetching}><Preloader /></div> : 
              <PostsHook 
                username={matchLogin} 
                deletePost={deletePost} 
                setEdit={setEdit}
                setPostContent={setPostContent}
                likePost={likePost}
                commentPost={commentPost}
                login={login}
              />
          )
        } 
      </div>

      {
        edit && 
          <div className={style.modal} id="editModal" onClick={(event) => closeModal(event)}>
            <div className={style.dialog}>
              <EditPostForm 
                setEdit={setEdit}
                post={postContent}
                onSubmit={updSelectedPost} 
              />
            </div>
          </div>
      }
    </div>
  )
});
export default MyPosts;