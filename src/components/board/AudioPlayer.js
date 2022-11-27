import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { Volume } from "tone";

const AudioPlayer = ({
  children,
  objectSounds,
  bpm,
  masterVolume,
  rowOneVolume,
  testyTest,
  chorusTest,
}) => {
  const [player, setPlayer] = useState(null);

  // useEffect(() => {
  //   const player = new Tone.Players(objectSounds, () => {
  //     setPlayer(player);
  //   });
  //   const reverb = new Tone.Reverb({ decay: rowOneReverb });
  //   player.chain(reverb, Tone.Destination)
  // }, [objectSounds, bpm, masterVolume, rowOneVolume, rowOneReverb]);

  useEffect(() => {
    const player = new Tone.Players(objectSounds, () => {
      setPlayer(player);
    }).connect(Tone.Destination);
  }, [objectSounds, bpm, masterVolume, testyTest, chorusTest]);

  return children({ player });
};

export default AudioPlayer;
