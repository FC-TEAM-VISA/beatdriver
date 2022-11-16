import { getStorage, ref, getDownloadURL } from "firebase/storage";
// const starsRef = ref(storage, "images/stars.jpg");

import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { Player } from "tone";

//this is where the sources of the audio come from
const SingleAudio = () => {
  const storage = getStorage();
  // console.log(storage);
  const storageRef = ref(storage, "built-in-instruments/drums/cowbell-808.wav");

  let audio;
  getDownloadURL(storageRef)
    .then((url) => {
      //download directly
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = "blob";
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open("GET", url);
      // xhr.send();

      console.log(url, "URL!");

      audio = new Tone.Player().toDestination();
      audio.load(url);
      // audio.audiostart = true;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
      }
    });

  return (
    <>
      <button
        onClick={() => {
          Tone.start();
          audio.start();
        }}
      >
        Start
      </button>
    </>
  );
};

export default SingleAudio;
