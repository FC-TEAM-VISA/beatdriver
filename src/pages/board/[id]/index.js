import * as htmlToImage from "html-to-image";
import React, { useState, createRef, useEffect } from "react";
import Looper from "../../../components/board/Looper";
import TopToolbar from "../../../components/toolbar/TopToolbar";
import EffectsMenu from "../../../components/effectsmenu/EffectsMenu";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  getDoc,
} from "firebase/firestore";
import { database, auth, db } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const projectRef = doc(database, "projects", context.query.id);
  const project = await getDoc(projectRef);
  const projectData = { id: project.id, ...project.data() };
  return {
    props: {
      data: JSON.parse(JSON.stringify(projectData)),
    },
  };
};

/* THE BOARD*/
const steps = 8;
const buttonState = { triggered: false, activated: false, audio: "" };

//sets up how big the grid will be
const initialGrid = [
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
];

const Board = ({ data }) => {
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
  const [selectedInstrument, setSelectedInstrument] = useState(
    data.selectedInstrument
  );
  const [selected, setSelected] = useState(data.selected);
  const [beat, setBeat] = useState(data.beat);
  const [objectSounds, setObjectSounds] = useState(
    data.objectSounds || {
      "https://firebasestorage.googleapis.com/v0/b/music-collaboration-app.appspot.com/o/built-in-instruments%2Fdrums%2Fclap%2Fclap-808.wav?alt=media&token=1e2bd7d8-dad2-49b6-a6db-9959a06f1520":
        "https://firebasestorage.googleapis.com/v0/b/music-collaboration-app.appspot.com/o/built-in-instruments%2Fdrums%2Fclap%2Fclap-808.wav?alt=media&token=1e2bd7d8-dad2-49b6-a6db-9959a06f1520",
    }
  );
  const [soundArray, setSoundArray] = useState(data.soundArray);
  //project info
  const orderedKeys = Object.keys(data.grid).sort();
  const dataGrid = orderedKeys.map((row) => data.grid[row]);
  const [grid, setGrid] = useState(dataGrid || initialGrid); //project board
  const [uniqueID, setUniqueID] = useState(data.id); //project id
  const [playing, setPlaying] = useState(false); //audio player
  const [name, setName] = useState(data.name); //project name
  const [isPublic, setIsPublic] = useState(true); //collab or solo
  const [bpm, setBpm] = useState(data.bpm || 120); //tempo
  const [mute, setMute] = useState(false); //mute button
  const [masterVolume, setMasterVolume] = useState(data.masterVolume); //master volume
  //popup
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [chorus, setChorus] = useState(data.chorus);
  const [phaser, setPhaser] = useState(data.phaser);
  const [tremolo, setTremolo] = useState(data.tremolo);
  const [moog, setMoog] = useState(data.moog);

  const ref = createRef(null);
  const dbInstance = query(
    collection(database, "projects"),
    where(`ownerId`, "==", `${user?.uid}`)
  );

  const [projects] = useCollectionData(dbInstance);
  let currentProject;

  if (projects) {
    currentProject = projects?.find(
      (project) => uniqueID === project.projectId
    );
  }
  const handleSave = async () => {
    const image = await takeScreenShot(ref.current);
    if (currentProject) {
      await updateDoc(doc(database, `projects/${uniqueID}`), {
        updatedAt: serverTimestamp(),
        name: name,
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
        masterVolume: +masterVolume,
        isPublic,
        screen: image,
        chorus: chorus,
        phaser: phaser,
        tremolo: tremolo,
        moog: moog,
      });
      setUniqueID(uniqueID);
    } else {
      setOpen(true);
      const newProject = await addDoc(collection(database, `projects`), {
        createdAt: serverTimestamp(),
        ownerId: user.uid,
        username: currentUser.name,
        name: `${name}.copy` || "Untitled",
        objectSounds: objectSounds,
        beat: beat || null,
        selected: selected || "SELECTED",
        selectedInstrument: selectedInstrument || "selected",
        grid: {
          r1: grid[0],
          r2: grid[1],
          r3: grid[2],
          r4: grid[3],
          r5: grid[4],
        },
        bpm: +bpm,
        masterVolume: +masterVolume,
        isPublic: true,
        screen: image,
        chorus: chorus,
        phaser: phaser,
        tremolo: tremolo,
        moog: moog,
      });

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
      setUniqueID(newProject.id);
    }
  };

  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node);
    return dataURI;
  };

  const [val, setVal] = useState("");
  const handleBeatChange = (value) => {
    const findSample = soundArray.find((sample) => sample === value);
    if (!findSample) {
      let arrayCopy = [...soundArray];
      arrayCopy.push(value);
      setSoundArray(arrayCopy);
    }
    setVal(value);
  };

  useEffect(() => {
    const idx = soundArray.indexOf(val);
    setBeat(idx);
    console.log(val, soundArray, beat);
  }, [soundArray, val, beat]);

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

	const handleCopyLink = () => {
		const host = "localhost:3000";
		const currentUrl = window.location.href;
		navigator.clipboard.writeText(`${currentUrl}/invite`);
	};

  return (
    <div>
      <div className="grid grid-cols-12 text-xl">
        <div className="col-span-8 bg-slate-800">
          <Popup
            open={open}
            closeOnDocumentClick
            onClose={closeModal}
            className="popup-content"
          >
            <div className="grid bg-oxford_blue place-items-center">
              <p className="text-4xl mt-10 mb-5">
                Are you sure you want to save this to your projects? You will be
                redirected to your own copy.
              </p>
              <p className="mb-10">click anywhere to close</p>
            </div>
          </Popup>
          <div className="col-span-8 bg-black">
            {/* TOOLBAR */}
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
              masterVolume={masterVolume}
              setMasterVolume={setMasterVolume}
            />
          </div>

          <div>
            <button onClick={handleCopyLink}>Share</button>
          </div>

          <div ref={ref}>
            <Looper
              bpm={bpm}
              playing={playing}
              beat={beat}
              objectSounds={objectSounds}
              steps={steps}
              grid={grid}
              setGrid={setGrid}
              uniqueID={uniqueID}
              handleSave={handleSave}
              selectedInstrument={selectedInstrument}
              selected={selected}
              masterVolume={masterVolume}
              soundArray={soundArray}
              chorus={chorus}
              phaser={phaser}
              tremolo={tremolo}
              moog={moog}
            />
          </div>
        </div>

        <div className="col-span-4 ml-4 bg-prussian_blue">
          <EffectsMenu
            chorus={chorus}
            phaser={phaser}
            tremolo={tremolo}
            setChorus={setChorus}
            setPhaser={setPhaser}
            setTremolo={setTremolo}
            moog={moog}
            setMoog={setMoog}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
