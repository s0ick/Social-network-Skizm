import React from 'react';
import style from'./ProfileInfo.module.css';
import ProfileDescp from './ProfileHelper/ProfileDescp';
import ProfileStatus from './ProfileHelper/ProfileStatus';
import defaultUserImg from '../../../assets/images/user_null.png';
import defaultBgImg from '../../../assets/images/bg_null.jpg';

import FaceBook from '../../../assets/images/contacts/facebook.svg';
import VK from '../../../assets/images/contacts/vk.svg';
import YouTube from '../../../assets/images/contacts/youtube.svg';
import GitHub from '../../../assets/images/contacts/github.svg';
import Instagram from '../../../assets/images/contacts/inst.svg';
import WebSite from '../../../assets/images/contacts/website.svg';
import Twitter from '../../../assets/images/contacts/twitter.svg';

const ProfileInfo = React.memo(({props}) => {
  let profile = props.profile;  

  const Links = [];
  if(!!profile.facebook) 
    Links.push(<a href={`${profile.facebook}`} className={style.link}><img src={FaceBook} alt="FaceBook"/></a>)
  if(!!profile.website) 
    Links.push(<a href={`${profile.my_site}`} className={style.link}><img src={WebSite} alt="WebSite"/></a>)
  if(!!profile.vk) 
    Links.push(<a href={`${profile.vk}`} className={style.link}><img src={VK} alt="VK"/></a>)
  if(!!profile.twitter) 
    Links.push(<a href={`${profile.twitter}`} className={style.link}><img src={Twitter} alt="Twitter"/></a>)
  if(!!profile.instagram) 
    Links.push(<a href={`${profile.instagram}`} className={style.link}><img src={Instagram} alt="Instagram"/></a>)
  if(!!profile.youtube) 
    Links.push(<a href={`${profile.you_tube}`} className={style.link}><img src={YouTube} alt="YouTube"/></a>)
  if(!!profile.github) 
    Links.push(<a href={`${profile.git_hub}`} className={style.link}><img src={GitHub} alt="GitHub"/></a>)
  

  return (
    <div className={style.info}>
      <div className={style.block}>
        <div className={style.description}>
          {
            !!profile.aboutMe &&
              <ProfileDescp subtitle="Обо мне" info={profile.aboutMe} />
          }
        </div>
        <div className={style.mainColumn}>
          <div className={style.avatar__image}>
            <img className={style.avatar} src={!!props.avatarPhoto ? props.avatarPhoto : defaultUserImg} alt="ava"/>
          </div>
          <h2 className={style.fullName}>{props.match.params.login}</h2>
          <div className={style.locations}>
            <span>{profile.country}</span>
            {
              profile.city &&
              <span>, </span>
            }
            <span>{profile.city}</span>
          </div>
          <div className={style.contacts}>

            {
              Links.map((elem, index) => {
                return <div key={`link${index}`}>{elem}</div>;
              })
            }

          </div>
        </div>
        <div className={style.description}>
          {
            profile.job &&
              <ProfileDescp subtitle="Работа" info={profile.job} />
          }
          <ProfileStatus status={profile.userStatus}/>
        </div>
      </div>
      <div className={style.background__image}>
        <img alt="background" className={style.image} src={!!props.backgroundPhoto ? props.backgroundPhoto : defaultBgImg}/>
      </div>
    </div>
  );
});

export default ProfileInfo;