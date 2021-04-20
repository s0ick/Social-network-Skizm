import React from 'react';
import style from '../Settings.module.css';
import errorStyle from '../../common/FormsControls/FormControls.module.css';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../../common/FormsControls/FormsControls';

const inputs = {
  aboutMe: 'Обо мне',
  userStatus: 'Статус',
  job: 'Работа',
  country: 'Страна',
  city: 'Город',
  feedName: 'Лента',
  facebook: 'Facebook',
  my_site: 'Мой сайт',
  vk: 'VK',
  twitter: 'Twitter',
  instagram: 'Instagram',
  you_tube: 'You tube',
  git_hub: 'Git hub',
};

class EditProfileForm extends React.Component {

  componentWillMount() {
    this.props.initialize({
      aboutMe: this.props.profile.aboutMe,
      userStatus: this.props.profile.userStatus,
      job: this.props.profile.job,
      country: this.props.profile.country,
      city: this.props.profile.city,
      feedName: this.props.profile.feedName,
      facebook: this.props.profile.facebook,
      my_site: this.props.profile.my_site,
      vk: this.props.profile.vk,
      twitter: this.props.profile.twitter,
      instagram: this.props.profile.instagram,
      you_tube: this.props.profile.you_tube,
      git_hub: this.props.profile.git_hub
    });
  }

  fillArray() {
    let arrayFields = [];

    for(let key in this.props.profile) {

      if(key !== 'pk' && key !== 'blocked' && key !== 'disabled' && key !== 'valueOnline' && key !== 'valueOffline' && key !== 'date_blocked') {
       let field = (
         <div className={style.inputBlock} key={`${key}`}>
           <Field component={Input} id={`${inputs[key]}`} name={`${key}`} type={"text"} className={style.input} autoComplete={"off"} />
         </div>
       )
       arrayFields.push(field);
      }
     }
     return arrayFields;
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className={style.form + " " + (this.props.error && errorStyle.formSummaryError)}>
        <div className={style.cardContent}>
   
          { this.fillArray() }
        
        </div>
        <div className={style.cardAction}>
          <button className={style.button}>Отправить</button>
        </div>
      </form>
     )
  }
 };

export default reduxForm({form: 'EditProfileForm'})(EditProfileForm);
 