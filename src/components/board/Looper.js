import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const toggleActivation = (row, col) => {
    if (selected === "SELECTED") {
      window.alert("PLEASE SELECT A SOUND");
    } else {
      const gridCopy = [...grid];
      const { triggered, activated } = gridCopy[row][col];
      gridCopy[row][col] = {
        triggered,

        activated: !activated,

        audio: beat,
        chorus: 10,
        reverb: 0.5,
        volume: 0,
        gain: 0,
      };
      setGrid(gridCopy);
    }
  };

  player.volume.value = masterVolume;

  //this is what goes through the loop and triggers each row
  //if a button is triggered and already activated (by user) then it plays the sample
  const nextButton = (currButton) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const { activated, audio, reverb, chorus, volume } = grid[i][j];

        grid[i][j] = {
          activated,
          triggered: j === currButton,
          audio,
          reverb,
          chorus,
          volume,
        };

        if (grid[i][j].triggered && grid[i][j].activated && grid[i][j].audio) {
          //IDK WHY this is UNDEFINED:
          console.log("CHORUS", objectSounds[grid[i][j].chorus]);

          player
            .player(objectSounds[grid[i][j].audio])
            //since objectSounds[grid[i][j].chorus] is undefined replace what in the .chain() with
            // .chain(new Tone.Chorus(80).toDestination(), new Tone.Reverb(.5).toDestination()) and this should effect the sound, delete the .toDestination() below if you add the effects w the toDestinations

            .chain(new Tone.Chorus(objectSounds[grid[i][j].chorus]))
            .toDestination()

            .start();
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
