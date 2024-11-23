import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import 'core-js/features/promise';
import 'core-js/features/promise/all-settled';
import MainLayout from '../components/Layout/MainLayout';
import { GlobalStyles } from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Ensure Promise polyfills are loaded
    if (typeof Promise.allSettled === 'undefined') {
      require('core-js/features/promise/all-settled');
    }
  }, []);

  return (
    <MainLayout>
      <GlobalStyles />
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
