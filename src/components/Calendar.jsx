import React from 'react'
import '../styles.css'
import { useSelector } from 'react-redux'
import Day from './Day';
import Slots from './Slots';

const dates = (current) => {
    var week = [];
    current.setDate(current.getDate() - current.getDay());
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

const Calendar = () => {
    const selectedDate  = useSelector(state => state.date.selectedDate)
    
    const dataObj = new Date(selectedDate.year,selectedDate.month, selectedDate.date)
    
    const week = dates(dataObj)
    const weekObj = week.map(day => {
        return{
            year: day.getFullYear(),
            month: day.getMonth(),
            date: day.getDate()
        }
    })
  return (
    <div className='Calendar'>
      <Slots />
      {weekObj.map(day => <Day day={day} key={day.date} />)}  
    </div>
  )
}

export default Calendar