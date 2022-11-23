import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { Volume } from "tone";

const AudioPlayer = ({
  children,
  objectSounds,
  bpm,
  masterVolume,
  rowOneVolume,
}) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = new Tone.Players(objectSounds, () => {
      setPlayer(player);
    }).connect(Tone.Destination);
  }, [objectSounds, bpm, masterVolume, rowOneVolume]);

  return children({ player });
};

export default AudioPlayer;
