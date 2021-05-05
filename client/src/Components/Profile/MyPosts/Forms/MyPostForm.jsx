import React from 'react';
import style from './Forms.module.css';
import { reduxForm, Field } from 'redux-form';
import { Textarea, FieldFileInput } from '../../../common/FormsControls/FormsControls';
import { tagsIsValid, required } from '../../../../Utils/Validators/validators';


const AddPostForm = ({handleSubmit}) => {
 return (
  <form onSubmit={handleSubmit} className={style.panelRow}>

    <div className={style.leftColumn}>
       <Field component={Textarea} 
              name={"postBody"} 
              placeholder='Напишите о чем думаете...' 
              className={style.textareaBig}
              type={"text"}
              autoComplete={"off"}
              validate={required}
       />
       <Field component={Textarea} 
              name={"tags"} 
              placeholder='#Теги...' 
              className={style.textareaBig}
              type={"text"}
              autoComplete={"off"}
              validate={[required, tagsIsValid]}
       />
    </div>
    <div className={style.rightColumn}>
       <Field component={FieldFileInput}
              id={"postImg"}
              name={'imgForPost'} 
              type={"file"}
              accept={"image/jpeg, image/png, image/gif"}
       />      
       <button className={style.button}>Добавить</button>
    </div>

  </form>
 )
};

export default reduxForm({form: 'AddPost'})(AddPostForm);