import React from 'react';
import style from './NewsForm.module.css';
import { reduxForm, Field } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { tagsIsValid } from '../../../Utils//Validators/validators';

class tagsForSearch extends React.Component {
  componentWillMount() {
    this.props.initialize({
      tagsForSearch: this.props.tags
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className={style.panelContainer}>
        <div className={style.slick}>
          <h3 className={style.title}>Tags for searching posts</h3>
          <Field component={Textarea}
            name={"tagsForSearch"}
            type={"text"}
            autoComplete={"off"}
            className={style.textarea}
            validate={tagsIsValid}
          />
          <button className={style.button}>save</button>
        </div>
        
      </form>
    )
  }
};

export default reduxForm({form: 'tags'})(tagsForSearch);