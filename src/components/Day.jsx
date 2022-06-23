import React from "react";
import { useSelector } from "react-redux";

// const events = [
//   {
//     date: {
//       year: 2022,
//       month: 5,
//       date: 22,
//     },
//     events: [
//       {
//         title: "main",
//         start: 0,
//         end: 1,
//       },
//       {
//         title: "sub",
//         start: 2,
//         end: 3,
//       },
//     ],
//   },
//   {
//     date: {
//       year: 2022,
//       month: 5,
//       date: 24,
//     },
//     events: [
//       {
//         title: "main",
//         start: 0,
//         end: 1,
//       },
//       {
//         title: "sub",
//         start: 2,
//         end: 3,
//       },
//     ],
//   },
// ];

const slots = [0, 1, 2, 3, 4];
const allDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

const Day = ({ day }) => {
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const events = useSelector(state => state.event.events)
  const dataObj = new Date(
    day.year,
    day.month,
    day.date
  );
  

  const ifEvent = () => {
    return events.some((event) => {
      const date1 = event.date;
      const date2 = day;
      
      return JSON.stringify(date1) === JSON.stringify(date2);
    });
  };

  const allSlots = () => {
    var event;
    if (ifEvent()) {
      events.forEach((mevent) => {
        const date1 = mevent.date;
        const date2 = day;
        if (JSON.stringify(date1) === JSON.stringify(date2)) {
          event = mevent;
        }
      });
      return (
        <div>
          {slots.map((slot) => {
            let returnDiv = <></>;
            event.events.every((eachEvent) => {
              if (slot === eachEvent.start) {
                returnDiv = (
                  <div className="Day_event_title" key={slot}>
                    <p>
                      {eachEvent.start +
                        6 +
                        ":00 - " +
                        (eachEvent.end + 6) +
                        ":00"}
                    </p>
                    <p>{eachEvent.title}</p>
                  </div>
                );
                return false;
              } else if (eachEvent.start < slot && slot < eachEvent.end) {
                returnDiv = <div className="Day_event" key={slot}></div>;
                return false;
              } else {
                returnDiv = <div className="Day_slot" key={slot}> </div>;
                return true;
              }
            });
            return returnDiv;
          })}
        </div>
      );
    } else {
      return (
        <div>
          {slots.map((slot) => {
            return <div className="Day_slot" key={slot}></div>;
          })}
        </div>
      );
    }
  };

  return (
    <div className="Day">
      <div className={selectedDate.date === day.date? "Day-header Day-highlight":"Day-header"} >
        <p>{dataObj.getDate()}</p>
        <p>{allDays[dataObj.getDay()]}</p>
      </div>
      {allSlots()}
    </div>
  );
};

export default Day;
