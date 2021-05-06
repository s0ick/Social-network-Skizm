import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setPost, deletePost, updatePost, likePost, commentPost, updateFetching } from '../../../Redux/Reducer/postReducer';
import { withRouter } from 'react-router-dom';

let mapStateToProps = (state) => {
  return {
    feedName: state.ProfilePage.profile.feedName,
    fetching: state.ProfilePage.fetching,
    login: state.auth.login,
    matchLogin: state.ProfilePage.matchLogin
  };
};

export default compose(
  connect(mapStateToProps, { setPost, updateFetching, deletePost, updatePost, likePost, commentPost }),
  withRouter
)(MyPosts);