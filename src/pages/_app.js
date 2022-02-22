import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie] = useCookies(['colorMode']);

  // emotion
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // used when logale comes from server
  if (pageProps.locale)
    i18next.changeLanguage(pageProps.locale);

  // color mode
  const [mode, setMode] = React.useState('light');

  React.useEffect(() => {
    const startMode = cookies.colorMode ?? 'light';
    setMode(startMode);
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
