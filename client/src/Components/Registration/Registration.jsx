import React from 'react';
import style from './Registration.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import RegistrationForm from './RegistrationForm';
import { registration } from '../../Redux/Reducer/authReducer';


class RegistrationContainer extends React.Component {
  onSubmit = (formData) => {
    let { username, email, password, password1 } = formData;
    this.props.registration(username, email, password, password1);
  }

  render () {
    return (
      <div className={style.block}>
        <h3 className={style.title}>Become a new user in Reactive Network!</h3>
        <RegistrationForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default compose(connect(null, {registration}))(RegistrationContainer);