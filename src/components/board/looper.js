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

// const initialGrid = [
//   buttonState,
//   buttonState,
//   buttonState,
//   buttonState,
//   buttonState,
//   buttonState,
//   buttonState,
//   buttonState,
// ];

const Looper = ({ player }) => {
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
        const { triggered, activated } = grid[i][j];
        grid[i][j] = { activated, triggered: j === currButton };
        if (triggered && activated) {
          //plays the sound associated with the button
          player.player(sounds[i]).start(Tone.context.currentTime);
          // player.player(sound).start();
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
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [currButton, playing]);

  return (
    <>
      <div>
        <Grid grid={grid} toggleActivation={toggleActivation} />
      </div>
      <div className="w-10 h-3">
        {/* <PlayButton
          playing={playing}
          onClick={() => {
            setPlaying(!playing);
            Tone.start();
          }}
        /> */}
      </div>
    </>
  );
};

export default Looper;
