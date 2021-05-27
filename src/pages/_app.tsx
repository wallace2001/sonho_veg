import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../context/authContext';
import '../../styles/globals.scss';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Loading } from '../components/loading';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ChakraProvider>
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100&display=swap" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp
