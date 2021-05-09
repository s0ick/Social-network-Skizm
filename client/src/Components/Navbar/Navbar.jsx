import React from 'react';
import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { ProfileIcon, NewsIcon, SettingsIcon, PomodoroIcon, MusicIcon, MessagesIcon, FriendsIcon, TodoIcon } from '../common/Icons/Icons';

const args = {
  width: 30,
  height: 30,
  fill: "#c5c5c5",
};

const translate = {
  Settings: 'Настройки',
  Profile: 'Профиль',
  News: 'Новости',
  Pomodoro: 'Помидорка',
  Todo: 'Задачи'
}


const Navbar = React.memo(({item, isAuth, login, blocked}) => {
  const navBarLinks = item
    .map(l => {
      return (
        <div key={l.url} className={style.item}>
          <NavLink className={style.link} activeClassName={style.active} to={l.url === '/profile' ? `${l.url}/${login}` : l.url}>
            {l.link === 'Profile' && <ProfileIcon {...args} />}
            {l.link === 'News' && <NewsIcon {...args} />}
            {l.link === 'Friends' && <FriendsIcon {...args} />}
            {l.link === 'Pomodoro' && <PomodoroIcon {...args} />}
            {l.link === 'Messages' && <MessagesIcon {...args} />}
            {l.link === 'Music' && <MusicIcon {...args} />}
            {l.link === 'Settings' && <SettingsIcon {...args} />}
            {l.link === 'Todo' && <TodoIcon {...args} />}
            <span className={style.text}>{translate[l.link]}</span>
          </NavLink>
        </div>
      )
    });

  if(isAuth && blocked === false) {
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