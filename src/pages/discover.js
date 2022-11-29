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

const Discover = () => {
  const [projects] = useCollectionData(isPublicQuery);

  return (
    <div className="grid grid-cols-5 m-5">
      {projects?.map(({ projectId, name, screen, username }, index) => (
        <Link href={`/board/${projectId}`} key={index} className="p-2">
          {screen && screen.length ? (
            <div className="m-2 flex-wrap">
              <div className="relative w-50 h-50 aspect-w-5 aspect-h-4">
                <Image
                  src={screen}
                  alt="screen"
                  layout="fill" // required
                  objectFit="fill" // change to suit your needs
                  className="aspect-square" // just an example
                />
              </div>
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
  );
};

export default Discover;
