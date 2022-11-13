import "../../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bombest Beats</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
