import React, { useState, useRef } from "react";

const Button = ({ activated, triggered, toggleActivation }) => {
  const changeColor = (activated, triggered) => {
    if (activated == true && triggered == true) {
      return "bg-rose-900 rounded-lg shadow-xl";
    } else if (activated == true && triggered == false) {
      return "bg-rose-400 rounded-lg shadow-xl";
    } else if (activated == false && triggered == true) {
      return "bg-lime-200 rounded-lg shadow-xl";
    } else {
      return "bg-white rounded-lg shadow-xl";
    }
  };
  let color = changeColor(activated, triggered);

  return (
    <button className={color} onClick={toggleActivation}>
      <div className="h-24"></div>
    </button>
  );
};

export default Button;
