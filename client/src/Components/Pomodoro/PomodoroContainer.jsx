import React from 'react';
import { connect } from 'react-redux';
import Pomodoro from './Pomodoro';
import { compose } from 'redux';
import { setValueOnline, setValueOffline, setDisabled, updatePomodoro } from '../../Redux/Reducer/pomodoroReducer';

class PomodoroContainer extends React.Component {

  handleChangeOnline = valueOnline => {
    this.props.setValueOnline(valueOnline);
  }

  handleChangeOffline = valueOffline => {
    this.props.setValueOffline(valueOffline);
  }

  disabledChange = disabled => {
    this.props.setDisabled(disabled);
  }

  saveTimer = () => {
    const { username, valueOnline, valueOffline, disabled, blocked } = this.props;
    let dateBlocked = new Date().getTime() + new Date((valueOnline + valueOffline) * 60000).getTime();
    dateBlocked = new Date(dateBlocked);
    this.props.updatePomodoro(username, valueOnline, valueOffline, disabled, blocked, dateBlocked);
  }

  render () {
    return <Pomodoro 
      valueOnline={this.props.valueOnline}
      handleChangeOnline={this.handleChangeOnline}

      valueOffline={this.props.valueOffline}
      handleChangeOffline={this.handleChangeOffline}

      disabled={this.props.disabled}
      disabledChange={this.disabledChange}

      saveTimer={this.saveTimer}
     />
  }
}

const mapStateToProps = (state) => ({
  valueOnline: state.TomatoPage.valueOnline,
  valueOffline: state.TomatoPage.valueOffline,
  disabled: state.TomatoPage.disabled,
  blocked: state.TomatoPage.blocked,
  username: state.auth.login
});

export default compose(
  connect(mapStateToProps, {setValueOnline, setValueOffline, setDisabled, updatePomodoro})
)(PomodoroContainer);