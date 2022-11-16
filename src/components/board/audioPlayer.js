import React, { useState, useEffect } from "react";
import * as Tone from "tone";

//this is where the sources of the audio come from
const AudioPlayer = ({ children, beat, bpm }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = new Tone.Players(
      {
        1: "./samples/vocals/yoddle3.wav",
        2: "./samples/vocals/COY_Halcyon_vocals_70bpm_Bm.wav",
        3: "./samples/vocals/vocal_woo.wav",
        4: "./samples/vocals/Vocal01_D.wav",
        5: "./samples/vocals/vocal5keyE.wav",
        6: "./samples/vocals/Vocal09_Db.wav",
        7: "./samples/vocals/voice_26_keyAmin_90bpm.wav",
        8: "./samples/vocals/Vox_DirtySample_E-D.wav",
        9: "./samples/bass/Juno_Bass70_125bpm.wav",
        10: "./samples/bass/OXYGEN_DD_Kit01_808_One_Shot_C.wav",
        11: "./samples/bass/BASS PULSE_C.wav",
        12: "./samples/bass/nycbass_A.wav",
        13: "./samples/bass/bassgrowl_Bb.wav",
        14: "./samples/bass/OXYGEN_STB_Kit01_Bass_One_Shot_D.wav",
        15: "./samples/bass/Juno_Bass80_Csharp_125bpm.wav",
        16: "./samples/drums/hihat-plain.wav",
        17: "./samples/drums/kick-tape.wav",
        18: "./samples/drums/hihat-reso.wav",
        19: "./samples/drums/hihat-ring.wav",
        20: "./samples/drums/kick-808.wav",
        21: "./samples/drums/kick-zapper.wav",
        22: "./samples/drums/kick-gritty.wav",
        23: "./samples/drums/kick-newwave.wav",
        24: "./samples/drums/kick-plain.wav",
        25: "./samples/drums/kick-oldschool.wav",
        26: "./samples/drums/kick-softy.wav",
        27: "./samples/drums/kick-tape.wav",
        28: "./samples/drums/kick-zapper.wav",
        29: "./samples/drums/hihat-reso.wav",
        30: "./samples/drums/hihat-reso.wav",
        31: "./samples/drums/kick-zapper.wav",
        32: "./samples/drums/hihat-reso.wav",
        33: "./samples/drums/hihat-808.wav",
        34: "./samples/drums/tom-808.wav",
        35: "./samples/drums/tom-lofi.wav",
        36: "./samples/drums/perc-808.wav",
        37: "./samples/drums/kick-tape.wav",
        38: "./samples/drums/kick-zapper.wav",
        39: "./samples/drums/openhat-slick.wav",
        40: "./samples/drums/shaker-shuffle.wav",
      },
      () => {
        setPlayer(player);
      }
    ).toDestination();
  }, [beat, bpm]);

  return children({ player });
};

export default AudioPlayer;
