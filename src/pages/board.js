import React, { useRef, useState } from "react";
import Looper from "../components/board/looper";
import AudioPlayer from "../components/board/audioPlayer";

const Board = () => {
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
  const [bpm, setBpm] = useState(120);

  return (
    <>
      <label>Beat:</label>
      <select name="beat" onChange={(e) => setBeat(e.target.value)}>
        <option value="./samples/drums/clap-808.wav">clap-808</option>
        <option value="./samples/drums/clap-analog.wav">clap-analog</option>
        <option value="./samples/drums/clap-crushed.wav">clap-crushed</option>
      </select>

      <label>BPM:</label>
      <input
        type="range"
        min="50"
        max="300"
        onChange={(e) => setBpm(e.target.value)}
      />
      <output>{bpm}</output>

      <AudioPlayer beat={beat} bpm={bpm}>
        {({ player }) => {
          if (!player) {
            return <p>loading....</p>;
          }
          return <Looper player={player} bpm={bpm} />;
        }}
      </AudioPlayer>
    </>
  );
};

export default Board;
