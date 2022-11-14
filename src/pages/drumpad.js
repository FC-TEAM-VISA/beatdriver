import React, { useRef, useState } from "react";

const steps = 8;
const buttonState = { triggered: false, activated: false };
const grid = [
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
];

const Board = () => {
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
  const [bpm, setBpm] = useState(120);

  return (
    <>
      <div className="grid grid-cols-12">
        {/* TOOLBAR */}
        <div className="flex flex-grow col-span-9 bg-slate-400">
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

        {/*main div for grid */}
        <div className="col-span-9">
          <div className="min-h-screen flex items-center bg-black">
            <div className="flex-1 max-w-4xl mx-auto p-10">
              <ul className="grid grid-cols-8 grid-rows-4 gap-8">
                {grid.map((line, i) =>
                  line.map((button, j) => {
                    return (
                      <>
                        {/* <Button
                          key={i + j}
                          column={j + 1}
                          row={i + 1}
                          activated={grid[i][j]["activated"]}
                          triggered={grid[i][j]["triggered"]}
                          toggleActivation={() => toggleActivation(i, j)}
                        /> */}
                        <button className="padborder">huh</button>
                      </>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <h4>MIXER</h4>
        </div>
      </div>
    </>
  );
};

export default Board;

// import React, { useEffect, useState } from "react";
// import * as Tone from "tone";
// import { Song, Track, Instrument } from "reactronica";
// import Button from "../components/sah/button";

// const steps = 8;
// const buttonState = { triggered: false, activated: false };
// const pads = [Array.from(8).fill(buttonState), Array.from(8).fill(buttonState)];

// function drumpad() {
//   let synth;

//   useEffect(() => {
//     synth = new Tone.Synth().toMaster();
//   }, []);

//   return (
//     <div className="grid grid-cols-12">
//       {pads.map((row, i) =>
//         row.map((pad, j) => (
//           <Button
//             key={i + j}
//             column={j + 1}
//             row={i + 1}
//             activated={grid[i][j]["activated"]}
//             triggered={grid[i][j]["triggered"]}
//             toggleActivation={() => toggleActivation(i, j)}
//           />
//         ))
//       )}
//     </div>
//   );
// }

// export default drumpad;

// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("C3", "4n")}
// // >
// // <div>
// //   <button>DO</button>
// // </div>
// // </div>
// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("D3", "4n")}
// // >
// // <button>RE</button>
// // </div>
// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("E3", "4n")}
// // >
// // <button>MI</button>
// // </div>
// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("F3", "4n")}
// // >
// // <button>FA</button>
// // </div>
// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("G3", "4n")}
// // >
// // <button>SO</button>
// // </div>
// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("A3", "4n")}
// // >
// // <button>LA</button>
// // </div>
// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("B3", "4n")}
// // >
// // <button>TI</button>
// // </div>
// // <div
// // className="padborder"
// // onClick={() => synth.triggerAttackRelease("C4", "4n")}
// // >
// // <button>DO</button>
// // </div>
