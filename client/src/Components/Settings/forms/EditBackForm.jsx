import React from 'react';
import style from '../Settings.module.css';
import errorStyle from '../../common/FormsControls/FormControls.module.css';
import { reduxForm, Field } from 'redux-form';
import { FieldFileInputButton } from '../../common/FormsControls/FormsControls';
import { required } from '../../../Utils/Validators/validators';

const BackEditForm = ({handleSubmit, error}) => {
  return (
    <form onSubmit={handleSubmit} className={style.form + " " + (error && errorStyle.formSummaryError)}>
      <div className={style.file}>
  
        <Field component={FieldFileInputButton}
              id={"backgroundImg"}
              name={'imgForBack'} 
              type={"file"}
              accept={"image/jpeg, image/png, image/jpg"}
              validate={[required]}
      /> 
      
      </div>
      <div className={style.cardAction}>
        <button className={style.button}>Push</button>
      </div>
      <span className={errorStyle.fromSpanError}>{error} <span className={errorStyle.ellipse}></span></span>
    </form>
    )
 };

export default reduxForm({form: 'BackProfileForm'})(BackEditForm);
 