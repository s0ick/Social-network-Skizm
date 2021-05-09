import React from 'react';
import { connect } from 'react-redux';
import Pomodoro from './Pomodoro';
import { compose } from 'redux';
import { setValueOnline, setValueOffline, updatePomodoro, updateRestTime } from '../../Redux/Reducer/pomodoroReducer';

class PomodoroContainer extends React.Component {

  handleChangeOnline = valueOnline => {
    this.props.setValueOnline(valueOnline);
  }

  handleChangeOffline = valueOffline => {
    this.props.setValueOffline(valueOffline);
  }


  saveTimer = () => {
    const { username, valueOnline, valueOffline, blocked } = this.props;
    
    let lockUpDate = new Date().getTime() + new Date((valueOnline + valueOffline) * 60000).getTime();
    let restOnline = valueOnline * 60000;
    
    this.props.updatePomodoro(username, valueOnline, valueOffline, blocked, new Date(lockUpDate));
    this.props.updateRestTime(username, restOnline);
  }

  render () {
    return <Pomodoro 
      valueOnline={this.props.valueOnline}
      handleChangeOnline={this.handleChangeOnline}

      valueOffline={this.props.valueOffline}
      handleChangeOffline={this.handleChangeOffline}

      saveTimer={this.saveTimer}
     />
  }
}

const mapStateToProps = (state) => ({
  valueOnline: state.TomatoPage.valueOnline,
  valueOffline: state.TomatoPage.valueOffline,
  blocked: state.TomatoPage.blocked,
  username: state.auth.login,
});

export default compose(
  connect(mapStateToProps, {setValueOnline, setValueOffline, updatePomodoro, updateRestTime})
)(PomodoroContainer);