import React, { useState, useEffect } from "react";
import Grid from "./Grid";

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

  const toggleActivation = (row, col) => {
    if (selected === "SELECTED") {
      window.alert("PLEASE SELECT A SOUND");
    } else {
      const gridCopy = [...grid];
      const { triggered, activated } = gridCopy[row][col];
      gridCopy[row][col] = { triggered, activated: !activated, audio: beat };
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
    </div>
  );
};

export default Looper;
