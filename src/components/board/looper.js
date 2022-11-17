import React, { useState, useEffect } from "react";
import Grid from "./grid";
import * as Tone from "tone";
import { Player } from "tone";

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../../../utils/firebase";

const Looper = ({
  player,
  bpm,
  playing,
  beat,
  objectSounds,
  grid,
  setGrid,
  sounds,
  steps,
  uniqueID,
  handleSave,
}) => {
  // const [playing, setPlaying] = useState(false);
  const [currButton, setCurrButton] = useState(0);

  // console.log(beat, "BEAT ");
  const dbProject = doc(database, "project", `${uniqueID}`);
  console.log("I am project: ", dbProject);

  const toggleActivation = (row, col) => {
    const gridCopy = [...grid];
    const { triggered, activated } = gridCopy[row][col];
    gridCopy[row][col] = { triggered, activated: !activated, audio: beat };
    setGrid(gridCopy);
  };

  //this is what goes through the loop and triggers each row
  //if a button is triggered and already activated (by user) then it plays the sample
  const nextButton = (currButton) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const { activated, audio } = grid[i][j];
        grid[i][j] = { activated, triggered: j === currButton, audio };

        if (grid[i][j].triggered && grid[i][j].activated && grid[i][j].audio) {
          // Tone.context.lookAhead = 0;
          //plays the sound associated with the button

          player.player(objectSounds[grid[i][j].audio]).start();
          // player.start();
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
    <>
      <div className="">
        <Grid grid={grid} toggleActivation={toggleActivation} />
      </div>
    </>
  );
};

export default Looper;
