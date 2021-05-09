import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  if(value) {
    return <text x={x + width / 2} y={y+30} fill="#000" textAnchor="middle" dy={-6}>{`${value}`}</text>;
  }
  else return <text></text>
};

const BarChartComponent = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {

    Date.prototype.getWeek = function() {
      let oneJan = new Date(this.getFullYear(),0,1);
      return Math.ceil((((this - oneJan) / 86400000) + oneJan.getDay()+1)/7) - 1;
    };

    let currentDate = new Date();

    let sun = 0, mon = 0, tues = 0, wed = 0, thurs = 0, frid = 0, sat = 0;

    props.data.forEach((elem) => {
      let elemDate = new Date(elem.dateCompleted);

      if(elem.completed && 
        currentDate.getWeek() === elemDate.getWeek() && 
        currentDate.getFullYear() === elemDate.getFullYear()) {

          switch(elemDate.getDay()) {
            case 0: sun++; break;
            case 1: mon++; break;
            case 2: tues++; break;
            case 3: wed++; break;
            case 4: thurs++; break;
            case 5: frid++; break;
            case 6: sat++; break;
            default: break;
          }
          
      }
    });

    setData([
      { name: 'Вс', count: sun },
      { name: 'Пн', count: mon },
      { name: 'Вт', count: tues },
      { name: 'Ср', count: wed },
      { name: 'Чт', count: thurs },
      { name: 'Пт', count: frid },
      { name: 'Сб', count: sat }
    ]);

  }, [props.data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="count" fill="#a7ffeb" background={{ fill: '#37474f' }} 
          label={renderCustomBarLabel}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;