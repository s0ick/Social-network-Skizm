import React from 'react';
import { connect } from 'react-redux';
import { setBlocked, updatePomodoro, updateRestTime } from '../../Redux/Reducer/pomodoroReducer';
import Blocked from './Blocked';
import { compose } from 'redux';

class BlockedContainer extends React.Component {
  render () {
    return (
      <>
        <Blocked 
          lockUpDate={this.props.lockUpDate} 
          updatePomodoro={this.props.updatePomodoro} 
          activate={this.props.setBlocked} 
          props={this.props} 
          updateRestTime={this.props.updateRestTime}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  lockUpDate: state.TomatoPage.lockUpDate,
  valueOnline: state.TomatoPage.valueOnline,
  valueOffline: state.TomatoPage.valueOffline,
  username: state.auth.login
});

export default compose(
  connect(mapStateToProps, {setBlocked, updatePomodoro, updateRestTime})
)(BlockedContainer);