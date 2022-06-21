import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { FavProvider } from "services/hooks/useFav";
import { QueryProvider } from "services/hooks/useQuery";
import "styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <FavProvider>
        <ChakraProvider>
          <div className="bg-gray-900 h-full min-h-screen flex self-center">
            <Component {...pageProps} />
          </div>
        </ChakraProvider>
      </FavProvider>
    </QueryProvider>
  );
}

export default MyApp;
