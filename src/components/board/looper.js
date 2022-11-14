import React, { useState, useEffect } from "react";
import Grid from "./grid";
import * as Tone from "tone";
import PlayButton from "./playButton";

const steps = 8;
const buttonState = { triggered: false, activated: false };
const sounds = ["boom", "metal", "clean", "cc", "col5", "col6"];

//sets up how big the grid will be
const initialGrid = [
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
];

const Looper = ({ player, bpm }) => {
  const [grid, setGrid] = useState(initialGrid);
  const [playing, setPlaying] = useState(false);
  const [currButton, setCurrButton] = useState(0);

  //turns button on and off
  // const toggleActivation = (index) => {
  //   const gridCopy = [...grid];
  //   const { triggered, activated } = gridCopy[index];
  //   gridCopy[index] = { triggered, activated: !activated };
  //   setGrid(gridCopy);
  // };
  const toggleActivation = (row, col) => {
    const gridCopy = [...grid];
    const { triggered, activated } = gridCopy[row][col];
    gridCopy[row][col] = { triggered, activated: !activated };
    setGrid(gridCopy);
  };

  //this is what goes through the loop and triggers each row
  //if a button is triggered and already activated (by user) then it plays the sample
  const nextButton = (currButton) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const { activated } = grid[i][j];
        grid[i][j] = { activated, triggered: j === currButton };

        console.log("GRID", grid[i][j]);
        if (grid[i][j].triggered && grid[i][j].activated) {
          // Tone.context.lookAhead = 0;
          //plays the sound associated with the button
          player.player(sounds[i]).start();
        }
      }
    }
    setGrid(grid);
  };

  // const nextButton = (currButton) => {
  //   for (let i = 0; i < grid.length; i++) {
  //     const { triggered, activated } = grid[i];
  //     grid[i] = { activated, triggered: i === currButton };
  //     if (triggered && activated) {
  //       //plays the sound associated with the button
  //       player.player(sounds[i]).start();
  //       // player.player(sound).start();
  //     }
  //   }
  //   setGrid(grid);
  // };

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
      <div>
        <Grid grid={grid} toggleActivation={toggleActivation} />
      </div>
      <div className="flex flex-grow col-span-9 bg-teal-800">
        PLAYBAR
        <div className="w-10 h-3">
          <PlayButton
            playing={playing}
            onClick={() => {
              setPlaying(!playing);
              Tone.start();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Looper;
