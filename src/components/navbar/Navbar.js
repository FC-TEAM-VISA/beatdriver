import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  if (session) {
    console.log("session here:", session.user.name);
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
          <div onClick={signIn} className="link">
            <p className="font-extrabold md:text-sm">
              {session ? `Hello, ${session.user.name}!` : "Sign In"}
            </p>
          </div>
          {session && (
            <div onClick={signOut} className="link">
              <p>Sign Out</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

{
  /* <div className="flex items-center space-x-3 p-2 pl-6 bg-blue-400 text-white text-sm">

<p className="link">My Projects</p>
<p className="link">Login</p>
<p className="link">Sign Up</p>
</div> */
}
