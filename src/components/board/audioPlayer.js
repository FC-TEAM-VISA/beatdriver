import React, { useState, useEffect } from "react";
import * as Tone from "tone";

//this is where the sources of the audio come from
const AudioPlayer = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      {
        boom: "/boom.mp3",
        clean: "/clean.mp3",
        metal: "/metal.mp3",
      },
      () => {
        setPlayer(player);
      }
    ).toDestination();
  }, []);

  return children({ player });
};

export default AudioPlayer;
