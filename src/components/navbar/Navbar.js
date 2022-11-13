import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  if (session) {
    console.log("session here:", session.user);
  }

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
          {!session && (
            <div onClick={signIn} className="link">
              <p>Sign In</p>
            </div>
          )}
          {session && (
            <>
              <Link href="/user" className="flex p-2">
                <Image
                  src={session.user.image}
                  alt=""
                  width={40}
                  height={40}
                  className="link rounded-full"
                />

                <p className="font-bold text-md md:text-sm ml-3 mt-3">
                  {`Hello, ${session.user.name}!`}
                </p>
              </Link>

              <div>
                <p className="link" onClick={signOut}>
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
