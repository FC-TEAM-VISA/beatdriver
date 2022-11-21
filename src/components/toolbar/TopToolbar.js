import * as Tone from "tone";
import React from "react";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import SoundMenu from "../soundmenu/SoundMenu";
import LoadMenu from "../loadmenu/LoadMenu";

function TopToolbar({
  beat,
  projects,
  setGrid,
  setUniqueID,
  uniqueID,
  setBeat,
  handleBeatChange,
  currentUser,
  setSelectedInstrument,
  playing,
  setPlaying,
  bpm,
  setBpm,
  selected,
  setSelected,
  user,
  handleSave,
  togglePlaying,
}) {
  return (
    <div className="flex">
      <div className=" bg-teal-800 ml-3">
        <button onClick={togglePlaying}>
          {playing ? (
            <BsStopFill className="text-white bg-teal-800 h-12 w-12 p-2" />
          ) : (
            <BsFillPlayFill className="text-white bg-teal-800 h-12 w-12 p-2" />
          )}
        </button>
      </div>
      <div>
        <BiSave
          className="mt-4 mr-3 ml-2 cursor-pointer"
          onClick={() =>
            user
              ? handleSave()
              : window.alert("LOG IN OR SIGN UP TO SAVE A PROJECT")
          }
        />
      </div>
      <LoadMenu
        projects={projects}
        setGrid={setGrid}
        setUniqueID={setUniqueID}
        uniqueID={uniqueID}
      />
      <div>
        <button
          onClick={() => {
            setGrid(initialGrid);
            setObjectSounds({
              "./samples/drums/clap-808.wav": "./samples/drums/clap-808.wav",
            });
          }}
          className="mt-1 mx-2 border-2 p-1 bg-red-900 hover:bg-red-600 border-white"
        >
          CLEAR BOARD
        </button>
      </div>

      <div className="p-2 mx-4 mt-1 col-span-1">
        <label className="pr-2">SOUNDS:</label>
        <SoundMenu
          beat={beat}
          handleBeatChange={handleBeatChange}
          setBeat={setBeat}
          currentUser={currentUser}
          setSelectedInstrument={setSelectedInstrument}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <div className="p-2">
        {/* BPM */}
        <label className="p-2">BPM:</label>
        <input
          type="range"
          min="50"
          defaultValue="120"
          max="300"
          onChange={(e) => setBpm(e.target.value)}
        />
        <output className="p-1">{bpm}</output>
      </div>
    </div>
  );
}

export default TopToolbar;
