import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import * as Tone from "tone";
import { Song, Track, Instrument } from "reactronica";

const Samples = () => {
  const [notes, setNotes] = useState([]);
  let synth;
  // const synth = new Tone.Synth().toDestination();
  // const now = Tone.now()

  useEffect(() => {
    synth = new Tone.AMSynth().toMaster();
  }, []);

  return (
    <>
      <button onClick={() => synth.triggerAttackRelease("C4", "4n")}>C</button>
      <button onClick={() => synth.triggerAttackRelease("D3", "4n")}>D</button>
      <button onClick={() => synth.triggerAttackRelease("E4", "4n")}>E</button>
      <button onClick={() => synth.triggerAttackRelease("F4", "4n")}>F</button>
    </>
  );
};

export default Samples;
