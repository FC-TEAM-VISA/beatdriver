import React, { useState, useEffect } from "react";
import * as Tone from "tone";

//this is where the sources of the audio come from
const AudioPlayer = ({ children, beat, bpm }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = new Tone.Players(
      {
        boom: beat,
        clean: "./samples/drums/hihat-reso.wav",
        metal: "./samples/drums/hihat-808.wav",
        cc: "./samples/drums/tom-808.wav",
        col5: "./samples/drums/tom-lofi.wav",
        col6: "./samples/drums/snare-808.wav",
        seven: "./samples/drums/snare-lofi01.wav",
        eight: "./samples/drums/hihat-digital.wav",
        nine: "./samples/drums/snare-lofi01.wav",
        ten: "./samples/drums/hihat-plain.wav",
        eleven: "./samples/drums/hihat-reso.wav",
      },
      () => {
        setPlayer(player);
      }
    ).toDestination();
  }, [beat, bpm]);

  return children({ player });
};

export default AudioPlayer;
