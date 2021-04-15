import { updateFetching } from '../../../Redux/Reducer/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setPost, deletePost, updatePost, likePost } from '../../../Redux/Reducer/profileReducer';
import { withRouter } from 'react-router-dom';

let mapStateToProps = (state) => {
  return {
    feedName: state.ProfilePage.profile.feedName,
    fetching: state.ProfilePage.fetching,
    login: state.auth.login,
    matchLogin: state.ProfilePage.matchLogin,
  };
};

export default compose(
  connect(mapStateToProps, { setPost, updateFetching, deletePost, updatePost, likePost}),
  withRouter
)(MyPosts);