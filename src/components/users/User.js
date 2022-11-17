import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { database } from "../../../utils/firebase";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { GrSoundcloud } from "react-icons/gr";

function User() {
  const [user, setUser] = useAuthState(auth);
  const dbInstance = collection(database, "users");
  const [docs, loading, error] = useCollectionData(dbInstance);
  let currentUser;

  if (user) {
    currentUser = docs?.find((doc) => doc.email === user.email);
  }

  console.log(currentUser);

  return (
    <>
      <div className="grid grid-cols-10 mt-2">
        <div className="col-span-3">
          <Image
            src={currentUser?.photo}
            height={400}
            width={300}
            className="p-5"
            alt=""
          />
        </div>
        <div className="col-span-4">
          <h3 className="text-5xl mt-5">{currentUser?.name}</h3>
          <p className="pt-5 text-lg">{currentUser?.bio}</p>
          <div className="flex mt-5">
            <BsInstagram className="mt-1" />
            <a
              target="_blank"
              href={`http://instagram.com/${currentUser?.instagram}`}
              rel="noopener noreferrer"
              className="link"
            >
              <p className="pl-2">@{currentUser?.instagram}</p>
            </a>
          </div>
          <div className="flex mt-2">
            <BsTwitter className="mt-1" />
            <a
              target="_blank"
              href={`http://twitter.com/${currentUser?.twitter}`}
              rel="noopener noreferrer"
              className="link"
            >
              <p className="pl-2">@{currentUser?.twitter}</p>
            </a>
          </div>
          <div className="flex mt-2">
            <GrSoundcloud className="mt-1" />
            <a
              target="_blank"
              href={`http://soundcloud.com/${currentUser?.soundcloud}`}
              rel="noopener noreferrer"
              className="link"
            >
              <p className="pl-2">@{currentUser?.soundcloud}</p>
            </a>
          </div>
        </div>
      </div>
      {/* UPLOADED SOUNDS */}
      <div className="grid grid-cols-10 ml-10 mt-5">
        <div className="col-span-4  border-2">
          <h1 className="text-3xl p-2 font-extrabold">UPLOADED SOUNDS:</h1>
          {user &&
            currentUser?.sounds?.map((sound, index) => (
              <div key={index} className="p-2">
                <p>{sound}</p>
              </div>
            ))}
        </div>
        <div className="col-span-1" />
        <div className="col-span-4 border-2">
          <h1 className="text-3xl p-2 font-extrabold">PUBLISHED TRACKS:</h1>
          {user &&
            currentUser?.sounds?.map((sound, index) => (
              <div key={index} className="p-2">
                <p>{sound}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default User;
