import React from "react";
import Link from "next/link";
import Image from "next/image";
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
      <div className="grid grid-cols-5 m-5">
        {projects?.map(({ projectId, name, screen, username }, index) => (
          <Link href={`/board/${projectId}`} key={index} className="p-2">
            {screen && screen.length ? (
              <div className="m-2 flex-wrap">
                <Image src={screen} alt="screen" width={200} height={200} />
                <h5 className="mt-1">
                  {name} by {username}
                </h5>
              </div>
            ) : (
              <h5>
                {name} by {username}
              </h5>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Discover;
