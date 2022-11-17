import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

//firebase imports
import { auth } from "../../../utils/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// import { onUserCreate } from "../../../utils/firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Navbar() {
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();
  const [user] = useAuthState(auth);
  const dbInstance = collection(database, "users");
  const [docs] = useCollectionData(dbInstance);
  let currentUser;

  if (user) {
    currentUser = docs?.find((doc) => doc.email === user.email);
  }

  const createUser = async (newUser) => {
    const userRef = doc(database, "users", user.email);

    if (user && currentUser) {
      return;
    } else {
      const newUser = await setDoc(
        userRef,
        {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          location: "UPDATE YOUR LOCATION",
          bio: "UPDATE YOUR BIO",
          twitter: "ADD YOUR TWITTER",
          instagram: "ADD YOUR INSTAGRAM",
          soundcloud: "ADD YOUR SOUNDCLOUD",
        },
        { merge: true }
      );
    }
  };

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };

  useEffect(() => {
    if (user && !currentUser) {
      createUser(user);
    }
  }, [user]);

  const handleSignOut = () => {
    auth.signOut();
    router.push("/");
  };

  console.log("NAVBAR USER", currentUser);

  return (
    <header>
      <div className="flex items-center space-x-3 p-2 pl-6 bg-blue-400 text-white  ">
        {/* LEFT NAV */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 text-5xl">
          <Link href="/">
            <h3>BOMBBEATZ</h3>
          </Link>
        </div>
        {/* RIGHT NAV */}
        <div className="text-white flex items-center space-x-6 mx-6 whitespace-nowrap pl-10 text-2xl">
          <Link href="/discover">
            <p className="link">Discover</p>
          </Link>
          <Link href="/board">
            <p className="link">New Project</p>
          </Link>
          {!user && (
            <div onClick={login} className="link">
              <p>Sign In</p>
            </div>
          )}
          {user && (
            <>
              <Link href="/user" className="flex p-2">
                <Image
                  src={user.photoURL}
                  alt=""
                  width={40}
                  height={40}
                  className="link rounded-full"
                />

                <p className="text-xl ml-2 pl-1 mt-1">
                  {`Hello, ${currentUser?.name}!`}
                </p>
              </Link>

              <div>
                <p className="link text-md" onClick={handleSignOut}>
                  Sign Out
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
