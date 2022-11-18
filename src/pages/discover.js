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
	console.log("querys", querySnapshot);

	querySnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data()); // doc.data() is never undefined for query doc snapshots
	});

	const docs = querySnapshot.docs.map((doc) => doc.data());
	console.log("docs", docs);
	return docs;
};

const projectArr = getProjects();

const Discover = () => {
	const [projects] = useCollectionData(isPublicQuery);
	// console.log("projects", projects);

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
			{projects?.map(({ projectId, name, ownerName, grid }, index) => (
				<Link href={`/testBoard/${projectId}`} key={index} className="p-2">
					<p>
						{name} by {ownerName}
					</p>
				</Link>
			))}
		</>
	);
};

export default Discover;

// export async function getStaticPaths() {
// 	const paths = getAllProjectIds();
// 	console.log("PATHS", paths);
// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }

// export async function getStaticProps({ params }) {
// 	const projectData = getProjectData(params.id);
// 	return {
// 		props: {
// 			projectData,
// 		},
// 	};
// }

// export async function getServerSideProps({ params }) {
// 	return {
// 		props: { projectArr },
// 	};
// }
