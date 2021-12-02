import 'bootstrap/dist/css/bootstrap.min.css';

import '../i18n/init';

// my styles
import '../styles/globalStyles.css';


function MyApp({ Component, pageProps }) {

  // used when logale comes from server
  if (pageProps.locale)
    i18next.changeLanguage(pageProps.locale);

  return <Component {...pageProps} />
}

export default MyApp
