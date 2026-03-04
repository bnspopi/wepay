import { useLanguage } from '../i18n/languageContext';
import { translations } from '../i18n/translations';

export function useTranslation() {
  const { language: lang, setLanguage: setLang } = useLanguage();

  const t = (key: string) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return { t, lang, setLang };
}
