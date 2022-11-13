import "../../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/navbar/Navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>Bomb Beatz</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
