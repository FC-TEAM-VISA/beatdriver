import React from "react";

const Button = ({
  activated,
  triggered,
  toggleActivation,
  selectedInstrument,
}) => {
  const triggeredInstrumentColor =
    selectedInstrument === "DRUMS"
      ? "bg-red-800"
      : selectedInstrument === "GUITAR"
      ? "bg-blue-800"
      : selectedInstrument === "VOCALS"
      ? "bg-purple-800"
      : selectedInstrument === "BASS"
      ? "bg-green-800"
      : "bg-pink-800";

  const instrumentColor =
    selectedInstrument === "DRUMS"
      ? "bg-red-400"
      : selectedInstrument === "GUITAR"
      ? "bg-blue-400"
      : selectedInstrument === "VOCALS"
      ? "bg-purple-400"
      : selectedInstrument === "BASS"
      ? "bg-green-400"
      : "bg-pink-400";

  const drumButton = (activated, triggered) => {
    return activated && triggered
      ? `bg-red-800 rounded-sm shadow-xl animate-pulse pulsed w-20`
      : activated && !triggered
      ? `bg-red-400 rounded-sm shadow-xl w-20`
      : !activated && triggered
      ? `bg-sky-500 rounded-sm shadow-xl animate-pulse w-20`
      : `bg-purple-100 rounded-sm shadow-xl w-20`;
  };

  const changeColor = (activated, triggered) => {
    if (activated === true && triggered === true) {
      return `${triggeredInstrumentColor} rounded-sm shadow-xl animate-pulse pulsed`;
    } else if (activated === true && triggered === false) {
      return `${instrumentColor} rounded-sm shadow-xl`;
    } else if (activated === false && triggered === true) {
      return `bg-sky-500 rounded-sm shadow-xl animate-pulse`;
    } else {
      return `bg-purple-100 rounded-sm shadow-xl`;
    }
  };

  let drumColor = drumButton(activated, triggered);
  let color = changeColor(activated, triggered);

  return (
    // <button
    //   className={selectedInstrument === "DRUM" ? `${drumColor}` : `${color}`}
    //   onClick={toggleActivation}
    // >
    //   <div className="h-24"></div>
    // </button>

    <button className={`${color} w-20`} onClick={toggleActivation}>
      <div className="h-24"></div>
    </button>
  );
};

export default Button;
