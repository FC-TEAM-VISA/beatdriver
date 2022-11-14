import React, { useRef, useState } from "react";
import Looper from "../components/sah/scratch/Looper";

const Board = () => {
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-10">
          <label>Beat:</label>
          <select name="beat" onChange={(e) => setBeat(e.target.value)}>
            <option value="./samples/drums/clap-808.wav">clap-808</option>
            <option value="./samples/drums/clap-analog.wav">clap-analog</option>
            <option value="./samples/drums/clap-crushed.wav">
              clap-crushed
            </option>
          </select>

          <label>Tempo:</label>
        </div>

        <div className="col-span-9">
          <Looper />
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
