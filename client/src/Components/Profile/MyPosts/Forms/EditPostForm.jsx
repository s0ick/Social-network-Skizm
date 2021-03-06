import React from 'react';
import style from './Forms.module.css';
import { reduxForm, Field } from 'redux-form';
import { Textarea, FieldFileInputButton, Hidden } from '../../../common/FormsControls/FormsControls';
import { tagsIsValid, required } from '../../../../Utils/Validators/validators';


class EditPostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      file: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.initialize({
      postBody: this.props.post.text,
      tags: this.props.post.tags,
      id: this.props.post.id,
    });
  }

  handleChange(event) {
    this.setState({
      file: window.URL.createObjectURL(
          new Blob([event], {})
        )
    });
  }

  render () {
    return (
        <form onSubmit={this.props.handleSubmit} className={style.panelColumn}>
            <h3 className={style.title}>Редактирование</h3>
            <Field component={Textarea} 
                name={"postBody"} 
                placeholder='Напишите о чем думаете...' 
                className={style.textareaSmall}
                type={"text"}
                autoComplete={"off"}
                validate={required}
            />
            <Field component={Textarea} 
                name={"tags"} 
                placeholder='#теги...' 
                className={style.textareaSmall}
                type={"text"}
                autoComplete={"off"}
                validate={[required, tagsIsValid]}
            />
            {
                this.props.post.photoURL || this.state.file ? 
                    <div className={style.parent}>
                        <img src={
                            this.state.file ? 
                            this.state.file : 
                            this.props.post.photoURL
                            } 
                        className={style.image} 
                        alt="file" />
                    </div>
                    : <></>
            }
            <Field component={FieldFileInputButton}
                id={"postImg"}
                name={'imgForPost'} 
                type={"file"}
                accept={"image/jpeg, image/png, image/gif"}
                onChange={this.handleChange}
            />
            <Field component={Hidden}
                id={"postId"}
                name={"id"}
                type={"hidden"}
                autoComplete={"off"}
            />
            <span onClick={() => this.props.setEdit(false)} className={style.close}>&#10006;</span>      
            <button className={style.button}>обновить</button>

        </form>
    )
  }
       
};

export default reduxForm({form: 'editPost'})(EditPostForm);