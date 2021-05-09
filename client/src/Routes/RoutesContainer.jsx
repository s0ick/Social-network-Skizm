import React, { Suspense, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setBlocked, updatePomodoro, updateRestTime, getTimer } from '../Redux/Reducer/pomodoroReducer';

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
const TodoContainer = React.lazy(() => import('../Components/Todo/TodoContainer'));


const Routes = (props) => {
  const [counter, setCounter] = useState(1);

  if(props.login && counter) {
    props.getTimer(props.login);
    setCounter(0);
  }

  useEffect(() => {
    const { login, valueOnline, valueOffline, blocked, restOnline } = props;
    
    if(blocked) return;
    let timeOut = 5000;

    const intervalRefresh = setInterval(() => {
      let newRestTime = restOnline - timeOut;
      props.updateRestTime(login, newRestTime);

      if(restOnline === 5000 && login) {
        props.setBlocked(true);
        let lockUpDate = new Date().getTime() + new Date(valueOffline * 60000).getTime();
        props.updatePomodoro(login, valueOnline, valueOffline, true, new Date(lockUpDate));
        clearInterval(intervalRefresh);
      }  
    }, timeOut);

    // const intervalCount = setInterval(() => {

    // }, 1000);

    return function() {
      // clearInterval(intervalCount);
      clearInterval(intervalRefresh);
    };
  }, [props.login, props.blocked, props.restOnline]);

            
  if(props.isAuth) {
    if(props.blocked) {
      return (
        <>
          <Route path='/blocked' render={() => <BlockedContainer />}/>
          <Redirect to='/blocked' />
        </>
      )
    } else {
      return (
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader/>}>
            <Route path='/profile/:login?' render={() => <ProfileContainer />}/>
            <Route path='/messages' render={() => <MessagesContainer />}/>
            <Route path='/users' render={() => <UsersContainer />}/>
            <Route path='/news' render={() => <NewsContainer />}/>
            <Route path='/tomato' render={() => <PomodoroContainer />}/>
            <Route path='/music' render={() => <Music />}/>
            <Route path='/todo' render={() => <TodoContainer />}/>
            <Route path='/settings' render={() => <Settings />}/>
          </Suspense>
          <Redirect to={`/profile/${props.login}`}/>
        </div>
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
    blocked: state.TomatoPage.blocked,
    lockUpDate: state.TomatoPage.lockUpDate,
    restOnline: state.TomatoPage.restOnline
  }
};

export const RoutesContainer = connect(mapStateToProps, { getTimer, setBlocked, updatePomodoro, updateRestTime })(Routes);