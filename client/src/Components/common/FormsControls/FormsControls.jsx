import React from 'react';
import style from './FormControls.module.css';
import { DownloadImgIcon } from '../Icons/Icons';

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

export const Hidden = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}>
           <input {...input} {...restProps} />
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
    const {input, meta, ...restProps } = this.props;
    return (
      <FormControl {...this.props}>
        <div className={style.block}>
          <label className={style.btnTertiary}>
          <input {...restProps} name={`${input.name}`} onChange={this.onChange} className={style.inputFile} accept={restProps.accept} />
            <span className={style.icon}><DownloadImgIcon width={25} height={25} fill={"#acacac"} stroke="#000000" /></span>
          </label>
        </div>
      </FormControl>
    )
  }
}

export class FieldFileInputButton extends React.Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render(){
    const {input, meta, ...restProps } = this.props;
    return (
      <FormControl {...this.props}>
        <input className={style.imageFile} {...restProps} name={`${input.name}`} onChange={this.onChange} accept={restProps.accept} />
      </FormControl>
    )
  }
}

