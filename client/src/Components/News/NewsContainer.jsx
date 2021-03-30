import { updateFetching, updateTags, setAuthor } from '../../Redux/Reducer/newsReducer';
import News from './News';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

let mapStateToProps = (state) => {
  return {
    fetching: state.NewsPage.fetching,
    tags: state.NewsPage.tags,
    authors: state.NewsPage.authors,
    username: state.auth.login,
  };
};

export default compose(
  connect(mapStateToProps, { updateFetching, updateTags, setAuthor }),
  withRouter
)(News);