import React from 'react';
import style from '../Login/Login.module.css';
import errorStyle from '../common/FormsControls/FormControls.module.css';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required, maxLengthAC } from '../../Utils/Validators/validators';

const maxLength = maxLengthAC(50);

const RegistrationForm = ({handleSubmit, error}) => {

  return (
   <form onSubmit={handleSubmit} className={style.block + " " + (error && errorStyle.formSummaryError)}>
     <div className={style.cardContent}>
      <div className={style.inputBlock}>
         <Field component={Input} validate={[required, maxLength]} id={"Login"} name={"username"} type={"text"} className={style.input} autoComplete={"off"} /> 
       </div>
       <div className={style.inputBlock}>
         <Field component={Input} validate={[required, maxLength]} id={"Email"} name={"email"} type={"email"} className={style.input} autoComplete={"off"} /> 
       </div>
       <div className={style.inputBlock}>
         <Field component={Input} validate={[required, maxLength]} id={"Password"} name={"password"} type={"password"} className={style.input}/> 
       </div>
       <div className={style.inputBlock}>
         <Field component={Input} validate={[required, maxLength]} id={"Repeat-psw"} name={"password1"} type={"password"} className={style.input}/> 
       </div>
     </div>
     <div className={style.cardAction}>
       <button className={style.button}>Push</button>
     </div>
     <span className={errorStyle.fromSpanError}>{error} <span className={errorStyle.ellipse}></span></span>
   </form>
  )
 };
 
 export default reduxForm({form: 'registration'})(RegistrationForm);