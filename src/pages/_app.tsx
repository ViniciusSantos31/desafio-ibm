import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className="bg-gray-900 h-full min-h-screen flex self-center">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
