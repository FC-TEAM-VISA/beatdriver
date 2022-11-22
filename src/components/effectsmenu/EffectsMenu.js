import React, { useState } from "react";
import { Knob } from "primereact/knob";

function EffectsMenu() {
  const [value, setValue] = useState(0);

  return (
    <div className="h-20 col-span-2 grid place-items-center p-5">
      {/* ROW 1 */}
      <div className="flex bg-violet-600 p-5">
        <h6 className="text-xs">ROW 1</h6>
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
      {/* ROW 2 */}
      <div className="flex bg-green-700 p-5 mt-2">
        <h6 className="text-xs">ROW 2</h6>
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
      {/* ROW 3 */}
      <div className="flex bg-blue-500 p-5 mt-2">
        <h6 className="text-xs">ROW 3</h6>
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
      {/* ROW 4 */}
      <div className="flex bg-red-700 p-5 mt-2">
        <h6 className="text-xs">ROW 4</h6>
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
      {/* ROW 5 */}
      <div className="flex bg-cyan-900 p-5 mt-2">
        <h6 className="text-xs">ROW 5</h6>
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
  );
}

export default EffectsMenu;
