import Tuna from "tunajs";
import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { InputRightAddon } from "@chakra-ui/react";

let audioContext;
let tuna;
let source;
if (typeof window !== "undefined") {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
  tuna = new Tuna(audioContext);
}

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
  chorus,
}) => {
  const [currButton, setCurrButton] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  //audio things
  const [samples, setSamples] = useState([]);
  let tunaChorus;

  if (tuna) {
  }

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
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    const volume = audioContext.createGain();
    // volume.gain.value = masterVolume;
    // volume.connect(tunaChorus);
    tunaChorus = new tuna.Chorus({
      // rate: chorus.rate,
      // feedback: chorus.feedback,
      // delay: chorus.delay,
      // bypass: 0,
      rate: 4,
      feedback: 0.5,
      delay: 0.5,
      bypass: 0,
    });

    // Create regular Web Audio nodes
    let input = audioContext.createGain();
    let output = audioContext.createGain();
    // input.gain.value = masterVolume;
    volume.gain.value = masterVolume;
    // Use the Tuna node just like regular nodes
    input.connect(tunaChorus);
    tunaChorus.connect(output);
    tunaChorus.connect(volume);

    source.connect(tunaChorus).connect(audioContext.destination);
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
