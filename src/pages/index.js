import React from "react";

export default function Home() {
  return (
    <div className="relative flex place-items-center h-screen flex-col overflow-hidden mt-0 pt-0">
      <video
        autoPlay
        loop
        muted
        className="absolute w-auto min-h-full -mt-16 opacity-80"
      >
        <source src="/TYGAPAW_RECAP.mp4" type="video/mp4" />
      </video>
      <h1 className="relative p-5 text-5xl mt-10">
        WELCOME TO THE BEAT MAKER!
      </h1>
    </div>
  );
}
