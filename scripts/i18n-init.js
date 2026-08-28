/**
 * js/i18n-init.js
 * Initialise i18next avec :
 *  - i18next-http-backend       -> charge locales/{{lng}}/translation.json via fetch
 *  - i18next-browser-languagedetector -> détecte la langue (localStorage puis navigateur)
 *
 * Convention sur les éléments HTML (inspirée de jquery-i18next, sans jQuery) :
 *   data-i18n="cle.imbriquee"                     -> injecte le texte (innerHTML) dans l'élément
 *   data-i18n="[attr]cle.imbriquee"                -> injecte la valeur dans l'attribut "attr"
 *   data-i18n="[attr1]cle1; [attr2]cle2; cle3"     -> plusieurs cibles sur le même élément, séparées par ";"
 */

function localize(root) {
	root = root || document;

	root.querySelectorAll('[data-i18n]').forEach((el) => {
		const directives = el
			.getAttribute('data-i18n')
			.split(';')
			.map((d) => d.trim())
			.filter(Boolean);

		directives.forEach((directive) => {
			const attrMatch = directive.match(/^\[([^\]]+)\](.+)$/);
			if (attrMatch) {
				const attrName = attrMatch[1];
				const key = attrMatch[2];
				el.setAttribute(attrName, i18next.t(key));
			} else {
				el.innerHTML = i18next.t(directive);
			}
		});
	});

	document.documentElement.lang = i18next.language;
}

i18next
	.use(i18nextHttpBackend)
	.use(i18nextBrowserLanguageDetector)
	.init({
		fallbackLng: 'fr',
		supportedLngs: ['fr', 'en'],
		debug: false,
		backend: {
			loadPath: 'locales/{{lng}}/translation.json'
		},
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage']
		}
	})
	.then(() => {
		localize(document);
	})
	.catch((err) => {
		console.error('[i18next] Erreur d\'initialisation :', err);
	});

i18next.on('languageChanged', () => {
	localize(document);
});

window.toggleLang = function () {
	console.log("Changed");
	const current = (i18next.language || 'fr').slice(0, 2);
	const next = current === 'fr' ? 'en' : 'fr';
	i18next.changeLanguage(next);
};
