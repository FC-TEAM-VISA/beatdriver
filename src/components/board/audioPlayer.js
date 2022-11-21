import React, { useState, useEffect } from "react";
import * as Tone from "tone";

//this is where the sources of the audio come from
const AudioPlayer = ({
  children,
  objectSounds,
  bpm,
  mute,

  masterVolume,
}) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      objectSounds,
      // 2: "./samples/drums/hihat-reso.wav",
      // 3: "./samples/drums/hihat-808.wav",
      // 4: "./samples/drums/clap-fat.wav",
      // 5: "./samples/drums/clap-slapper.wav",
      // 6: "./samples/drums/clap-tape.wav",
      // 7: "./samples/drums/crash-808.wav",
      // 8: "./samples/drums/crash-acoustic.wav",
      // 9: "./samples/drums/crash-noise.wav",
      // 10: "./samples/drums/crash-tape.wav",
      // 11: "./samples/drums/hihat-acoustic01.wav",
      // 12: "./samples/drums/hihat-acoustic02.wav",
      // 13: "./samples/drums/hihat-analog.wav",
      // 14: "./samples/drums/hihat-digital.wav",
      // 15: "./samples/drums/hihat-electro.wav",
      // 16: "./samples/drums/hihat-plain.wav",
      // 17: "./samples/drums/kick-tape.wav",
      // 18: "./samples/drums/hihat-reso.wav",
      // 19: "./samples/drums/hihat-ring.wav",
      // 20: "./samples/drums/kick-808.wav",
      // 21: "./samples/drums/kick-zapper.wav",
      // 22: "./samples/drums/kick-gritty.wav",
      // 23: "./samples/drums/kick-newwave.wav",
      // 24: "./samples/drums/kick-plain.wav",
      // 25: "./samples/drums/kick-oldschool.wav",
      // 26: "./samples/drums/kick-softy.wav",
      // 27: "./samples/drums/kick-tape.wav",
      // 28: "./samples/drums/kick-zapper.wav",
      // 29: "./samples/drums/hihat-reso.wav",
      // 30: "./samples/drums/hihat-reso.wav",
      // 31: "./samples/drums/kick-zapper.wav",
      // 32: "./samples/drums/hihat-reso.wav",
      // 33: "./samples/drums/hihat-808.wav",
      // 34: "./samples/drums/tom-808.wav",
      // 35: "./samples/drums/tom-lofi.wav",
      // 36: "./samples/drums/perc-808.wav",
      // 37: "./samples/drums/kick-tape.wav",
      // 38: "./samples/drums/kick-zapper.wav",
      // 39: "./samples/drums/openhat-slick.wav",
      // 40: "./samples/drums/shaker-shuffle.wav",
      () => {
        setPlayer(player);
      }
    ).toDestination();
  }, [objectSounds, bpm]);

  return children({ player });
};

export default AudioPlayer;
