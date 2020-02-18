import { Global, css } from '@emotion/core';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';

import theme from '../components/theme';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css?family=Space+Mono:400,700');
        `}
      />

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  );
}
