import React, { useEffect, useState } from "react";

const Button = ({
  activated,
  triggered,
  toggleActivation,
  selectedInstrument,
  instrument,
}) => {
  const [triggeredInstrumentColor, setTriggeredInstrumentColor] = useState("");
  const [instrumentColor, setInstrumentColor] = useState("");

  useEffect(() => {
    setColors();
  }, [instrument]);
  const setColors = () => {
    if (instrument === "DRUMS") {
      setTriggeredInstrumentColor("bg-drums_dark");
      setInstrumentColor("bg-drums");
    } else if (instrument === "GUITAR") {
      setTriggeredInstrumentColor("bg-guitar_dark");
      setInstrumentColor("bg-guitar");
    } else if (instrument === "VOCALS") {
      setTriggeredInstrumentColor("bg-vocals_dark");
      setInstrumentColor("bg-vocals");
    } else if (instrument === "BASS") {
      setTriggeredInstrumentColor("bg-bass_dark");
      setInstrumentColor("bg-bass");
    } else {
      setTriggeredInstrumentColor("bg-keys_dark");
      setInstrumentColor("bg-keys");
    }
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

  let color = changeColor(activated, triggered);

  return (
    // every button renders with the same color
    <button
      className={`${color} w-20`}
      onClick={() => {
        toggleActivation();
        setColors();
      }}
    >
      <div className="h-24"></div>
    </button>
  );
};

export default Button;
