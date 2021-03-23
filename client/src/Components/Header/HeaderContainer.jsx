import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../../Redux/Reducer/authReducer';
import Header from './Header';
import { compose } from 'redux';

class HeaderContainer extends React.Component {
  render () {
    return <Header { ...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default compose(
  connect(mapStateToProps, {authLogout})
)(HeaderContainer);