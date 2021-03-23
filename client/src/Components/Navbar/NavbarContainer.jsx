import Navbar from './Navbar';
import { connect } from 'react-redux';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    item: state.SideBar.item,
    isAuth: state.auth.isAuth,
    login: state.auth.login
  };
};

export default compose(
  connect(mapStateToProps)
)(Navbar);