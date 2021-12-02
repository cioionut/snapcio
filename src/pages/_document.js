import Document, { Html, Head, Main, NextScript } from 'next/document';

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
          {/* pwa - favicon */}
          {/* <meta name="theme-color" content="#ffffff"></meta>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
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
