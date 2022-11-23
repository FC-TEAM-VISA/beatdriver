import React, { useState } from "react";
import { Knob } from "primereact/knob";

function EffectsMenu() {
  const [value, setValue] = useState(0);
  return (
    <div className="grid col-span-4 place-items-center p-5 scrollbar-thin scrollbar-thumb-pewter_blue scrollbar-track-mint_cream overflow-y-scroll h-4/5">
      {/* ROW 1 */}
      <div className="grid bg-violet-600 p-5">
        <div className="mb-2">
          <label className="text-sm mr-2">ROW 1</label>
          <select name="node" id="row1" className="text-sm">
            <option value="row1node1">1</option>
            <option value="row1node2">2</option>
            <option value="row1node3">3</option>
            <option value="row1node4">4</option>
            <option value="row1node5">5</option>
            <option value="row1node6">6</option>
            <option value="row1node7">7</option>
            <option value="row1node8">8</option>
          </select>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
            <Knob
              size={60}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={value}
              onChange={(e) => setValue(e.value)}
            />
            <label className="col-span-1 text-sm">VOLUME</label>
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
          <div className="field col-12 md:col-4 p-1">
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
