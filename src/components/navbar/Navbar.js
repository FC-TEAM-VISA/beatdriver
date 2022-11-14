import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth } from "../../../utils/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// import { onUserCreate } from "../../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Navbar() {
  const googleAuth = new GoogleAuthProvider();
  const [user, setUser] = useAuthState(auth);
  const dbInstance = collection(database, "users");
  const [docs, loading, error] = useCollectionData(dbInstance);
  let userExists = false;

  const createUser = (user) => {
    return addDoc(dbInstance, {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });
  };

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };

  // onUserCreate(user);

  useEffect(() => {
    if (user) {
      docs?.filter((currUser) => {
        if (currUser.email === user.email) {
          userExists = true;
          console.log("you already exist");
        }
      });

      if (!userExists) {
        createUser(user);
      }
      userExists = false;
    }
  }, [user]);

  return (
    <header>
      <div className="flex items-center space-x-3 p-2 pl-6 bg-blue-400 text-white text-sm ">
        {/* LEFT NAV */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Link href="/">
            <h3>BOMBBEATZ</h3>
          </Link>
        </div>
        {/* RIGHT NAV */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap pl-10">
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

                <p className="font-bold text-md md:text-sm ml-3 mt-3">
                  {`Hello, ${user.displayName}!`}
                </p>
              </Link>

              <div>
                <p className="link" onClick={() => auth.signOut()}>
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

//let's get it
