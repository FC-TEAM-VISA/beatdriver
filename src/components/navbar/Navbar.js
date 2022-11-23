import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
//firebase imports
import { auth } from "../../../utils/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Navbar() {
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();
  const [userGoogleInfo] = useAuthState(auth);
  const dbInstance = collection(database, "users");
  const [docs] = useCollectionData(dbInstance);
  let currentUser;
  if (userGoogleInfo) {
    currentUser = docs?.find((doc) => doc.email === userGoogleInfo.email);
  }

  const login = async () => {
    await signInWithPopup(auth, googleAuth).then(async (result) => {
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result);
      if (isNewUser) {
        await addUser(user.uid, user.displayName, user.email, user.photoURL);
      } else {
        console.log("User already exists");
      }
    });
  };

  const addUser = async (userId, displayName, email, photoURL) => {
    const userRef = doc(database, "users", userId);
    return await setDoc(userRef, {
      createdAt: serverTimestamp(),
      id: userId,
      name: displayName,
      email: email,
      photo: photoURL,
      location: "UPDATE YOUR LOCATION",
      bio: "UPDATE YOUR BIO",
      twitter: "ADD YOUR TWITTER",
      instagram: "ADD YOUR INSTAGRAM",
      soundcloud: "ADD YOUR SOUNDCLOUD",
    });
  };

  const handleSignOut = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <header>
      <div className="flex flex-grow cursor-pointer place-items-center space-x-3 p-2 pl-6 bg-indigo_dye text-ghost_white">
        {/* LEFT NAV */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 text-5xl">
          <Link href="/">
            <h3>BOMBBEATZ</h3>
          </Link>
        </div>
        {/* RIGHT NAV */}
        <div className="text-ghost_white flex items-center space-x-6 mx-6 whitespace-nowrap pl-10 text-2xl">
          <Link href="/discover">
            <p className="link">Discover</p>
          </Link>
          <Link href="/board">
            <button className="link">New Project</button>
          </Link>
          {!userGoogleInfo && (
            <button onClick={login} className="link">
              <p>Sign In</p>
            </button>
          )}
          {userGoogleInfo && (
            <>
              <Link href="/user" className="flex p-2">
                <Image
                  src={
                    currentUser ? currentUser.photo : userGoogleInfo.photoURL
                  }
                  alt=""
                  width={40}
                  height={40}
                  className="link rounded-full"
                />

                <p
                  className="text-xl ml-2 pl-1 mt-1"
                  style={{ marginTop: "5.6%" }}
                >
                  {`Hello, ${
                    currentUser ? currentUser.name : userGoogleInfo.displayName
                  }!`}
                </p>
              </Link>

              <div>
                <button className="link text-md" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
