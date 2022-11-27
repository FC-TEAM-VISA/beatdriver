import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { Volume } from "tone";

const AudioPlayer = ({
  children,
  objectSounds,
  bpm,
  masterVolume,
  reverb,
  phaser,
  chorus,
  tremolo,
}) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = new Tone.Players(objectSounds, () => {
      setPlayer(player);
    });

    const toneChorus = new Tone.Chorus(chorus).toDestination();
    const toneReverb = new Tone.Reverb(reverb).toDestination();
    const tonePhaser = new Tone.Phaser(phaser).toDestination();
    const toneTremolo = new Tone.Tremolo(tremolo).toDestination();
    console.log(toneChorus);

    player.chain(toneChorus, toneReverb, tonePhaser, toneTremolo);
  }, [objectSounds, bpm, masterVolume, reverb, phaser, chorus, tremolo]);

  return children({ player });
};

export default AudioPlayer;
