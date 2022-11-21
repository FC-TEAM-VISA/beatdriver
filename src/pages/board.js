import React, { useEffect, useRef, useState, useCallback } from "react";
import * as Tone from "tone";
import Looper from "../components/board/looper";
import AudioPlayer from "../components/board/audioPlayer";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import SoundMenu from "../components/soundmenu/SoundMenu";
import LoadMenu from "../components/loadmenu/LoadMenu";

//firebase imports
import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
  setDoc,
  where,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { database, auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { child, onValue, push, ref, set, update } from "firebase/database";
import { uploadBytes } from "firebase/storage";

/* THE BOARD*/
const steps = 8;
const buttonState = { triggered: false, activated: false, audio: "" };
const sounds = [
  ["1", "2", "3", "4", "5", "6", "7", "8"],
  ["9", "10", "11", "12", "13", "14", "15", "16"],
  ["17", "18", "19", "20", "21", "22", "23", "24"],
  ["25", "26", "27", "28", "29", "30", "31", "32"],
  ["33", "34", "35", "36", "37", "38", "39", "40"],
];

//sets up how big the grid will be
const initialGrid = [
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
];

const Board = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("Untitled");
  const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
  const [bpm, setBpm] = useState(120);
  const [mute, setMute] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0);
  const [uniqueID, setUniqueID] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [objectSounds, setObjectSounds] = useState({
    "./samples/drums/clap-808.wav": "./samples/drums/clap-808.wav",
  });
  const [grid, setGrid] = useState(initialGrid);
  const dbRef = collection(database, "users");
  const [docs] = useCollectionData(dbRef);
  const dbInstance = query(
    collection(database, "projects"),
    where(`ownerId`, "==", `${user?.uid}`)
  );
  const [projects] = useCollectionData(dbInstance);

  let currentUser;
  if (user) {
    currentUser = docs?.find((doc) => doc.email === user.email);
  }

  // console.log("IWORK: ", dbInstance);
  // const dbInstance = collection(database, "projects");

  // let currentProject = projects?.find(
  //   (project) => user.email === project.ownerId
  // );
  // console.log("current", currentProject);

  // console.log("beat", beat);
  // console.log("objectSounds", objectSounds);
  // console.log("grid", grid);

  // console.log("I AM A PROJECT: ", projects);
  // console.log(uniqueID);
  // console.log(
  //   "tracking",
  //   projects?.filter((project) => project.ownerId === user.uid)
  // );

  const handleMasterVolume = ({ player }, e) => {
    player.Master.volume = e.target.value;
  };

  const handleSave = async () => {
    if (!uniqueID) {
      const newProject = await addDoc(collection(database, `projects`), {
        createdAt: serverTimestamp(),
        ownerId: user.uid,
        name: name,
        grid: {
          r1: grid[0],
          r2: grid[1],
          r3: grid[2],
          r4: grid[3],
          r5: grid[4],
        },
        bpm: +bpm,
      });
      setUniqueID(newProject.id);

      await setDoc(
        doc(database, `projects/${newProject.id}`),
        {
          projectId: newProject.id,
        },
        { merge: true }
      );

      set(ref(db, `projects/${newProject.id}`), {
        ownerId: user.uid,
        name: name,
        grid: {
          r1: grid[0],
          r2: grid[1],
          r3: grid[2],
          r4: grid[3],
          r5: grid[4],
        },
        bpm: +bpm,
      });
    } else {
      await updateDoc(doc(database, `projects/${uniqueID}`), {
        updatedAt: serverTimestamp(),
        name: name,
        grid: {
          r1: grid[0],
          r2: grid[1],
          r3: grid[2],
          r4: grid[3],
          r5: grid[4],
        },
        bpm: +bpm,
      });

      setUniqueID(uniqueID);
      // const newKey = push(child(ref(db), "projects")).key;

      // update(ref(db, `projects/${uniqueID}`), {
      //   updatedAt: serverTimestamp(),
      //   grid: {
      //     r1: grid[0],
      //     r2: grid[1],
      //     r3: grid[2],
      //     r4: grid[3],
      //     r5: grid[4],
      //   },
      //   bpm: +bpm,
      // });
    }
  };

  // const updateDateProject = () => {};

  // onValue(ref(db, `projects/${uniqueID}`), (snapshot) => {
  //   const data = snapshot.val();
  //   updateDateProject(projectElement, data);
  // });

  // KEEP THIS FOR TESTING COLLABORATION
  // useEffect(() => {
  //   if (uniqueID) {
  //     const realTime = async () => {
  //       await updateDoc(doc(database, `projects/${uniqueID}`), {
  //         createdAt: serverTimestamp(),
  //         grid: {
  //           r1: grid[0],
  //           r2: grid[1],
  //           r3: grid[2],
  //           r4: grid[3],
  //           r5: grid[4],
  //         },
  //         bpm: +bpm,
  //       });
  //     };
  //     realTime();
  //   }
  // }, [grid, bpm]);

  const handleBeatChange = (value) => {
    if (!objectSounds[value]) {
      let copyObject = { ...objectSounds };
      copyObject[value] = value;
      setObjectSounds(copyObject);
    }

    console.log("URL!!", value);
    setBeat(value);
  };

  return (
    <div>
      <div className="grid grid-cols-12 text-xl">
        {/* TOOLBAR */}
        <div className="flex flex-grow col-span-9 bg-teal-800">
          <div className="flex bg-teal-800 ml-3">
            <button
              onClick={() => {
                setPlaying(!playing);
                Tone.start();
              }}
            >
              {playing ? (
                <BsStopFill className="text-white bg-teal-800 h-12 w-12 p-2" />
              ) : (
                <BsFillPlayFill className="text-white bg-teal-800 h-12 w-12 p-2" />
              )}
            </button>
          </div>
          <div>
            <BiSave
              className="mt-4 mr-3 ml-2 cursor-pointer"
              onClick={() =>
                user
                  ? handleSave()
                  : window.alert("LOG IN OR SIGN UP TO SAVE A PROJECT")
              }
            />
          </div>
          <LoadMenu
            projects={projects}
            setGrid={setGrid}
            setUniqueID={setUniqueID}
            uniqueID={uniqueID}
          />
          <div>
            <button
              onClick={() => {
                setGrid(initialGrid);
                setObjectSounds({
                  "./samples/drums/clap-808.wav":
                    "./samples/drums/clap-808.wav",
                });
              }}
              className="mt-1 mx-2 border-2 p-1 bg-red-900 hover:bg-red-600 border-white"
            >
              CLEAR BOARD
            </button>
          </div>

          <div className="p-2 mx-4 mt-1 col-span-1">
            <label className="pr-2">SOUNDS:</label>
            <SoundMenu
              beat={beat}
              handleBeatChange={handleBeatChange}
              setBeat={setBeat}
              currentUser={currentUser}
            />
          </div>

          <div className="p-2">
            {/* BPM */}
            <label className="p-2">BPM:</label>
            <input
              type="range"
              min="50"
              defaultValue="120"
              max="300"
              onChange={(e) => setBpm(e.target.value)}
            />
            <output className="p-1">{bpm}</output>
          </div>

          <div className="p-2">
            {/* MASTER VOLUME */}
            <label className="p-2">MASTER VOLUME:</label>
            <input
              type="range"
              min="0"
              defaultValue="0"
              max="100"
              onChange={(e) => setMasterVolume(e.target.value)}
            />
            <output className="p-1">{masterVolume}</output>
          </div>

          <div className="p-2">
            {/* NAME */}
            <label className="p-2">NAME:</label>
            <input
              type="text"
              placeholder="Untitled"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-9">
          {name}
          <AudioPlayer
            objectSounds={objectSounds}
            bpm={bpm}
            mute={mute}
            masterVolume={masterVolume}
          >
            {({ player }) => {
              if (!player) {
                return (
                  <p className="flex items-center justify-center animate-bounce">
                    LOADING....
                  </p>
                );
              }
              return (
                <Looper
                  player={player}
                  bpm={bpm}
                  playing={playing}
                  beat={beat}
                  objectSounds={objectSounds}
                  steps={steps}
                  sounds={sounds}
                  grid={grid}
                  setGrid={setGrid}
                  uniqueID={uniqueID}
                  handleSave={handleSave}
                />
              );
            }}
          </AudioPlayer>
        </div>

        <div className="col-span-3">
          <div className="bg-blue-200 h-full col-span-2">
            <div className=" bg-purple-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
