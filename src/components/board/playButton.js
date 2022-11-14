import React from "react";

const PlayButton = ({ onClick, playing }) => {
  return (
    <div className="min-w-screen flex flex-col items-center bg-white text-black">
      <div>
        <button onClick={onClick}>{playing ? "Stop" : "Play"}</button>
      </div>
    </div>
  );
};

export default PlayButton;
