import React, { useState } from "react";

const Button = ({
	activated,
	triggered,
	toggleActivation,
	selectedInstrument,
}) => {
	const [triggeredInstrumentColor, setTriggeredInstrumentColor] = useState("");
	const [instrumentColor, setInstrumentColor] = useState("");

	const setColors = () => {
		if (selectedInstrument === "DRUMS") {
			setTriggeredInstrumentColor("bg-drums_dark");
			setInstrumentColor("bg-drums");
		} else if (selectedInstrument === "GUITAR") {
			setTriggeredInstrumentColor("bg-guitar_dark");
			setInstrumentColor("bg-guitar");
		} else if (selectedInstrument === "VOCALS") {
			setTriggeredInstrumentColor("bg-vocals_dark");
			setInstrumentColor("bg-vocals");
		} else if (selectedInstrument === "BASS") {
			setTriggeredInstrumentColor("bg-bass_dark");
			setInstrumentColor("bg-bass");
		} else {
			setTriggeredInstrumentColor("bg-keys_dark");
			setInstrumentColor("bg-keys");
		}
	};

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
