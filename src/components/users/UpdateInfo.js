import React, { useState } from "react";
import { database } from "../../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

function UpdateInfo({ currentUser, user }) {
  const dbRef = doc(database, "users", `${user.uid}`);
  const [name, setName] = useState(`${currentUser?.name}`);
  const [bio, setBio] = useState(`${currentUser?.bio}`);
  const [location, setLocation] = useState(`${currentUser?.location}`);
  const [twitter, setTwitter] = useState(`${currentUser?.twitter}`);
  const [instagram, setInstagram] = useState(`${currentUser?.instagram}`);
  const [soundcloud, setSoundcloud] = useState(`${currentUser?.soundcloud}`);

  const updateName = (newName) => {
    updateDoc(dbRef, {
      name: newName,
    });
  };
  const updateBio = (newBio) => {
    updateDoc(dbRef, {
      bio: newBio,
    });
  };
  const updateLocation = (newLoc) => {
    updateDoc(dbRef, {
      location: newLoc,
    });
  };
  const updateInstagram = (newInsta) => {
    updateDoc(dbRef, {
      instagram: newInsta,
    });
  };
  const updateTwitter = (newTwitter) => {
    updateDoc(dbRef, {
      twitter: newTwitter,
    });
  };
  const updateSoundcloud = (newSound) => {
    updateDoc(dbRef, {
      soundcloud: newSound,
    });
  };

  return (
    <>
      {/* NAME */}
      <div className="grid place-items-center m-10">
        <input
          type="text"
          placeholder="edit name..."
          className="p-1 mt-2"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button
          className="p-1 underline cursor-pointer"
          onClick={() => updateName(name)}
        >
          Edit Name
        </button>
        {/* BIO */}
        <input
          type="text"
          placeholder="edit bio..."
          className="p-1 mt-2"
          onChange={(e) => setBio(e.target.value)}
        ></input>
        <button
          className="p-1 underline cursor-pointer"
          onClick={() => updateBio(bio)}
        >
          Edit Bio
        </button>
        {/* LOCATION */}
        <input
          type="text"
          placeholder="edit location..."
          className="p-1 mt-2"
          onChange={(e) => setLocation(e.target.value)}
        ></input>
        <button
          className="p-1 underline cursor-pointer"
          onClick={() => updateLocation(location)}
        >
          Edit Location
        </button>
        {/* TWITTER */}
        <input
          type="text"
          placeholder="edit twitter..."
          className="p-1 mt-2"
          onChange={(e) => setTwitter(e.target.value)}
        ></input>
        <button
          className="p-1 underline cursor-pointer"
          onClick={() => updateTwitter(twitter)}
        >
          Edit Twitter
        </button>
        {/* SOUNDCLOUD */}
        <input
          type="text"
          placeholder="edit soundcloud..."
          className="p-1 mt-2"
          onChange={(e) => setSoundcloud(e.target.value)}
        ></input>
        <button
          className="p-1 underline cursor-pointer"
          onClick={() => updateSoundcloud(soundcloud)}
        >
          Edit SoundCloud
        </button>
        {/* INSTAGRAM */}
        <input
          type="text"
          placeholder="edit instagram..."
          className="p-1 mt-2"
          onChange={(e) => setInstagram(e.target.value)}
        ></input>
        <button
          className="p-1 underline cursor-pointer"
          onClick={() => updateInstagram(instagram)}
        >
          Edit Instagram
        </button>
      </div>
    </>
  );
}

export default UpdateInfo;
