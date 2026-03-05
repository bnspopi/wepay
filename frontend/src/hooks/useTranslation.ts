import { useContext } from "react";
import { LanguageContext } from "../i18n/languageContext";

export function useTranslation() {
  const { language } = useContext(LanguageContext);

  const translations: any = {
    en: {
      welcome: "Welcome",
      login: "Login",
      register: "Register"
    },
    hi: {
      welcome: "स्वागत है",
      login: "लॉगिन",
      register: "रजिस्टर"
    }
  };

  function t(key: string) {
    return translations[language]?.[key] || key;
  }

  return { t };
}
