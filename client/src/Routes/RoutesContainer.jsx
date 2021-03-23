import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import ProfileContainer from '../Components/Profile/ProfileContainer';
import Login from '../Components/Login/Login';
import Registration from '../Components/Registration/Registration';
import Preloader from '../Components/common/Preloader/Preloader';

const MessagesContainer = React.lazy(() => import('../Components/Messages/MessagesContainer'));
const UsersContainer = React.lazy(() => import ('../Components/Users/UsersContainer'));
const Music = React.lazy(() => import('../Components/Music/Music'));
const Settings = React.lazy(() => import('../Components/Settings/Settings'));
const NewsContainer = React.lazy(() => import('../Components/News/NewsContainer'));

const Routes = (props) => {
  if(props.isAuth) {
    return (
      <div className="app-wrapper-content">
        <Suspense fallback={<Preloader/>}>
          <Route path='/messages' render={() => <MessagesContainer />}/>
          <Route path='/users' render={() => <UsersContainer />}/>
          <Route path='/news' render={() => <NewsContainer />}/>
          <Route path='/music' render={() => <Music />}/>
          <Route path='/settings' render={() => <Settings />}/>
        </Suspense>
        <Route path='/profile/:login?' render={() => <ProfileContainer />}/>
        <Redirect to={`/profile/${props.login}`}/>
      </div>
    )
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
    login: state.auth.login
  }
};

export const RoutesContainer = connect(mapStateToProps, {})(Routes);