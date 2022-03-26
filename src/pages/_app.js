import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { CacheProvider } from '@emotion/react';
import { useCookies } from "react-cookie";
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';

// local
import '../i18n/init';
import * as gtag from '../lib/gtag';
import createEmotionCache from '../lib/createEmotionCache';

// import theme from '../styles/theme';
import '../styles/globalStyles.css';
import ColorModeContext from '../contexts/ColorModeContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens) => {
  console.log('onKeycloakTokens', tokens)
}

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [mode, setMode] = React.useState('light');
  const [cookies, setCookie] = useCookies(['colorMode']);
  const [keycloak, setKeycloak] = useState(null);

  // used when logale comes from server
  if (pageProps.locale) {
    i18next.changeLanguage(pageProps.locale);
  }

  useEffect(async () => {
    // set color mode
    const startMode = cookies.colorMode ?? 'light';
    setMode(startMode);
    // set keycloak
    const keycloak = (await import('../lib/keycloak')).default;
    setKeycloak(keycloak);
  }, []);

  const colorMode = React.useMemo(() => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          setCookie('colorMode', newMode, { path: '/', maxAge: 7889231 });
          return newMode
        });
      },
  }), [setCookie]);

  // todo: fix dark mode: https://mui.com/customization/dark-mode/
  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
        palette: {
          mode,
          ...(mode === 'light'
          ? {
              // palette values for light mode
              primary: { main: '#0095f6' },
              // divider: amber[200],
              // text: {
              //   primary: grey[900],
              //   secondary: grey[800],
              // },
            }
          : {
              // palette values for dark mode
              // primary: { main: '#0095f6' },
              // primary: deepOrange,
              // divider: deepOrange[700],
              // background: {
              //   default: deepOrange[900],
              //   paper: deepOrange[900],
              // },
              // text: {
              //   primary: '#fff',
              //   secondary: grey[500],
              // },
            }),
        },
      }),
    [mode],
  );

  // console.log(mode, theme.palette.mode)

  // google analytics
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  if (keycloak !== null)
    return (
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={eventLogger}
        onTokens={tokenLogger}
      >
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
      </ReactKeycloakProvider>
    );

  return null;
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};


export default MyApp;
