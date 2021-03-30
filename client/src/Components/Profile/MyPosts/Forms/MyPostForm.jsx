import React from 'react';
import style from '../MyPosts.module.css';
import { reduxForm, Field } from 'redux-form';
import { Textarea, FieldFileInput, Input } from '../../../common/FormsControls/FormsControls';
import { tagsIsValid, required } from '../../../../Utils/Validators/validators';


const AddPostForm = ({handleSubmit}) => {
 return (
  <form onSubmit={handleSubmit} className={style.panel}>

    <div className={style.leftColumn}>
       <Field component={Textarea} 
              name={"postBody"} 
              placeholder='Write down your thoughts...' 
              className={style.textarea}
              type={"text"}
              autoComplete={"off"}
              validate={required}
       />
       <Field component={Textarea} 
              name={"tags"} 
              placeholder='#tags...' 
              className={style.textarea}
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
       <button className={style.button}>Add post</button>
    </div>

  </form>
 )
};

export default reduxForm({form: 'AddPost'})(AddPostForm);