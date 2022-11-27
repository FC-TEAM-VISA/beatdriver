import React, { useState } from "react";
import { Knob } from "primereact/knob";
// chorus, phaser, reverb, tremolo + mute effect button

function EffectsMenu() {
  const [value, setValue] = useState(0);

  return (
    <div className="grid col-span-4 place-items-center p-5 scrollbar scrollbar-thumb-red-800 scrollbar-track-mint_cream overflow-y-scroll h-4/5">
      {/* ROW 1 */}
      <div className="grid bg-violet-600 p-5">
        <div className="flex place-items-center">
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
            <label className="col-span-1 text-sm">VOLUME</label>
          </div>
        </div>
      </div>
      {/* ROW 2 */}
      <div className="grid bg-green-700 p-5 mt-5">
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
