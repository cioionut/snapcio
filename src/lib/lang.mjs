import pkg from '../i18n/config.js';
const { languages, defaultLanguage } = pkg;

export function getSortedLangsData() {
	return languages;
}

export function getAllLanguageSlugs() {
	return languages.map((locale) => {
		return { params: { locale: locale } };
	});
}

export function getLanguage(locale) {
	return languages.includes(locale) ? locale : defaultLanguage;
}