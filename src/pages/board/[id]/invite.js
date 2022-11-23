import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { database, auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const projectRef = doc(database, "projects", context.query.id);
  const project = await getDoc(projectRef);
  const projectData = { id: project.id, ...project.data() };
  return {
    props: {
      data: JSON.parse(JSON.stringify(projectData)),
    },
  };
};

const Invite = ({ data }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const projectRef = doc(database, "projects", data.id);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const closeSignInModal = () => setSignInOpen(false);
  const closeOwnerModal = () => setOwnerOpen(false);

  const handleAcceptInvite = () => {
    if (!user) {
      setSignInOpen(true);
    } else if (user.uid === data.ownerId) {
      setOwnerOpen(true);
    } else {
      console.log("Successfully accepted invite!");

      updateDoc(projectRef, {
        collaboratorIds: arrayUnion(user.uid),
      });

      router.push({
        pathname: `/board/[id]`,
        query: { id: data.id },
      });
    }
  };

  return (
    <>
      {!user ? (
        <h3 className="text-2xl text-center">
          Please log in to accept {data.username}'s invitation to collaborate on{" "}
          {data.name}.
        </h3>
      ) : (
        <div>
          <h3 className="text-2xl p-5">
            {data.ownerId} is inviting you to collaborate on their project{" "}
            {data.name}
          </h3>
          <button
            onClick={handleAcceptInvite}
            className="flex items-center justify-center mt-1 mx-2 border-2 p-1 bg-blue-900 hover:bg-blue-600 border-white"
          >
            Accept invite
          </button>
        </div>
      )}

      <Popup
        open={signInOpen}
        closeOnDocumentClick
        onClose={closeSignInModal}
        className="popup-content"
      >
        <div className="grid bg-oxford_blue place-items-center">
          <p className="text-4xl mt-10 mb-5">
            Please sign in to accept invite.
          </p>
          <p className="mb-10">click anywhere to close</p>
        </div>
      </Popup>

      <Popup
        open={ownerOpen}
        closeOnDocumentClick
        onClose={closeOwnerModal}
        className="popup-content"
      >
        <div className="grid bg-oxford_blue place-items-center">
          <p className="text-4xl mt-10 mb-5">
            You are the owner of this project.
          </p>
          <p className="mb-10">click anywhere to close</p>
        </div>
      </Popup>
    </>
  );
};

export default Invite;
