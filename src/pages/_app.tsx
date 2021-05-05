import { ChakraProvider } from '@chakra-ui/react';
import '../../styles/globals.scss';
import { AuthProvider } from '../context/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp
