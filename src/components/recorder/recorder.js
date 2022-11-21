import React, { useEffect, useState } from "react";
import * as Tone from "tone";

const Recorder = ({ player }) => {
  const [isRec, setIsRec] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    const recorder = new Tone.Recorder();
    setRecorder(recorder);
    Tone.getDestination().connect(recorder);
  }, []);

  const toggleRec = () => {
    setIsRec((prev) => !prev);
  };

  useEffect(() => {
    if (isRec === true) {
      recorder.start();
    } else {
      stopRecording();
    }
  }, [isRec]);

  async function stopRecording() {
    if (!recorder) return;
    const recording = await recorder.stop();
    let blob = new Blob([recording], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    console.log(url, "URL");
    const anchor = document.createElement("a");
    // anchor.download = "beat.webm";
    // anchor.href = url;
    // anchor.click();
    anchor.href = url;
    anchor.download = "KICK";
    anchor.click();
  }

  return (
    <div>
      <button onClick={toggleRec}>{isRec ? "STOP RECORDING" : "RECORD"}</button>
    </div>
  );
};

export default Recorder;
