import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import Profile from '../../assets/images/navbar/Profile.svg';
import Friends from '../../assets/images/navbar/Friends.svg';
import Messages from '../../assets/images/navbar/Messages.svg';
import News from '../../assets/images/navbar/News.svg';
import Pomodoro from '../../assets/images/navbar/Pomodoro.svg';
import Music from '../../assets/images/navbar/Music.svg';
import Settings from '../../assets/images/navbar/Settings.svg';

const objLinks = {
  Profile,
  Friends,
  Messages,
  News,
  Pomodoro,
  Music,
  Settings
};


const Navbar = React.memo(({item, isAuth, login}) => {
  const navBarLinks = item
    .map(l => {
      return (
        <div key={l.url} className={style.item}>
          <NavLink className={style.link} activeClassName={style.active} to={l.url === '/profile' ? `${l.url}/${login}` : l.url}>
            <div className={style.image}>
              <img src={objLinks[l.link]} alt={l.link} />
            </div>
            <span className={style.text}>{l.link}</span>
          </NavLink>
        </div>
      )
    });

  if(isAuth) {
    return (
      <nav className={style.navbar}>
        <div className={style.block}>
          {navBarLinks}
        </div>
      </nav>
    )
  } else {
    return <></>
  }
});
export default Navbar;