import React from 'react';
import logo from '../../assets/images/header/logo.png';
import logout from '../../assets/images/header/logout.svg';
import style from './Header.module.css';

const Header = React.memo(({isAuth, authLogout}) => {
  return (
    <header className={style.header}>
      <img src={logo} alt="logo" className={style.img}/>

      <div className={style.loginBlock}>
        {
          isAuth ? 
            <button onClick={authLogout} className={style.button}>
              <img src={logout} alt="logout" className={style.image}/>
            </button> : 
          <></>
        }
      </div>
    </header>
  )
});

export default Header;