import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { database, storage, beatsRef } from "../../../utils/firebase";
import { auth } from "../../../utils/firebase";
import {
  collection,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const UploadButton = () => {
  // State to store uploaded file
  const [file, setFile] = useState("");
  // progress
  const [percent, setPercent] = useState(0);
  const [user, setUser] = useAuthState(auth);

  const dbRef = doc(database, "users", `${user?.email}`);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = async (event) => {
    if (!database) return;

    if (!file) return;

    const storageRef = ref(storage, `users/${user.email}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          updateDoc(dbRef, { sounds: arrayUnion(url) })
            .then(() => console.log("url loaded to collection"))
            .catch((e) => console.log(e));
          console.log(url);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>
        {percent} % done {percent === 100 ? "FILE UPLOADED!" : ""}
      </p>
    </div>
  );
};

export default UploadButton;
