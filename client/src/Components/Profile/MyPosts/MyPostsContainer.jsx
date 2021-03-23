import { updateFetching } from '../../../Redux/Reducer/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setPost, deletePost } from '../../../Redux/Reducer/profileReducer';

let mapStateToProps = (state) => {
  return {
    feedName: state.ProfilePage.profile.feedName,
    fetching: state.ProfilePage.fetching,
    login: state.auth.login,
    avatarPhoto: state.ProfilePage.avatarPhoto,
  };
};

export default compose(
  connect(mapStateToProps, { setPost, updateFetching, deletePost })
)(MyPosts);