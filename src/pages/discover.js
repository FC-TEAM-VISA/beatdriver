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
import { getAllProjectIds, getPostData } from "../../utils/projects";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const isPublicQuery = query(
	collection(database, "projects"),
	where("isPublic", "==", true)
);

const getProjects = async () => {
	const querySnapshot = await getDocs(isPublicQuery);

	querySnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data()); // doc.data() is never undefined for query doc snapshots
	});

	const docs = querySnapshot.docs.map((doc) => doc.data());
	return docs;
};

const projectArr = getProjects();

const Discover = () => {
	const [projects] = useCollectionData(isPublicQuery);

	return (
		<>
			{projects?.map(({ projectId, name, ownerId, grid }, index) => (
				<Link href={`/board/${projectId}`} key={index} className="p-2">
					<p>
						{name} by {ownerId}
					</p>
				</Link>
			))}
		</>
	);
};

export default Discover;
