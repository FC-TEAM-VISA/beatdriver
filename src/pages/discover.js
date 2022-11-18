import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import {
	collection,
	doc,
	updateDoc,
	serverTimestamp,
	addDoc,
	setDoc,
	getDocs,
	where,
	query,
	ref,
} from "firebase/firestore";
import { database, storage, auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Discover = () => {
	const isPublicQuery = query(
		collection(database, "projects"),
		where("isPublic", "==", true)
	);

	const [projects] = useCollectionData(isPublicQuery);
	console.log("projects", projects);

	// useEffect(() => {
	// 	// collection(database, "projects").onSnapshot((snapshot) => {
	// 	// 	console.log(snapshot.docs);
	// 	// 	setTweets(tweetArray);
	// 	// });
	// 	const getProjects = async () => {
	// 		const querySnapshot = await getDocs(isPublicQuery);
	// 		console.log("querySnapshot", querySnapshot);

	// 		querySnapshot.forEach((doc) => {
	// 			console.log(doc.id, " => ", doc.data()); // doc.data() is never undefined for query doc snapshots
	// 		});
	// 	};
	// }, []);

	return (
		<>
			{projects?.map(({ name, ownerName, grid }, index) => (
				<Link href="/board" key={index} className="p-2">
					<p>
						{name} by {ownerName}
					</p>
				</Link>
			))}
		</>
	);
};

export default Discover;
