import React from "react";

const PlayButton = ({ onClick, playing }) => {
  return (
    <div className="min-w-screen flex flex-col items-center bg-teal-800 text-black">
      <div>
        <button onClick={onClick}>
          {playing ? (
            <BsStopFill className="text-white bg-teal-800 h-5 w-5" />
          ) : (
            <BsFillPlayFill className="text-white bg-teal-800" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PlayButton;
