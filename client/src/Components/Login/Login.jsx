import React from 'react';
import style from './Login.module.css';
import LoginForm from './LoginForm';
import { authLogin } from '../../Redux/Reducer/authReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';

class LoginContainer extends React.Component {
  onSubmit = (formData) => {
    let { login, password, rememberMe } = formData;
    this.props.authLogin(login, password);

    if(rememberMe) {
      this.setLocal('login', login);
      this.setLocal('password', password);
    }
  }

  componentDidMount() {
    let { login, password } = this.getLocal();
    if(login && password) this.props.authLogin(login, password);
  }

  setLocal(param, state) {
    localStorage.setItem(param, state);
  }

  getLocal() {
    let login = null, password = null;

    for(let i = 0; i < localStorage.length; i++) {
      let param = localStorage.key(i),
          state = localStorage[param];

      if(param === 'login') {
        login = state;
      } else if(param === 'password') {
        password = state;
      }
    }

    return { login, password };   
  }

  render () {
    return (
      <div className={style.auth}>
        { 
          this.getLocal()['login'] !== null ? <Preloader /> :
          <>
            <div className={style.leftColumn}>
              <h3 className={style.title}>Enter the Reactive Network</h3>
              <LoginForm onSubmit={this.onSubmit} />
            </div>
            <div className={style.rightColumn}>
              <h3 className={style.title}>What is this network?</h3>
            </div>
          </>
          
        }
      </div>
    )
  }
}

export default compose(connect(null, {authLogin}))(LoginContainer);