import React, { useRef } from "react";
import { database, storage } from "../../../utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

const UploadButton = () => {
  //   const ref = useRef(undefined);

  const handleClick = () => {
    if (ref) {
      return ref.current?.click();
    }
  };

  const handleUpload = async (event) => {
    if (!database) return;

    const uploadedFile = event?.target.files[0];
    if (!uploadedFile) return;

    console.log(storage.bucket());
    console.log("I am ref: ", ref);
    // const storageRef = storage.ref("beats");
    const storageRef = ref(storage, `beats`);
    // const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    try {
      await storageRef.child(uploadedFile.name).put(uploadedFile);
      alert("Successfully uploaded picture!");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <button onClick={() => handleClick()}>Click Me </button>
      <input
        type="file"
        ref={ref}
        accept=".png, .jpg, .jpeg"
        hidden
        onChange={handleUpload}
      />
    </div>
  );
};

export default UploadButton;
