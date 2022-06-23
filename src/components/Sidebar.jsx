import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate } from "../features/dateSlice";
import { addEvent } from "../features/eventSlice";
import { useReducer } from "react";
import "../styles.css";

const Sidebar = () => {
  const events = useSelector((state) => state.event.events);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const initialValues = {
    date: {
      year: currentDate.getUTCFullYear(),
      month: currentDate.getUTCMonth(),
      date: currentDate.getUTCDate(),
    },
    title: "",
    start: 0,
    end: 1,
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "date":
        const newDate = new Date(action.payload.date);
        const formatDate = {
          year: newDate.getFullYear(),
          month: newDate.getMonth(),
          date: newDate.getDate(),
        };
        

        return { ...state, date: formatDate };

      case "title":
        return { ...state, title: action.payload.title };

      case "start":
        return { ...state, start: parseInt(action.payload.start) };

      case "end":
        return { ...state, end: parseInt(action.payload.end) };

      default:
        throw new Error();
    }
  };
  const [state, dispatchFunc] = useReducer(reducer, initialValues);

  useEffect(() => {
    dispatch(selectDate(state.date));
  }, [state.date, dispatch])
 
  const eventHandler = (e) => { 
    e.preventDefault();
    if(state.end<=state.start){
      alert('wrong selection of slot (end time must be greater than start time)')
      return
    }
    if (events.length === 0) {
      const newEvent = [
        {
          date: state.date,
          events: [
            {
              title: state.title,
              start: state.start,
              end: state.end,
            },
          ],
        },
      ];
      dispatch(addEvent(newEvent));
    } else {
      let flag = true;
      let flag2 = true;

      for (var i = 0; i < events.length; i++) {
        const eventDate = JSON.stringify(events[i].date);
        const selectedDate = JSON.stringify(state.date);
        if (selectedDate === eventDate) {
          flag = false;
          for (var j = 0; j < events[i].events.length; j++) {
            let event = events[i].events[j];
            if (
              (state.start >= event.start && state.start < event.end) ||
              (state.end > event.start && state.end <= event.end) ||
              (state.start < event.start && state.end > event.end)
            ) {
              flag2 = false;
            }
          }
          if (flag2) {
            let allEvents = JSON.parse(JSON.stringify(events));
            allEvents[i].events.push({
              title: state.title,
              start: state.start,
              end: state.end,
            });
            
            dispatch(addEvent([...allEvents]));
          } else {
            alert("slot clashes");
          }
        }
      }
      if (flag) {
        const newEvent = {
          date: state.date,
          events: [
            {
              title: state.title,
              start: state.start,
              end: state.end,
            },
          ],
        };
        dispatch(addEvent([...events, newEvent]));
      }
    }
  };
  return (
    <div className="Sidebar">
      <form onSubmit={eventHandler}>
        <label htmlFor="">Choose date</label>
        <br />
        <input
          type="date"
          required
          onChange={(e) =>
            dispatchFunc({ type: "date", payload: { date: e.target.value } })
          }
        />
        <br />
        <br />
        <label htmlFor="">Enter event title</label>
        <br />
        <input
          type="text"
          required
          value={state.title}
          onChange={(e) =>
            dispatchFunc({ type: "title", payload: { title: e.target.value } })
          }
        />
        <br />
        <br />
        <label htmlFor="">Choose start time</label>
        <br />
        <select
          name="start"
          required
          value={state.start}
          onChange={(e) =>
            dispatchFunc({ type: "start", payload: { start: e.target.value } })
          }
        >
          <option value="0">6:00</option>
          <option value="1">7:00</option>
          <option value="2">8:00</option>
          <option value="3">9:00</option>
          <option value="4">10:00</option>
        </select>
        <br />
        <br />
        <label htmlFor="">Choose end time</label>
        <br />
        <select
          name="end"
          required
          value={state.end}
          onChange={(e) =>
            dispatchFunc({ type: "end", payload: { end: e.target.value } })
          }
        >
          <option value="1">7:00</option>
          <option value="2">8:00</option>
          <option value="3">9:00</option>
          <option value="4">10:00</option>
          <option value="5">11:00</option>
        </select>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sidebar;
