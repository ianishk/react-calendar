import React from "react";
import "../styles.css";

const slots = [0, 1, 2, 3, 4];

const Slots = () => {
  return (
    <div className="Slots">
      <div className="Slot-header"></div>
      {slots.map(slot => 
        <div className="Slot" key={slot}>
           <p>{(slot+6)+':00 - '+(slot+7)+':00'}</p> 
        </div>
      )}
    </div>
  );
};

export default Slots;
