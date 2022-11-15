import React from "react";

const Button = ({ activated, triggered, toggleActivation }) => {
  const changeColor = (activated, triggered) => {
    if (activated == true && triggered == true) {
      return "bg-purple-900 rounded-sm shadow-xl pulsed";
    } else if (activated == true && triggered == false) {
      return "bg-purple-400 rounded-sm shadow-xl";
    } else if (activated == false && triggered == true) {
      return "bg-sky-500 rounded-sm shadow-xl";
    } else {
      return "bg-purple-100 rounded-sm shadow-xl";
    }
  };
  let color = changeColor(activated, triggered);

  return (
    <button className={`${color} w-20`} onClick={toggleActivation}>
      <div className="h-24"></div>
    </button>
  );
};

export default Button;
