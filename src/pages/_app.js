import "../../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Bomb Beatz</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

//removed next auth
