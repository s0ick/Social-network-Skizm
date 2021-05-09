import React, { useEffect, useState }  from 'react';
import style from './style.module.css';
import Task from '../Task/Task';
import PieChart from '../../common/Charts/PieChart';
import BarChart from '../../common/Charts/BarChart';

const CompleteList = (props) => {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(false);
    props.tasks.forEach((elem) => {
      if(elem.completed) setCheck(true);
    });
  }, [props.tasks, check]);

  return (
    <div className={style.block}>
       <div className={style.panel}>
        <div className={style.slick}>

          <div className={style.pie}>
            <h2 className={style.title}>Соотношение выполненых и не выполненых задач</h2>
            <PieChart data={props.tasks} />
          </div>

          <div className={style.bar}>
            <h2 className={style.title}>Количество выполенных задач за текущую неделю</h2>
            <BarChart data={props.tasks} />
          </div>
          
        </div>
      </div>
      <div className={style.listComplete}>
        {
          check ?
            props.tasks.map(t => {
              if(t.completed) {
                return <Task 
                  key={`task_id_${t.id}`} 
                  message={t.message} 
                  id={t.id}
                  completed={t.completed}
                  deleteTask={props.deleteTask}
                  updateTask={props.updateTask}
                />
              }
            }) :
            <h2 className={style.subtitle}>Список выполенных задач пустой</h2>
        }
      </div>
    </div>
  )
};

export default CompleteList;