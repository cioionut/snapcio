import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

// local
import createEmotionCache from '../lib/createEmotionCache';
// import theme from '../styles/theme';

// i18n
import '../i18n/init';
// my styles
import '../styles/globalStyles.css';
// color context
import ColorModeContext from '../contexts/ColorModeContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {

  // emotion
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // used when logale comes from server
  if (pageProps.locale)
    i18next.changeLanguage(pageProps.locale);

  // color mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};


export default MyApp;
