import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <header>
      <div className="flex items-center space-x-3 p-2 pl-6 bg-blue-400 text-white text-sm ">
        {/* LEFT NAV */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 mr-80">
          <Link href="/">
            <h3>BOMBBEATZ</h3>
          </Link>
        </div>
        {/* RIGHT NAV */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap pl-48">
          {/* <div onClick={!session ? signIn : signOut} className="link">
            {session ? `Hello, ${session.user.name}!` : "Sign In"}
            <p className="font-extrabold md:text-sm">Log In</p>
          </div> */}
          <Link href="/discover">
            <p className="link">Discover</p>
          </Link>
          <Link href="/board">
            <p className="link">New Project</p>
          </Link>
          <p className="link">Sign In</p>
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
