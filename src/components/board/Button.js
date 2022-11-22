import React from "react";

const Button = ({
  activated,
  triggered,
  toggleActivation,
  selectedInstrument,
}) => {
  const triggeredInstrumentColor =
    selectedInstrument === "DRUMS"
      ? "bg-drums_dark"
      : selectedInstrument === "GUITAR"
      ? "bg-guitar_dark"
      : selectedInstrument === "VOCALS"
      ? "bg-vocals_dark"
      : selectedInstrument === "BASS"
      ? "bg-bass_dark"
      : "bg-keys_dark";

  const instrumentColor =
    selectedInstrument === "DRUMS"
      ? "bg-drums"
      : selectedInstrument === "GUITAR"
      ? "bg-guitar"
      : selectedInstrument === "VOCALS"
      ? "bg-vocals"
      : selectedInstrument === "BASS"
      ? "bg-bass"
      : "bg-keys";

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
      return `bg-lavender_grey rounded-sm shadow-xl`;
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
