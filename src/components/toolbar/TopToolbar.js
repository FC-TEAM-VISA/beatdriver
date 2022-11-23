import React, { useState } from "react";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { Knob } from "primereact/knob";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SoundMenu from "../soundmenu/SoundMenu";
import LoadMenu from "../loadmenu/LoadMenu";
import ElementMaker from "./ElementMaker";
import Recorder from "../recorder/Recorder";

function TopToolbar({
  beat,
  projects,
  grid,
  setGrid,
  setUniqueID,
  uniqueID,
  setBeat,
  handleBeatChange,
  // handleClear,
  currentUser,
  setSelectedInstrument,
  playing,
  player,
  bpm,
  setBpm,
  selected,
  setSelected,
  user,
  handleSave,
  togglePlaying,
  name,
  setName,
  masterVolume,
  setMasterVolume,
}) {
  const [showInputEle, setShowInputEle] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const handleClear = () => {
    const gridCopy = [...grid];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        gridCopy[i][j] = {
          triggered: false,
          activated: false,
          audio: "",
        };
      }
    }
    setGrid(gridCopy);
  };

  const notLoggedIn = () => (user ? handleSave() : setOpen(true));

  return (
		<div className="flex flex-grow cursor-pointer place-items-center space-x-6">
			{/* PROJECT TITLE */}
			<div className="">
				<ElementMaker
					value={name}
					handleChange={(e) => setName(e.target.value)}
					handleDoubleClick={() => setShowInputEle(true)}
					handleBlur={() => setShowInputEle(false)}
					showInputEle={showInputEle}
				/>
			</div>
			{/* RECORDER */}
			<div>
				<Recorder player={player} togglePlaying={togglePlaying} name={name} />
			</div>
			{/* PLAY BUTTON */}
			<div className="">
				<button onClick={togglePlaying}>
					{playing ? (
						<BsStopFill className="text-white hover:text-blue-500 h-12 w-12" />
					) : (
						<BsFillPlayFill className="text-white h-12 w-12" />
					)}
				</button>
			</div>
			{/* SAVE BUTTON */}
			<div>
				<BiSave className="h-20 w-8 hover:blue-800" onClick={notLoggedIn} />
			</div>
			<Popup
				open={open}
				closeOnDocumentClick
				onClose={closeModal}
				className="popup-content"
			>
				<div className="grid bg-oxford_blue place-items-center">
					<p className="text-4xl mt-10 mb-5">
						PLEASE LOG IN OR SIGN UP TO SAVE YOUR PROJECT!
					</p>
					<p className="mb-10">click anywhere to close</p>
				</div>
			</Popup>
			{/* LOAD MENU */}
			<div className="">
				<LoadMenu
					projects={projects}
					setGrid={setGrid}
					setUniqueID={setUniqueID}
					uniqueID={uniqueID}
					setName={setName}
				/>
			</div>

			{/* SOUND MENU */}
			<div className="">
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
			{/* BPM */}
			<div className="grid grid-cols-1 m-2 place-items-center">
				<Knob
					size={60}
					value={bpm}
					min={50}
					max={300}
					valueColor={"MediumPurple"}
					rangeColor={"White"}
					textColor={"White"}
					onChange={(e) => setBpm(e.value)}
				/>
				<label className="col-span-1 text-sm">BPM</label>
			</div>
			{/* MASTER VOLUME */}
			<div className="grid grid-cols-1 m-2 place-items-center">
				<Knob
					size={60}
					value={masterVolume}
					valueTemplate={"{value}%"}
					min={-70}
					max={20}
					valueColor={"MediumPurple"}
					rangeColor={"White"}
					textColor={"White"}
					onChange={(e) => setMasterVolume(e.value)}
				/>
				<label className="col-span-1 text-sm">MASTER</label>
			</div>
			{/* CLEAR BUTTON */}
			<div>
				<button
					onClick={handleClear}
					className="mt-1 mx-2 border-2 p-2 bg-red-900 hover:bg-red-600 border-white"
				>
					CLEAR
				</button>
			</div>
		</div>
	);
}

export default TopToolbar;
