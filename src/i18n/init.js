import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

import pkg from './config';
const { languages, defaultLanguage } = pkg;


const locales = Object.assign(
	{},
	...Object.keys(languages).map((index) => {
		return {
			[languages[index]]: {
				'common': 			require('../locales/' + languages[index] + '/common.json'),
				'cookieconsent': 	require('../locales/' + languages[index] + '/cookieconsent.json'),
				'days-of-week': 	require('../locales/' + languages[index] + '/days-of-week.json'),
				'footer': 			require('../locales/' + languages[index] + '/footer.json'),
				'home': 			require('../locales/' + languages[index] + '/home.json'),
				'ionkomAds': 		require('../locales/' + languages[index] + '/ionkom_main_ad.json'),
				'months-of-year': 	require('../locales/' + languages[index] + '/months-of-year.json'),
			},
		};
	}),
);

const detection = {
	// order and from where user language should be detected
	order: [
		'querystring',
		'cookie',
		'localStorage',
		'sessionStorage',
		'navigator',
		'htmlTag',
		'path',
		'subdomain',
	],

	// keys or params to lookup language from
	lookupCookie: 'lng',
	lookupLocalStorage: 'lng',
	lookupFromPathIndex: 0,
	lookupFromSubdomainIndex: 0,

	// cache user language on
	caches: ['localStorage', 'cookie'],
	excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

	// optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
	cookieOptions: { path: '/', sameSite: 'strict' },
};

i18next
.use(initReactI18next)
.use(LanguageDetector).init({
	detection: detection,
	fallbackLng: defaultLanguage,
	resources: locales,
	ns: ['common'],
	defaultNS: 'common',
	returnObjects: true,
	debug: false,
	interpolation: {
		escapeValue: false, // not needed for react!!
	},
	// react i18next special options (optional)
    // override if needed - omit if ok with defaults
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    
});

export default i18next;