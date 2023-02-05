import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>dekode</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="decode any smart contract to understand better"
        />
        <meta
          property="og:description"
          content="decode any smart contract to understand better"
        />
        <meta property="og:title" content="Keybrief" />
        <meta property="og:url" content="https://www.dekodeapp.xyz/" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
