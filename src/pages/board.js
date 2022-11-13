import React, { useRef, useState } from "react";
import Looper from "../components/board/looper";
import AudioPlayer from "../components/board/audioPlayer";

const Board = () => {
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
  return (
    <>
      <label>Beat:</label>
      <select name="beat" onChange={(e) => setBeat(e.target.value)}>
        <option value="./samples/drums/clap-808.wav">clap-808</option>
        <option value="./samples/drums/clap-analog.wav">clap-analog</option>
        <option value="./samples/drums/clap-crushed.wav">clap-crushed</option>
      </select>
      <label>Tempo:</label>
      

      <AudioPlayer beat={beat}>
        {({ player }) => {
          if (!player) {
            return <p>loading....</p>;
          }
          return <Looper player={player} />;
        }}
      </AudioPlayer>
    </>
  );
};

export default Board;
