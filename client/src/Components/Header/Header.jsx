import React from 'react';
import { LogoutIcon } from '../common/Icons/Icons';
import logo from '../../assets/images/header/logo.png';
import style from './Header.module.css';

const Header = React.memo(({isAuth, authLogout}) => {
  return (
    <header className={style.header}>
      <img src={logo} alt="logo" className={style.img}/>

      <div className={style.loginBlock}>
        {
          isAuth ? 
            <button onClick={authLogout} className={style.button}>
              <LogoutIcon width={30} height={30} fill= "#64ffda" stroke= "#000000"/>
            </button> : 
          <></>
        }
      </div>
    </header>
  )
});

export default Header;