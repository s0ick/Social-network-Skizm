import React from 'react';
import style from './Settings.module.css';
import EditProfileForm from './forms/EditProfileForm';
import EditAvatarForm from './forms/EditAvatarForm';
import BackEditForm from './forms/EditBackForm';
import { updateProfile, setPhoto, updateFetching } from '../../Redux/Reducer/profileReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { pushPost } from '../../Utils/Helper/helper';
import Preloader from '../common/Preloader/Preloader';

class Settings extends React.Component {
  editProfile = (formData) => {
    this.props.updateProfile(formData, this.props.login);
  }

  editAvatar = (formData) => {
    this.props.updateFetching(true);
    const { imgForAvatar } = formData;
    pushPost(imgForAvatar, { login: this.props.login, flag: 'avatar' }, this.props.setPhoto);
  }

  editBack = (formData) => {
    this.props.updateFetching(true);
    const { imgForBack } = formData;
    pushPost(imgForBack, { login: this.props.login, flag: 'background' }, this.props.setPhoto);
  }

 render() {
  return (
    <div className={style.block}>
      <h3 className={style.title}>Photo editing</h3>

      {
        this.props.fetching ? <div className={style.fetching}><Preloader /></div> : 
        <> 
          <span className={style.subtitle}>Avatar photo</span>  
          <span className={style.rec}>Recommended size: 300x300</span>
          <EditAvatarForm onSubmit={this.editAvatar} /> 

          <span className={style.subtitle}>Background photo for profile</span>   
          <span className={style.rec}>Recommended size: 1230x820</span>
          <BackEditForm onSubmit={this.editBack} />
        </>
      }
      
      <h3 className={style.title}>Profile editing</h3>
      <EditProfileForm onSubmit={this.editProfile} profile={this.props.profile} formState={this.props.form} />
    </div>
   );
 }
}

let mapStateToProps = (state) => {
  return {
    profile: state.ProfilePage.profile,
    login: state.auth.login,
    form: state.form.EditProfileForm,
    fetching: state.ProfilePage.fetching,
  };
};

export default compose(
  connect(mapStateToProps, { updateProfile, setPhoto, updateFetching })
  )(Settings);