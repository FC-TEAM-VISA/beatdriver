import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { database } from "../../../utils/firebase";
import { collection, where, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { GrSoundcloud } from "react-icons/gr";
import UploadButton from "./UploadButton";
import Modal from "react-modal";
import UpdateInfo from "./UpdateInfo";
import UploadPhoto from "./UploadPhoto";

function User() {
  const [user] = useAuthState(auth);
  const dbInstance = collection(database, "users");
  const [docs] = useCollectionData(dbInstance);
  const [modalOpen, setModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  let currentUser;
  if (user) {
    currentUser = docs?.find((doc) => doc.email === user.email);
  }
  const isPublicQuery = query(
    collection(database, "projects"),
    where("ownerId", "==", `${user.uid}`)
  );
  const [projects] = useCollectionData(isPublicQuery);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openPhotoModal = () => setPhotoModalOpen(true);
  const closePhotoModal = () => setPhotoModalOpen(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
    },
  };

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
          <div className="flex space-x-10 ml-10">
            <div>
              <button className="mt-5 border-2 p-2" onClick={openModal}>
                EDIT PROFILE
              </button>
              <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <button
                  onClick={closeModal}
                  className="bg-black text-red-600 text-2xl"
                >
                  CANCEL
                </button>

                <UpdateInfo currentUser={currentUser} user={user} />
              </Modal>
            </div>
            <div>
              <button className="mt-5 border-2 p-2" onClick={openPhotoModal}>
                UPDATE PHOTO
              </button>
              <Modal
                isOpen={photoModalOpen}
                onRequestClose={closePhotoModal}
                style={customStyles}
              >
                <UploadPhoto />
                <button
                  onClick={closePhotoModal}
                  className="bg-black text-red-600 text-2xl ml-20"
                >
                  CANCEL
                </button>
              </Modal>
            </div>
          </div>
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
            currentUser?.tracks?.map(({ name, url }, index) => (
              <div key={index} className="p-2">
                <a href={url}>{name}</a>
              </div>
            ))
          )}
        </div>
      </div>
      {/* PROJECTS */}
      <div className="grid grid-cols-10 ml-10 mt-5">
        <div className="col-span-9 border-2">
          <h1 className="grid text-3xl p-2 font-extrabold">PROJECTS:</h1>
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
                      {/* <Image src={screen} alt="screen" width={200} height={200} /> */}
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
        </div>
      </div>
    </>
  );
}

export default User;
