import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    </>
  );
}
export default MyApp;