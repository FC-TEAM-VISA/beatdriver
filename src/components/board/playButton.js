import React from "react";

const PlayButton = ({ onClick, playing }) => {
  return (
    <div className="min-w-screen flex flex-col items-center bg-black">
      <div className="flex-1 p-10">
        <button style={{ color: "white" }} onClick={onClick}>
          {playing ? "Stop" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default PlayButton;
