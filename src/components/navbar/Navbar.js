import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center space-x-3 p-2 pl-6 bg-blue-400 text-white text-sm">
      <Link href="/discover">
        <p className="link">Discover</p>
      </Link>
      <p className="link">My Projects</p>
      <p className="link">Login</p>
      <p className="link">Sign Up</p>
    </div>
  );
}

export default Navbar;
