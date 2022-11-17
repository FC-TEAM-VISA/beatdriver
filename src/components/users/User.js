import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { database } from "../../../utils/firebase";
import { doc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { GrSoundcloud } from "react-icons/gr";
import UploadButton from "../upload/UploadButton";
import { Input } from "postcss";
import UpdateInfo from "./UpdateInfo";

function User() {
  const [user] = useAuthState(auth);
  const dbInstance = collection(database, "users");
  const dbRef = doc(database, "users", `${user?.email}`);
  const [docs] = useCollectionData(dbInstance);
  let currentUser;

  if (user) {
    currentUser = docs?.find((doc) => doc.email === user.email);
  }

  return (
    <>
      <div className="grid grid-cols-10 mt-2 place-items-center">
        <div className="col-span-3">
          <Image
            src={currentUser?.photo}
            height={400}
            width={300}
            className="p-5"
            alt=""
          />
        </div>
        <div className="col-span-3">
          <div className="flex space-x-4">
            <h3 className="text-5xl mt-5">{currentUser?.name}</h3>
          </div>
          <p className="pt-5 text-lg">{currentUser?.location}</p>
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
        {/* <div className="col-span-1" /> */}
        <div className="col-span-3 border-2 p-5 ml-10 grid place-items-center">
          <p className="text-3xl mt-3">UPLOAD YOUR OWN SOUNDS</p>
          <UploadButton />
        </div>
      </div>
      {/* UPLOADED SOUNDS */}
      <div className="grid grid-cols-10 ml-10 mt-5">
        <div className="col-span-4 border-2">
          <h1 className="grid text-3xl p-2 font-extrabold">UPLOADED SOUNDS:</h1>
          {user && !currentUser?.sounds ? (
            <h1 className="grid place-items-center text-2xl pb-2">
              NO UPLOADED SOUNDS
            </h1>
          ) : (
            currentUser?.sounds?.map(({ name }, index) => (
              <div key={index} className="p-2">
                <p>{name}</p>
              </div>
            ))
          )}
        </div>
        <div className="col-span-1" />
        <div className="col-span-4 border-2">
          <h1 className="text-3xl p-2 font-extrabold">PUBLISHED TRACKS:</h1>
          {user && !currentUser?.sounds ? (
            <h1 className="grid place-items-center text-2xl pb-2">
              NO PUBLISHED TRACKS
            </h1>
          ) : (
            currentUser?.sounds?.map(({ name, url }, index) => (
              <div key={index} className="p-2">
                <p>{url}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <UpdateInfo currentUser={currentUser} user={user} />
    </>
  );
}

export default User;
