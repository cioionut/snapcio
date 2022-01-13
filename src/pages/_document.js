import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

// local
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../styles/theme';

import { getLanguage } from '../lib/lang';

export default class MyDocument extends Document {  
  render() {
    // get locale
    const locale = this.props.__NEXT_DATA__.query.locale;
    const restPath = this.props.dangerousAsPath;
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    let canonical = (baseURL && !restPath.includes('api'))
                      ? baseURL.concat(restPath) : undefined;

    let language = getLanguage(locale);
  
    return (
      <Html lang={ language }>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}

          {/* pwa - favicon */}
          {/* <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
          <link rel="manifest" href="/favicon_io/site.webmanifest" /> */}
          
          {/* canonical url */}
          <meta property="og:url" content={ canonical }></meta>
          <link rel="canonical" href={ canonical } key="canonical" />

          {/* Adsense */}
          {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
          
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });`,
          }} /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

