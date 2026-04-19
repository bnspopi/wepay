import { useLanguage } from './languageContext';
import { translations } from './translations';

export function useTranslation() {
  const { language: lang, setLanguage: setLang } = useLanguage();

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return { t, lang, setLang };
}
