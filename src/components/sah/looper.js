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
];

const Looper = ({ player }) => {
  const [grid, setGrid] = useState(initialGrid);
  const [playing, setPlaying] = useState(false);
  const [currButton, setCurrButton] = useState(0);
  const [sound, setSound] = useState("./samples/drums/tom-808.wav");

  //turns button on and off
  const toggleActivation = (row, col) => {
    const gridCopy = [...grid];
    const { triggered, activated } = gridCopy[row][col];
    gridCopy[row][col] = { triggered, activated: !activated };
    setGrid(gridCopy);
  };

  const pickSound = (sound) => {
    setSound(sound);
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
          player.player(sounds[i]).start();
          // player.player(sound).start();
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
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [currButton, playing]);

  return (
    <>
      <div>
        <PlayButton
          playing={playing}
          onClick={() => {
            setPlaying(!playing);
            Tone.start();
          }}
        />
      </div>
      <div>
        <Grid grid={grid} toggleActivation={toggleActivation} />
      </div>
    </>
  );
};

export default Looper;
