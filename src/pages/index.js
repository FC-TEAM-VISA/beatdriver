import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Navbar from "../components/navbar/Navbar";
import User from "../components/users/User";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className="text-5xl">Welcome to the beat maker!</h1>
      </main>
    </div>
  );
}
