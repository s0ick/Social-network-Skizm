import React from 'react';
import style from'./Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <div className={style.block}>
      <ProfileInfo props={props} />
      <MyPostsContainer />
    </div>
  )
}
export default Profile;