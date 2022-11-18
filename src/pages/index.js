import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className="text-5xl">Welcome to the beat maker!</h1>
      </main>
    </div>
  );
}
