import React from "react";

function Player({ soundArray }) {
  //   const audioContext = new AudioContext();
  //   const audio = new Audio("./samples/drums/clap-808.wav");
  //   const source = audioContext.createMediaElementSource(audio);
  //   const volume = audioContext.createGain();
  //   volume.gain.value = 1;
  //   source.connect(volume);
  //   volume.connect(audioContext.destination);
  //   source.connect(audioContext.destination);

  //   const play = () => {
  //     if (audioContext.state === "suspended") {
  //       audioContext.resume();
  //     } else {
  //       audio.play();
  //     }
  //   };

  //   const stop = () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };

  //   let audioContext;
  let samples;

  //   const createcont = () => {
  //     audioContext = new AudioContext();
  //     console.log("context created");
  //     console.log(soundArray);
  //   };

  const getSample = async (filepath) => {
    const res = await fetch(filepath);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  const setupSamples = async (paths) => {
    console.log("setting up samples");

    const audioBuffers = [];

    for (const path of paths) {
      const sample = await getSample(path);
      audioBuffers.push(sample);
    }
    console.log("setup complete");
    return audioBuffers;
  };

  const audioPlayer = (audioBuffer, startTime) => {
    //     if (audioContext.state === "suspended") {
    //       audioContext.resume();
    //     } else {
    //       audio.play();
    //     }
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.start(startTime);
    return sampleSource;
  };

  return (
    <div className="grid place-items-center text-5xl">
      {/* <button onClick={play}>play</button>
      <button onClick={() => audio.pause()}>pause</button>
      <button onClick={stop}>stop</button> */}
      {/* <button onClick={createcont}>START CONTEXT</button> */}
      <button
        onClick={() =>
          setupSamples(soundArray).then((res) => {
            samples = res;
            console.log(samples);
          })
        }
      >
        SETUP SAMPLES
      </button>
      <button
        onClick={() => {
          const playing = audioPlayer(samples[0], 0);
          console.log(playing);
        }}
      >
        play
      </button>
    </div>
  );
}

export default Player;
