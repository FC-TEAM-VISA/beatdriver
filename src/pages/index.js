import React from "react";

export default function Home() {
  return (
    <div>
      <main>
        <div className="relative flex justify-center h-screen mb-12 overflow-hidden">
          <h1 className="relative z-30 p-5 text-5xl text-white mt-10">
            Welcome to the beat maker!
          </h1>
          <video autoplay loop muted className="absolute w-auto min-h-full">
            <source
              // src="https://vimeo.com/manage/videos/233388698"
              src="/TYGAPAW_RECAP.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </main>
    </div>
  );
}
