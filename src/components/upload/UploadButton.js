import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { database, storage, beatsRef } from "../../../utils/firebase";
import { auth } from "../../../utils/firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const UploadButton = () => {
  // State to store uploaded file
  const [file, setFile] = useState("");
  // progress
  const [percent, setPercent] = useState(0);
  const [user] = useAuthState(auth);

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
          updateDoc(dbRef, {
            sounds: arrayUnion({ name: file.name, url }),
          })
            .then(() => console.log("url loaded to collection"))
            .catch((e) => console.log(e));
        });
      }
    );
  };

  return (
    <div className="grid place-items-center p-2">
      <input
        type="file"
        onChange={handleChange}
        accept="/image/*"
        className=" text-purple-500 pl-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-200 file:cursor-pointer file:rounded-md"
      />
      <button onClick={handleUpload} className="p-1 border-2 mt-5">
        UPLOAD AUDIO
      </button>
      <p className="mt-2">
        {percent} % done. {percent === 100 ? "FILE UPLOADED!" : ""}
      </p>
    </div>
  );
};

export default UploadButton;
