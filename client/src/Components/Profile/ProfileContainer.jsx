import React from 'react';
import { connect } from 'react-redux';
import { getProfile, setMatchLogin } from '../../Redux/Reducer/profileReducer';
import { getTags } from '../../Redux/Reducer/newsReducer';
import Profile from './Profile';
import Preloader from '../common/Preloader/Preloader';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component {
  componentDidMount() {
    this.freshProfile();
    this.props.setMatchLogin(this.props.match.params.login);
  }

  componentDidUpdate(prevProps) {
    if(this.props.match !== prevProps.match) {
      this.freshProfile();
      this.props.setMatchLogin(this.props.match.params.login);
    }
  }

  freshProfile() {
    let { getProfile, login, match, getTags} = this.props;
    let username = match.params.login;
    getProfile(username, login);
    if(this.props.match.params.login === login) getTags(username);
  }

  render() {
    let { profile, photo } = this.props;
    return <>
       { !profile && !photo ? <Preloader /> : 
          <Profile {...this.props} />
       }
    </>
  }
}

let mapStateToProps = (state) => ({
  profile: state.ProfilePage.profile,
  login: state.auth.login,
  avatarPhoto: state.ProfilePage.avatarPhoto, 
  backgroundPhoto: state.ProfilePage.backgroundPhoto
});

export default compose(
  connect(mapStateToProps, { getProfile, getTags, setMatchLogin }),
  withRouter
)(ProfileContainer);