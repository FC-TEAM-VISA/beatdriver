import React, { useEffect, useRef, useState, useCallback } from "react";
import * as Tone from "tone";
import Looper from "../../components/board/looper";
import AudioPlayer from "../../components/board/audioPlayer";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import SoundMenu from "../../components/soundmenu/SoundMenu";
import LoadMenu from "../../components/loadmenu/LoadMenu";

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
	getDocs,
	getDoc,
} from "firebase/firestore";
import { database, auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAllPostIds, getPostData } from "../../../utils/projects";

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
console.log("THIS IS INITIAL GRID!!!!!", initialGrid);

const Board = ({ data }) => {
	const orderedKeys = Object.keys(data.grid).sort();
	const dataGrid = orderedKeys.map((row) => data.grid[row]);

	const [user] = useAuthState(auth);
	const [isPublic, setIsPublic] = useState(true);
	const [beat, setBeat] = useState("./samples/drums/clap-808.wav");
	const [bpm, setBpm] = useState(data.bpm || 120);
	const [uniqueID, setUniqueID] = useState(null);
	const [playing, setPlaying] = useState(false);
	const [objectSounds, setObjectSounds] = useState(
		data.objectSounds || {
			"../samples/drums/clap-808.wav": "../samples/drums/clap-808.wav",
		}
	);
	const [grid, setGrid] = useState(dataGrid || initialGrid);
	const [userGoogleInfo] = useAuthState(auth);
	// console.log("GoogleInfo: ", userGoogleInfo);

	const dbRef = collection(database, "users");
	const [docs] = useCollectionData(dbRef);

	let currentUser;
	if (user) {
		currentUser = docs?.find((doc) => doc.email === user.email);
	}
	// console.log("USER", currentUser);

	const dbInstance = query(
		collection(database, "projects"),
		where(`ownerId`, "==", `${userGoogleInfo?.uid}`)
	);

	// console.log("IWORK: ", dbInstance);
	// const dbInstance = collection(database, "projects");

	const [projects] = useCollectionData(dbInstance);

	// let currentProject = projects?.find(
	//   (project) => user.email === project.ownerId
	// );
	// console.log("current", currentProject);

	console.log("I AM A PROJECT: ", projects);
	console.log(uniqueID);

	const handleSave = async () => {
		if (!uniqueID) {
			const newProject = await addDoc(collection(database, `projects`), {
				createdAt: serverTimestamp(),
				ownerId: user.uid,
				name: "Untitled",
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
		} else {
			await updateDoc(doc(database, `projects/${uniqueID}`), {
				updatedAt: serverTimestamp(),
				grid: {
					r1: grid[0],
					r2: grid[1],
					r3: grid[2],
					r4: grid[3],
					r5: grid[4],
				},
				bpm: +bpm,
				isPublic,
			});

			setUniqueID(uniqueID);
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

	const handleBeatChange = (e) => {
		if (!objectSounds[e.target.value]) {
			let copyObject = { ...objectSounds };
			copyObject[e.target.value] = e.target.value;
			setObjectSounds(copyObject);
		}
		setBeat(e.target.value);
	};

	return (
		<>
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
									"../samples/drums/clap-808.wav":
										"../samples/drums/clap-808.wav",
								});
							}}
							className="mt-1 mx-2 border-2 p-1 bg-red-900 hover:bg-red-600 border-white"
						>
							CLEAR BOARD
						</button>
					</div>
					<div className="p-2">
						{/* DROPDOWN */}
						<label className="p-2">BEAT:</label>
						<select
							className="p-1"
							name="beat"
							onChange={(e) => {
								handleBeatChange(e);
							}}
						>
							<option value="./samples/drums/clap-808.wav">clap-808</option>
							<option value="./samples/drums/clap-analog.wav">
								clap-analog
							</option>
							<option value="./samples/drums/clap-crushed.wav">
								clap-crushed
							</option>
						</select>
					</div>

					<div className="p-2 mx-4 mt-1">
						<label className="pr-2">SOUNDS:</label>
						<SoundMenu beat={beat} handleBeatChange={handleBeatChange} />
					</div>

					<div className="p-2">
						{/* BPM */}
						<label className="p-2">BPM:</label>
						<input
							type="range"
							min="50"
							max="300"
							onChange={(e) => setBpm(e.target.value)}
						/>
						<output className="p-1">{bpm}</output>
					</div>
				</div>

				<div className="col-span-9">
					<AudioPlayer objectSounds={objectSounds} bpm={bpm}>
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
		</>
	);
};

export default Board;