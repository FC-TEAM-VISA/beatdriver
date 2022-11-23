import React, { useState, useEffect } from "react";
import { Knob } from "primereact/knob";
import { json } from "react-router-dom";

function EffectsMenu({
  setGrid,
  grid,
  rowOneVolume,
  setRowOneVolume,
  rowOneReverb,
  setRowOneReverb,
  rowOneChorus,
  setRowOneChorus,
  rowOneGain,
  setRowOneGain,
}) {
  const [value, setValue] = useState(0);
  const [b1Index, setB1Index] = useState(0);
  let rowOneIndex;
  let rowOneButton;
  // console.log(rowOneVolume, rowOneGain, rowOneChorus, rowOneReverb);

  const handleRowOneDropdown = (event) => {
    const values = JSON.parse(event.target.value);
    rowOneButton = values.button;
    rowOneIndex = values.index;
    setB1Index(values.index);
    console.log("HELLO", rowOneButton, rowOneIndex);
    setRowOneVolume(rowOneButton.volume);
  };

  // console.log("b", b1);
  console.log("🎹", rowOneVolume);

  // console.log(rowOneVolume);

  const handleVolume = () => {
    // console.log("testing", b1, b1.volume);
    const gridCopy = [...grid];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const { triggered, activated, audio, gain, chorus, reverb } =
          gridCopy[i][j];
        if (j === b1Index) {
          console.log(i, b1Index);
          gridCopy[i][j] = {
            triggered,
            activated,
            audio,
            volume: rowOneVolume,
            gain,
            chorus,
            reverb,
          };
          console.log(grid[i][b1Index]);
        }
      }
    }
    setGrid(gridCopy);
    // grid[0].forEach((button, i) => {
    //   const { triggered, activated, audio, gain, chourse, reverb } = button;
    //   if (i === rowOneIndex) {
    //     button = {
    //       triggered,
    //       activated,
    //       audio,
    //       volume: rowOneVolume,
    //       gain,
    //       chourse,
    //       reverb,
    //     };
    //   }
    //   console.log(button);
    // });
  };

  // grid[0].map((button, index) => {
  //   if (index === rowOneIndex) {
  //     console.log(grid[0][rowOneIndex].volume);
  //     grid[0][rowOneIndex].volume = rowOneVolume;
  //     grid[0][rowOneIndex].gain = rowOneGain;
  //     grid[0][rowOneIndex].chorus = rowOneChorus;
  //     grid[0][rowOneIndex].reverb = rowOneReverb;
  //   }
  // });

  useEffect(() => {
    handleVolume();
  }, [rowOneVolume, rowOneReverb, rowOneGain, rowOneChorus]);

  return (
    <div className="grid col-span-4 place-items-center p-5 scrollbar scrollbar-thumb-red-800 scrollbar-track-mint_cream overflow-y-scroll h-4/5">
      {/* ROW 1 */}
      <div className="grid bg-violet-600 p-5">
        <div className="mb-2">
          <label className="text-sm mr-2">ROW 1</label>
          <select
            name="node"
            id="row1"
            className="text-sm"
            onChange={(e) => {
              handleRowOneDropdown(e);
            }}
          >
            {grid[0]?.map((button, index) => {
              return (
                <option key={index} value={JSON.stringify({ button, index })}>
                  {index + 1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex place-items-center">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={-40}
              max={20}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={rowOneVolume}
              onChange={(e) => {
                setRowOneVolume(e.value);
              }}
            />
            <label className="col-span-1 text-sm">VOLUME</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={rowOneGain}
              onChange={(e) => setRowOneGain(e.value)}
            />
            <label className="col-span-1 text-sm">GAIN</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={rowOneChorus}
              onChange={(e) => setRowOneChorus(e.value)}
            />
            <label className="col-span-1 text-sm">CHORUS</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={rowOneReverb}
              onChange={(e) => setRowOneReverb(e.value)}
            />
            <label className="col-span-1 text-sm">REVERB</label>
          </div>
        </div>
      </div>
      {/* ROW 2 */}
      <div className="grid bg-green-700 p-5 mt-5">
        <div className="mb-2">
          <label className="text-sm mr-2">ROW 2</label>
          <select name="node" id="row1" className="text-sm">
            <option value="row1node1">1</option>
            <option value="row1node2">1</option>
            <option value="row1node3">1</option>
            <option value="row1node4">1</option>
            <option value="row1node5">1</option>
            <option value="row1node6">1</option>
            <option value="row1node7">1</option>
            <option value="row1node8">1</option>
          </select>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm ">REVERB</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">GAIN</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">CHORUS</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">BPM</label>
          </div>
        </div>
      </div>
      {/* ROW 3 */}
      <div className="grid bg-blue-500 p-5 mt-5">
        <div className="mb-2">
          <label className="text-sm mr-2">ROW 3</label>
          <select name="node" id="row1" className="text-sm">
            <option value="row1node1">1</option>
            <option value="row1node2">1</option>
            <option value="row1node3">1</option>
            <option value="row1node4">1</option>
            <option value="row1node5">1</option>
            <option value="row1node6">1</option>
            <option value="row1node7">1</option>
            <option value="row1node8">1</option>
          </select>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm ">REVERB</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">GAIN</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">CHORUS</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">BPM</label>
          </div>
        </div>
      </div>
      {/* ROW 4 */}
      <div className="grid bg-red-700 p-5 mt-5">
        <div className="mb-2">
          <label className="text-sm mr-2">ROW 4</label>
          <select name="node" id="row1" className="text-sm">
            <option value="row1node1">1</option>
            <option value="row1node2">1</option>
            <option value="row1node3">1</option>
            <option value="row1node4">1</option>
            <option value="row1node5">1</option>
            <option value="row1node6">1</option>
            <option value="row1node7">1</option>
            <option value="row1node8">1</option>
          </select>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm ">REVERB</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">GAIN</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">CHORUS</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">BPM</label>
          </div>
        </div>
      </div>
      {/* ROW 5 */}
      <div className="grid bg-cyan-900 p-5 mt-5">
        <div className="mb-2">
          <label className="text-sm mr-2">ROW 5</label>
          <select name="node" id="row1" className="text-sm">
            <option value="row1node1">1</option>
            <option value="row1node2">1</option>
            <option value="row1node3">1</option>
            <option value="row1node4">1</option>
            <option value="row1node5">1</option>
            <option value="row1node6">1</option>
            <option value="row1node7">1</option>
            <option value="row1node8">1</option>
          </select>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm ">REVERB</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">GAIN</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">CHORUS</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">BPM</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EffectsMenu;
