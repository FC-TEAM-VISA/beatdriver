import React from "react";
import Navbar from "../components/navbar/Navbar";
import {
	collection,
	doc,
	updateDoc,
	serverTimestamp,
	addDoc,
	setDoc,
	where,
	query,
  ref
} from "firebase/firestore";
import { database, storage, auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Discover = () => {
  const q = query(collection(database, 'projects'), where('isPublic', '==', 'true'));


	return (
		<>
      <Navbar />
			<div>

      </div>
		</>
	);
}

export default Discover;
