import * as Tone from "tone";
import React, { useState } from "react";
import Looper from "../../components/board/Looper";
import AudioPlayer from "../../components/board/AudioPlayer";
import Recorder from "../../components/recorder/Recorder";
import TopToolbar from "../../components/toolbar/TopToolbar";

//firebase imports
import {
  collection,
  doc,
  serverTimestamp,
  addDoc,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import { database, auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

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
  const router = useRouter();
  //authentication + user info
  const [user] = useAuthState(auth);
  const dbRef = collection(database, "users");
  const [docs] = useCollectionData(dbRef);
  let currentUser;
  if (user) {
    currentUser = docs?.find((doc) => doc.email === user.email);
  }
  //instruments
  const [selectedInstrument, setSelectedInstrument] = useState("selected");
  const [selected, setSelected] = useState("SELECTED");
  const [objectSounds, setObjectSounds] = useState({
    "https://firebasestorage.googleapis.com/v0/b/music-collaboration-app.appspot.com/o/built-in-instruments%2Fdrums%2Fclap%2Fclap-808.wav?alt=media&token=1e2bd7d8-dad2-49b6-a6db-9959a06f1520":
      "https://firebasestorage.googleapis.com/v0/b/music-collaboration-app.appspot.com/o/built-in-instruments%2Fdrums%2Fclap%2Fclap-808.wav?alt=media&token=1e2bd7d8-dad2-49b6-a6db-9959a06f1520",
  });
  const [beat, setBeat] = useState(null);
  //project info
  const [name, setName] = useState("Untitled");
  const [bpm, setBpm] = useState(120);
  const [mute] = useState(false);
  const [masterVolume] = useState(0);
  const [uniqueID, setUniqueID] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [grid, setGrid] = useState(initialGrid);

  const dbInstance = query(
    collection(database, "projects"),
    where(`ownerId`, "==", `${user?.uid}`)
  );
  const [projects] = useCollectionData(dbInstance);

  const handleSave = async () => {
    if (!uniqueID) {
      const newProject = await addDoc(collection(database, `projects`), {
        createdAt: serverTimestamp(),
        ownerId: user.uid,
        name: name,
        objectSounds: objectSounds,
        beat,
        selected,
        selectedInstrument,
        grid: {
          r1: grid[0],
          r2: grid[1],
          r3: grid[2],
          r4: grid[3],
          r5: grid[4],
        },
        bpm: +bpm,
        isPublic: true,
      });

      setUniqueID(newProject.id);

      await setDoc(
        doc(database, `projects/${newProject.id}`),
        {
          projectId: newProject.id,
        },
        { merge: true }
      );

      router.push({
        pathname: `/board/[id]`,
        query: { id: newProject.id },
      });
    }
  };

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
    setBeat(value);
  };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
    Tone.start();
  };

  return (
    <div>
      <div className="grid grid-cols-12 text-xl">
        {/* TOOLBAR */}
        <div className="col-span-12 bg-teal-800">
          <TopToolbar
            beat={beat}
            setBeat={setBeat}
            projects={projects}
            grid={grid}
            setGrid={setGrid}
            setUniqueID={setUniqueID}
            uniqueID={uniqueID}
            handleBeatChange={handleBeatChange}
            currentUser={currentUser}
            setSelectedInstrument={setSelectedInstrument}
            playing={playing}
            setPlaying={setPlaying}
            bpm={bpm}
            setBpm={setBpm}
            selected={selected}
            setSelected={setSelected}
            user={user}
            handleSave={handleSave}
            name={name}
            setName={setName}
            togglePlaying={togglePlaying}
          />
        </div>

        <div className="col-span-9">
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
                <>
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
                    selectedInstrument={selectedInstrument}
                    selected={selected}
                  />
                  <Recorder
                    player={player}
                    togglePlaying={togglePlaying}
                    name={name}
                  />
                </>
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
