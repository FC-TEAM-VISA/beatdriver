import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { Song, Track, Instrument } from "reactronica";
import Pads from "../components/looper/Pads";

function drumpad() {
  const pads = Array.from({ length: 20 });
  let synth;

  useEffect(() => {
    synth = new Tone.Synth().toMaster();
  }, []);

  return (
    <div className="grid grid-rows-6 grid-cols-4">
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("C3", "4n")}
      >
        <div>
          <button>DO</button>
        </div>
      </div>
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("D3", "4n")}
      >
        <button>RE</button>
      </div>
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("E3", "4n")}
      >
        <button>MI</button>
      </div>
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("F3", "4n")}
      >
        <button>FA</button>
      </div>
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("G3", "4n")}
      >
        <button>SO</button>
      </div>
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("A3", "4n")}
      >
        <button>LA</button>
      </div>
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("B3", "4n")}
      >
        <button>TI</button>
      </div>
      <div
        className="padborder"
        onClick={() => synth.triggerAttackRelease("C4", "4n")}
      >
        <button>DO</button>
      </div>
    </div>
  );
}

export default drumpad;
