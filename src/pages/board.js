
import React, { useRef, useState } from "react";
import Looper from "../components/board/looper";
import AudioPlayer from "../components/board/audioPlayer";

const Board = () => {
  return (
    <>
      <AudioPlayer>
        {({ player }) => {
          if (!player) {
            return <p>loading....</p>;
          }
          return <Looper player={player} />;
        }}
      </AudioPlayer>
    </>
  );
};

export default Board;
