import React, { useState, useEffect } from "react";
import * as Tone from "tone";
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
  setTestyTest,
  setChorusTest,
}) => {
  const [currButton, setCurrButton] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const toggleActivation = (row, col) => {
    if (selected === "SELECTED") {
      setOpen(true);
    } else {
      const gridCopy = [...grid];
      const { triggered, activated, volume, gain, chorus, reverb } =
        gridCopy[row][col];
      gridCopy[row][col] = {
        triggered,
        activated: !activated,
        audio: beat,
        volume: 0,
        gain: 0,
        chorus: 0,
        reverb: 1,
      };
      setGrid(gridCopy);
    }
  };

  // player.volume.value = masterVolume;
  player.volume.value = masterVolume;

  //this is what goes through the loop and triggers each row
  //if a button is triggered and already activated (by user) then it plays the sample
  const nextButton = (currButton) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const { activated, audio, volume, gain, reverb, chorus } = grid[i][j];
        grid[i][j] = {
          activated,
          triggered: j === currButton,
          audio,
          volume,
          gain,
          reverb,
          chorus,
        };

        if (grid[i][j].triggered && grid[i][j].activated && grid[i][j].audio) {
          //plays the sound associated with the button
          player.player(objectSounds[grid[i][j].audio]).reverb =
            grid[i][j].reverb;
          player.player(objectSounds[grid[i][j].audio]).chorus =
            grid[i][j].chorus;

          const toneReverb = new Tone.Reverb({ decay: grid[i][j].reverb });
          const toneChorus = new Tone.Chorus(6, 1.5, 2);
          console.log("MAIN PLAYER 💯💯💯💯💯💯💯", player);
          console.log(
            "INDIVIDUAL PLAYER 👍👍👍👍👍👍👍👍",
            player.player(objectSounds[grid[i][j].audio])
          );
          setTestyTest(grid[i][j].reverb);
          setChorusTest(grid[i][j].chorus);

          player
            .player(objectSounds[grid[i][j].audio])
            .chain(toneReverb, toneChorus, Tone.Destination)
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
      ;
    </div>
  );
};

export default Looper;
