import React from "react";
import Link from "next/link";
import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from "../../utils/firebase";
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

const Discover = () => {
  const [projects] = useCollectionData(isPublicQuery);

  return (
    <>
      {projects?.map(({ projectId, name, ownerId }, index) => (
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
