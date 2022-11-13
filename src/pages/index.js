import { useEffect, useState } from "react";

import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Navbar from "../components/navbar/Navbar";
import User from "../components/users/User";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className="bg-blue-300">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className="bg-blue-500">
          <User />
        </div>
      </main>
    </div>
  );
}
