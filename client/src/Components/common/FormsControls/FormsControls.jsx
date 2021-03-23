import React from 'react';
import style from './FormControls.module.css';
import imgIcon from '../../../assets/images/imgIcon.svg';

const FormControl = ({input, meta: {touched, error}, ...props}) => {
  const hasError = touched && error;
  return (
    <div className={style.FormControl + " " + (hasError ? style.error : "")}>
      {props.children}
      <span className={style.spanError}>{error} <i className={style.ellipse}></i></span>
    </div>
  )
};

export const Textarea = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}>
           <textarea {...input} {...restProps}></textarea> 
         </FormControl>
};

export const Input = (props) => {
  const {input, meta, defaultValue, ...restProps} = props;
  return <FormControl {...props}>
           <input {...input} {...restProps}/>
           <label htmlFor={props.id}>{props.id}:</label>
         </FormControl>
};

export class FieldFileInput extends React.Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render(){
    const { input: { value } } = this.props;
    const {input, meta, ...restProps } = this.props;
    return (
      <FormControl {...this.props}>
        <div className={style.block}>
          <label className={style.btnTertiary}>
          <input {...restProps} name={`${input.name}`} onChange={this.onChange} className={style.inputFile} accept={restProps.accept} />
            <span className={style.icon}><img src={imgIcon} alt="photo"/></span>
          </label>
        </div>
      </FormControl>
    )
  }
}

