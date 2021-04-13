import React from 'react';
import { connect } from 'react-redux';
import { setBlocked, updateState } from '../../Redux/Reducer/pomodoroReducer';
import Blocked from './Blocked';
import { compose } from 'redux';

class BlockedContainer extends React.Component {
  render () {
    return <Blocked dateBlocked={this.props.dateBlocked} updateState={this.props.updateState} activate={this.props.setBlocked} props={this.props} />
  }
}

const mapStateToProps = (state) => ({
  dateBlocked: state.TomatoPage.dateBlocked,
  valueOnline: state.TomatoPage.valueOnline,
  valueOffline: state.TomatoPage.valueOffline,
  disabled: state.TomatoPage.disabled,
  username: state.auth.login
});

export default compose(
  connect(mapStateToProps, {setBlocked, updateState})
)(BlockedContainer);