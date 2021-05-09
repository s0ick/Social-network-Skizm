import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { SendIcon } from '../../common/Icons/Icons';


const AddTaskForm = ({addTask}) => {
  const [formValue, setFormValue] = useState('');
  const [disabled, setDisabled] = useState(true);

  const onChangeInput = (value) => {
    setFormValue(value);
  };

  useEffect(() => {
    if(formValue.trim() !== '') setDisabled(false);
    else setDisabled(true);
  }, [formValue]);

  const onSubmit = (event) => {
    event.preventDefault();
    addTask(formValue);
    setFormValue('');
  };

  return (
    <form onSubmit={onSubmit}  className={style.panelRow}>

      <div className={style.leftColumn}>
        <input onChange={(event) => onChangeInput(event.target.value)}
              value={formValue} 
              name={"message"} 
              placeholder='Напишите задачу...' 
              className={style.input} 
              type={"text"} 
              autoComplete={"off"} />
      </div>
      <div className={style.rightColumnFix}>
        <button disabled={disabled} className={style.send}>
          <SendIcon stroke={'none'} fill={disabled ? '#565c68' : '#9dd3c6'} />
        </button>
      </div>

    </form>
  )
};

export default AddTaskForm;