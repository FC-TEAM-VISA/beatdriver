import React, { useState, useEffect } from "react";
import * as Tone from "tone";

//this is where the sources of the audio come from
const AudioPlayer = ({ children, beat }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      {
        boom: beat,
        clean: "./samples/drums/tom-808.wav",
        metal: "/metal.mp3",
        cc: "./samples/drums/tom-808.wav",
      },
      () => {
        setPlayer(player);
      }
    ).toDestination();
  }, [beat]);

  return children({ player });
};

export default AudioPlayer;
