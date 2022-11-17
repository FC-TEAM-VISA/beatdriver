import React, { useEffect, useRef, useState, useCallback } from "react";
import * as Tone from "tone";
import Looper from "../components/board/looper";
import AudioPlayer from "../components/board/audioPlayer";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";

//firebase imports
import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { database } from "../../utils/firebase";

/* THE BOARD*/
const steps = 8;
const buttonState = { triggered: false, activated: false, audio: "" };
const sounds = [
  ["1", "2", "3", "4", "5", "6", "7", "8"],
  ["9", "10", "11", "12", "13", "14", "15", "16"],
  ["17", "18", "19", "20", "21", "22", "23", "24"],
  ["25", "26", "27", "28", "29", "30", "31", "32"],
  ["33", "34", "35", "36", "37", "38", "39", "40"],
];

//sets up how big the grid will be
const initialGrid = [
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
];

const Board = () => {
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
  const [bpm, setBpm] = useState(120);
  const [uniqueID, setUniqueID] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [objectSounds, setObjectSounds] = useState({
    "./samples/drums/clap-808.wav": "./samples/drums/clap-808.wav",
  });
  const [grid, setGrid] = useState(initialGrid);

  const handleSave = async () => {
    if (!uniqueID) {
      const newProject = await addDoc(collection(database, "project"), {
        timestamp: serverTimestamp(),
        name: "Untitled",
        grid: {},
        bpm: +bpm,
      });
      setUniqueID(newProject.id);
    } else {
      await updateDoc(doc(database, "project", `${uniqueID}`), {
        timestamp: serverTimestamp(),
        grid: {
          r1: grid[0],
          r2: grid[1],
          r3: grid[2],
          r4: grid[3],
          r5: grid[4],
        },
        bpm: +bpm,
      });
    }
  };

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
            <BiSave className="mt-4 mr-3 ml-2" onClick={() => handleSave()} />
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
                  steps={steps}
                  sounds={sounds}
                  grid={grid}
                  setGrid={setGrid}
                  uniqueID={uniqueID}
                  handleSave={handleSave}
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
