import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, requestUsers, following } from '../../Redux/Reducer/usersReducer';
import  * as Selectors  from '../../Redux/Selectors/usersSelectors';
import User from './User/User';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';

class UsersContainer extends React.Component {
  componentDidMount() {
    let { currentPage, pageSize, requestUsers } = this.props;
    requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    let { requestUsers, setCurrentPage, pageSize } = this.props;
    requestUsers(pageNumber, pageSize);
    setCurrentPage(pageNumber);
  }

  onFollowChanged = (id, followed) => {
    let { following } = this.props;
    following(followed, id);
  }

  getUsersList = () => {
    let { users, isLoading } = this.props;
    return users
      .map(u => 
        <User id={u.id}
              followed={u.followed} 
              photo_url={u.photos.large}
              fullName={u.name}
              status={u.status}
              country="Russian"
              city="Moscow"
              loading={isLoading}

              onFollowChanged={this.onFollowChanged}
        />)
  }

  render() {
    let { totalUsersCount, isFetching, pageSize, currentPage } = this.props;
    return <>
      { isFetching ? <Preloader /> : 
          <Users getUsersList={this.getUsersList}
                onPageChanged={this.onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}          
      />}
    </>
  }
}
let mapStateToProps = (state) => {
  return {
    users: Selectors.getUsers(state),
    pageSize: Selectors.getPageSize(state),
    totalUsersCount: Selectors.getTotalUsersCount(state),
    currentPage: Selectors.getCurrentPage(state),
    isFetching: Selectors.getIsFetching(state),
    isLoading: Selectors.getIsLoading(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setCurrentPage, requestUsers, following
  })
)(UsersContainer);