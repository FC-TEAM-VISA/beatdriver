import React, { useRef, useState } from "react";
import * as Tone from "tone";
import Looper from "../components/board/looper";
import AudioPlayer from "../components/board/audioPlayer";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import Sounds from "../components/soundmenu/Sounds";

const Board = () => {
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [objectSounds, setObjectSounds] = useState({
    selected: "./samples/drums/clap-808.wav",
  });

  const handleBeatChange = (e) => {
    if (!objectSounds[e.target.value]) {
      let copyObject = { ...objectSounds };
      copyObject[e.target.value] = e.target.value;
      setObjectSounds(copyObject);
    }
    setBeat(e.target.value);
  };

  return (
    <>
      <div className="grid grid-cols-12 text-xl">
        {/* TOOLBAR */}
        <div className="flex flex-grow col-span-9 bg-teal-800">
          <div className="flex bg-teal-800 ml-3">
            <button
              onClick={() => {
                setPlaying(!playing);
                Tone.start();
              }}
            >
              {playing ? (
                <BsStopFill className="text-white bg-teal-800 h-12 w-12 p-2" />
              ) : (
                <BsFillPlayFill className="text-white bg-teal-800 h-12 w-12 p-2" />
              )}
            </button>
          </div>
          <div>
            <BiSave className="mt-4 mr-3 ml-2 cursor-pointer" />
          </div>
          <div>
            <button className="mt-1 mx-2 border-2 p-1 bg-red-900 hover:bg-red-600 border-white">
              CLEAR BOARD
            </button>
          </div>
          <div className="p-2">
            {/* DROPDOWN */}
            <label className="p-2">BEAT:</label>
            <select
              className="p-1"
              name="beat"
              onChange={(e) => {
                handleBeatChange(e);
              }}
            >
              <option value="./samples/drums/clap-808.wav">clap-808</option>
              <option value="./samples/drums/clap-analog.wav">
                clap-analog
              </option>
              <option value="./samples/drums/clap-crushed.wav">
                clap-crushed
              </option>
            </select>
          </div>

          <div className="p-2 mx-4 mt-1">
            <label className="pr-2">BEAT:</label>
            <Sounds beat={beat} handleBeatChange={handleBeatChange} />
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
          <AudioPlayer objectSounds={objectSounds} bpm={bpm}>
            {({ player }) => {
              if (!player) {
                return <p>loading....</p>;
              }
              return (
                <Looper
                  player={player}
                  bpm={bpm}
                  playing={playing}
                  beat={beat}
                  objectSounds={objectSounds}
                />
              );
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
