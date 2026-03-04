/// <reference types="vite/client" />

interface Window {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
}
