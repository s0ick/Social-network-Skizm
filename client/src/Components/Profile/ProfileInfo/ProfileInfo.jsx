import React from 'react';
import style from'./ProfileInfo.module.css';
import ProfileDescp from './ProfileHelper/ProfileDescp';
import ProfileStatus from './ProfileHelper/ProfileStatus';
import defaultUserImg from '../../../assets/images/user_null.png';
import defaultBgImg from '../../../assets/images/bg_null.jpg';

import { FacebookIcon, VkIcon, InstIcon, YouTubeIcon, GitHubIcon, WebSiteIcon, TwitterIcon } from '../../common/Icons/Icons';

const args = {
  width: 30,
  height: 30,
  fill: "#64ffda",
  stroke: "#000000"
};

const ProfileInfo = React.memo(({props}) => {
  let profile = props.profile;  

  const Links = [];
  if(!!profile.facebook) 
    Links.push(<a href={`${profile.facebook}`} className={style.link}><FacebookIcon {...args} /></a>)
  if(!!profile.website) 
    Links.push(<a href={`${profile.my_site}`} className={style.link}><WebSiteIcon {...args} /></a>)
  if(!!profile.vk) 
  Links.push(<a href={`${profile.vk}`} className={style.link}><VkIcon {...args} /></a>)
  if(!!profile.twitter) 
    Links.push(<a href={`${profile.twitter}`} className={style.link}><TwitterIcon {...args} /></a>)
  if(!!profile.instagram) 
    Links.push(<a href={`${profile.instagram}`} className={style.link}><InstIcon {...args} /></a>)
  if(!!profile.youtube) 
    Links.push(<a href={`${profile.you_tube}`} className={style.link}><YouTubeIcon {...args} /></a>)
  if(!!profile.git_hub) 
    Links.push(<a href={`${profile.git_hub}`} className={style.link}><GitHubIcon {...args} /></a>)
  

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