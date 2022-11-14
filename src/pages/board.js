import React, { useRef, useState } from "react";
import Looper from "../components/board/looper";
import AudioPlayer from "../components/board/audioPlayer";

const Board = () => {
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
  const [bpm, setBpm] = useState(120);

  return (
    <>
      <div className="grid grid-cols-12">
        {/* TOOLBAR */}
        <div className="flex flex-grow col-span-9 bg-teal-800">
          <div className="p-2">
            {/* DROPDOWN */}
            <label>Beat:</label>
            <select name="beat" onChange={(e) => setBeat(e.target.value)}>
              <option value="./samples/drums/clap-808.wav">clap-808</option>
              <option value="./samples/drums/clap-analog.wav">
                clap-analog
              </option>
              <option value="./samples/drums/clap-crushed.wav">
                clap-crushed
              </option>
            </select>
          </div>

          <div className="p-2">
            {/* BPM */}
            <label className="p-2">BPM:</label>
            <input
              type="range"
              min="50"
              max="300"
              onChange={(e) => setBpm(e.target.value)}
            />
            <output className="p-1">{bpm}</output>
          </div>
        </div>

        <div className="col-span-9">
          <AudioPlayer beat={beat} bpm={bpm}>
            {({ player }) => {
              if (!player) {
                return <p>loading....</p>;
              }
              return <Looper player={player} bpm={bpm} />;
            }}
          </AudioPlayer>
        </div>

        <div className="col-span-3">
          <div className="bg-blue-200 h-full col-span-2">
            <div className=" bg-purple-400"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
