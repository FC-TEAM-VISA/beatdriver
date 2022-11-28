import Tuna from "tunajs";
import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  phaser,
  tremolo,
  moog,
}) => {
  const [currButton, setCurrButton] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  //audio things
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

  let tunaPhaser;
  let tunaChorus;
  let tunaMoog;
  let tunaTremolo;

  if (tuna) {
    tunaChorus = new tuna.Chorus({
      rate: chorus.rate,
      feedback: chorus.feedback,
      delay: chorus.delay,
      bypass: 0,
    });

    tunaPhaser = new tuna.Phaser({
      rate: phaser.rate, //0.01 to 8 is a decent range, but higher values are possible
      depth: phaser.depth, //0 to 1
      feedback: phaser.feedback, //0 to 1+
      stereoPhase: phaser.stereoPhase, //0 to 180
      baseModulationFrequency: phaser.baseModulationFrequency, //500 to 1500
      bypass: 0,
    });

    tunaTremolo = new tuna.Tremolo({
      intensity: tremolo.intensity, //0 to 1
      rate: tremolo.rate, //0.001 to 8
      stereoPhase: tremolo.stereoPhase, //0 to 180
      bypass: 0,
    });

    tunaMoog = new tuna.MoogFilter({
      cutoff: moog.cutoff, //0 to 1
      resonance: moog.resonance, //0 to 4
      bufferSize: 4096, //256 to 16384
    });
  }

  const playAudio = (audioBuffer, startTime) => {
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    const volume = audioContext.createGain();

    volume.gain.value = masterVolume;
    source.connect(volume);
    volume.connect(tunaChorus);
    tunaChorus.connect(tunaPhaser);
    tunaPhaser.connect(tunaTremolo);
    // tunaTremolo.connect(tunaMoog);
    // tunaMoog.connect(tunaWah);
    tunaTremolo.connect(audioContext.destination);
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

  // player.volume.value = masterVolume;

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
