import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setBlocked, setDateBlocked, updateState } from '../Redux/Reducer/pomodoroReducer';
import { checkDate } from '../Utils/Helper/helper';

import ProfileContainer from '../Components/Profile/ProfileContainer';
import Login from '../Components/Login/Login';
import Registration from '../Components/Registration/Registration';
import Preloader from '../Components/common/Preloader/Preloader';
import BlockedContainer from '../Components/Blocked/BlockedContainer';

const MessagesContainer = React.lazy(() => import('../Components/Messages/MessagesContainer'));
const UsersContainer = React.lazy(() => import ('../Components/Users/UsersContainer'));
const Music = React.lazy(() => import('../Components/Music/Music'));
const Settings = React.lazy(() => import('../Components/Settings/Settings'));
const NewsContainer = React.lazy(() => import('../Components/News/NewsContainer'));
const PomodoroContainer = React.lazy(() => import('../Components/Pomodoro/PomodoroContainer'));

const Routes = (props) => {

  useEffect(() => {
    const { login, valueOnline, valueOffline, disabled, dateBlocked, blocked } = props;
    if(!blocked || !disabled) {
      let date = new Date().getTime() + new Date(valueOnline * 60000).getTime();

      const intervalID = setInterval(() => {
        if(checkDate(new Date(date)) && login) {

          props.setBlocked(true);
          props.updateState(login, valueOnline, valueOffline, disabled, true, dateBlocked);
          clearInterval(intervalID);
        } 
      }, 1000);

      return function() {
        clearInterval(intervalID);
      };
    }
  }, [props.login, props.blocked]);
 
  if(props.isAuth) { 
    if(!props.blocked || !props.disabled) {
      return (
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader/>}>
            <Route path='/profile/:login?' render={() => <ProfileContainer />}/>
            <Route path='/messages' render={() => <MessagesContainer />}/>
            <Route path='/users' render={() => <UsersContainer />}/>
            <Route path='/news' render={() => <NewsContainer />}/>
            <Route path='/tomato' render={() => <PomodoroContainer />}/>
            <Route path='/music' render={() => <Music />}/>
            <Route path='/settings' render={() => <Settings />}/>
          </Suspense>
          <Redirect to={`/profile/${props.login}`}/>
        </div>
      )
    } else {
      return (
        <>
          <Route path='/blocked' render={() => <BlockedContainer />}/>
          <Redirect to='/blocked' />
        </>
      )
      
    } 
  } else {
    return (
      <div className="app-wrapper-content">
        <Route path='/login' render={() => <Login />} />
        <Route path='/registration' render={() => <Registration />} />
        <Redirect to='/login'/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    valueOnline: state.TomatoPage.valueOnline,
    valueOffline: state.TomatoPage.valueOffline,
    disabled: state.TomatoPage.disabled,
    blocked: state.TomatoPage.blocked,
    dateBlocked: state.TomatoPage.dateBlocked
  }
};

export const RoutesContainer = connect(mapStateToProps, {setBlocked, setDateBlocked, updateState})(Routes);