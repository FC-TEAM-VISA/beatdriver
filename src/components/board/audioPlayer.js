import React, { useState, useEffect } from "react";
import * as Tone from "tone";

//this is where the sources of the audio come from
const AudioPlayer = ({ children, beat, bpm }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = new Tone.Players(
      {
        1: beat,
        2: "./samples/drums/hihat-reso.wav",
        3: "./samples/drums/hihat-808.wav",
        4: "./samples/drums/tom-808.wav",
        5: "./samples/drums/tom-lofi.wav",
        6: "./samples/drums/snare-808.wav",
        7: "./samples/drums/kick-tape.wav",
        8: "./samples/drums/kick-zapper.wav",
        9: "./samples/drums/kick-zapper.wav",
        10: "./samples/drums/kick-zapper.wav",
        11: "./samples/drums/kick-zapper.wav",
        12: "./samples/drums/hihat-reso.wav",
        13: "./samples/drums/hihat-808.wav",
        14: "./samples/drums/tom-808.wav",
        15: "./samples/drums/tom-lofi.wav",
        16: "./samples/drums/snare-808.wav",
        17: "./samples/drums/kick-tape.wav",
        18: "./samples/drums/kick-zapper.wav",
        19: "./samples/drums/hihat-reso.wav",
        20: "./samples/drums/hihat-reso.wav",
        21: "./samples/drums/kick-zapper.wav",
        22: "./samples/drums/hihat-reso.wav",
        23: "./samples/drums/hihat-808.wav",
        24: "./samples/drums/tom-808.wav",
        25: "./samples/drums/tom-lofi.wav",
        26: "./samples/drums/snare-808.wav",
        27: "./samples/drums/kick-tape.wav",
        28: "./samples/drums/kick-zapper.wav",
        29: "./samples/drums/hihat-reso.wav",
        30: "./samples/drums/hihat-reso.wav",
        31: "./samples/drums/kick-zapper.wav",
        32: "./samples/drums/hihat-reso.wav",
        33: "./samples/drums/hihat-808.wav",
        34: "./samples/drums/tom-808.wav",
        35: "./samples/drums/tom-lofi.wav",
        36: "./samples/drums/snare-808.wav",
        37: "./samples/drums/kick-tape.wav",
        38: "./samples/drums/kick-zapper.wav",
        39: "./samples/drums/hihat-reso.wav",
        40: "./samples/drums/hihat-reso.wav",
      },
      () => {
        setPlayer(player);
      }
    ).toDestination();
  }, [beat, bpm]);

  return children({ player });
};

export default AudioPlayer;
