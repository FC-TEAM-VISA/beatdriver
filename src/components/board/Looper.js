import Tuna from "tunajs";
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
  soundArray,
}) => {
  const [currButton, setCurrButton] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  //audio things
  let audioContext = new AudioContext();
  //   let tuna = new Tuna(audioContext);
  const source = audioContext.createBufferSource();
  const volume = audioContext.createGain();
  volume.gain.value = 0;
  source.connect(volume);
  const [samples, setSamples] = useState([]);

  const getSample = async (filepath) => {
    const res = await fetch(filepath);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  const setupSamples = async (paths) => {
    console.log("context created");
    console.log("setting up samples");

    const audioBuffers = [];

    for (const path of paths) {
      const sample = await getSample(path);
      audioBuffers.push(sample);
    }
    console.log("setup complete");
    return audioBuffers;
  };

  useEffect(() => {
    setupSamples(soundArray).then((res) => {
      setSamples(res);
      console.log("samples created", samples);
    });
  }, [soundArray, beat]);

  const playAudio = (audioBuffer, startTime) => {
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(startTime);
  };

  //end audio things

  const toggleActivation = (row, col) => {
    if (selected === "SELECTED") {
      setOpen(true);
    } else {
      const gridCopy = [...grid];
      const { triggered, activated } = gridCopy[row][col];
      gridCopy[row][col] = { triggered, activated: !activated, audio: beat };
      setGrid(gridCopy);
    }
  };

  //   player.volume.value = masterVolume;

  //this is what goes through the loop and triggers each row
  //if a button is triggered and already activated (by user) then it plays the sample
  const nextButton = (currButton) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const { activated, audio } = grid[i][j];
        grid[i][j] = { activated, triggered: j === currButton, audio };

        if (
          grid[i][j].triggered &&
          grid[i][j].activated &&
          grid[i][j].audio !== ""
        ) {
          //plays the sound associated with the button
          //   player.player(objectSounds[grid[i][j].audio]).start();
          console.log("audioContext", audioContext);
          console.log("samples", samples);
          console.log("index", samples[grid[i][j].audio]);
          console.log("button", grid[i][j].audio);
          playAudio(samples[grid[i][j].audio], 0);
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
