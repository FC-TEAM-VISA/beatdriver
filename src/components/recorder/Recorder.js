import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage, beatsRef } from "../../../utils/firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";

const Recorder = ({ togglePlaying, name }) => {
  const [isRec, setIsRec] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const recorder = new Tone.Recorder();
    setRecorder(recorder);
    Tone.getDestination().connect(recorder);
  }, []);

  const toggleRec = () => {
    setIsRec((prev) => !prev);
    togglePlaying();
  };

  useEffect(() => {
    if (isRec === true) {
      recorder.start();
    } else {
      stopRecording();
    }
  }, [isRec]);

  const uploadToStorage = async (audioUrl, folderName) => {
    const dbRef = doc(database, "users", `${user.uid}`);
    const storageRef = ref(storage, `users/${user.uid}/tracks/${folderName}`);
    getFileBlob(audioUrl, (blob) => {
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    });

    await getDownloadURL(storageRef).then((url) => {
      updateDoc(dbRef, {
        tracks: arrayUnion({ name: folderName, url }),
      });
    });
  };

  const getFileBlob = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener("load", function () {
      cb(xhr.response);
    });
    xhr.send();
  };

  async function stopRecording() {
    if (!recorder) return;
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    if (user) {
      if (
        window.confirm(
          "Nice! Do you want to publish your track to your profile?"
        )
      ) {
        uploadToStorage(url, name);
      }
    } else {
      if (
        window.confirm(
          "Do you want to download your track? To publish it to your profile, please sign in."
        )
      ) {
        const anchor = document.createElement("a");
        anchor.download = `${name}`;
        anchor.href = url;
        anchor.click();
      }
    }
  }

  return (
    <div>
      <button onClick={toggleRec}>{isRec ? "STOP RECORDING" : "RECORD"}</button>
    </div>
  );
};

export default Recorder;
