import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useFormControlStyles } from "@chakra-ui/react";

const Looper = ({
	player,
	bpm,
	playing,
	beat,
	objectSounds,
	grid,
	setGrid,
	steps,
	selectedInstrument,
	selected,
	masterVolume,
}) => {
	const [currButton, setCurrButton] = useState(0);
	const [instrument, setInstrument] = useState("");
	const [open, setOpen] = useState(false);
	const closeModal = () => setOpen(false);

	useEffect(() => {
		console.log(instrument);
	}, [selectedInstrument]);

	// if button.instrument is selected
	const toggleActivation = (row, col) => {
		if (selected === "SELECTED") {
			setOpen(true);
		} else {
			const gridCopy = [...grid];
			const { triggered, activated } = gridCopy[row][col];
			let button = gridCopy[row][col];
			button = {
				triggered,
				activated,
				audio: beat,
			};
			if (!button.instrument && !button.activated) {
				setInstrument(selectedInstrument);
				button.instrument = instrument; // why is this not being retained
				button.activated = !activated; // true
				console.log("THIS IS instrument", instrument);
			} else if (instrument === selectedInstrument) {
				console.log("activated and same instrument");
				console.log("!button.activated", !button.activated);
				button.activated = !button.activated;
			} else if (instrument !== selectedInstrument) {
				console.log(
					"instrument",
					instrument,
					"selectedInstrument",
					selectedInstrument
				);
				console.log("activated and change instrument");
				button.activated = activated;
			}
			gridCopy[row][col] = button;
			setGrid(gridCopy);
		}
	};

	player.volume.value = masterVolume;

	//this is what goes through the loop and triggers each row
	//if a button is triggered and already activated (by user) then it plays the sample
	const nextButton = (currButton) => {
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				const { activated, audio } = grid[i][j];
				grid[i][j] = { activated, triggered: j === currButton, audio };

				if (grid[i][j].triggered && grid[i][j].activated && grid[i][j].audio) {
					//plays the sound associated with the button
					player.player(objectSounds[grid[i][j].audio]).start();
				}
			}
		}
		setGrid(grid);
	};

	//timer of the loop, sets what rows are triggered
	useEffect(() => {
		const timer = setTimeout(() => {
			if (playing) {
				setCurrButton((currButton + 1) % steps);
				nextButton(currButton);
			}
			//use line below to control speed of timer/works like tempo!
		}, 60000 / bpm); //(60,000 / bpm = milliseconds for 1/4 notes)
		return () => {
			clearTimeout(timer);
		};
	}, [currButton, playing]);

	return (
		<div className="">
			<Grid
				grid={grid}
				toggleActivation={toggleActivation}
				selectedInstrument={selectedInstrument}
			/>
			<Popup
				open={open}
				closeOnDocumentClick
				onClose={closeModal}
				className="popup-content"
			>
				<div className="grid bg-oxford_blue place-items-center">
					<p className="text-4xl mt-10 mb-5">PLEASE SELECT A SOUND!</p>
					<p className="mb-10">click anywhere to close</p>
				</div>
			</Popup>
		</div>
	);
};

export default Looper;
