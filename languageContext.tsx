import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { translations } from "./translations";
import { useLocation } from "../contexts/LocationContext";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  location: string;
  isManual: boolean;
  setIsManual: (manual: boolean) => void;
  t: (key: string) => string;
  formatNumber: (num: number) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const stateLanguageMap: Record<string, string> = {
  "Andhra Pradesh": "te",
  "Arunachal Pradesh": "en",
  "Assam": "as",
  "Bihar": "hi",
  "Chhattisgarh": "hi",
  "Goa": "kok",
  "Gujarat": "gu",
  "Haryana": "hi",
  "Himachal Pradesh": "hi",
  "Jharkhand": "hi",
  "Karnataka": "kn",
  "Kerala": "ml",
  "Madhya Pradesh": "hi",
  "Maharashtra": "mr",
  "Manipur": "mni",
  "Meghalaya": "kha",
  "Mizoram": "lus",
  "Nagaland": "en",
  "Odisha": "or",
  "Punjab": "pa",
  "Rajasthan": "hi",
  "Sikkim": "ne",
  "Tamil Nadu": "ta",
  "Telangana": "te",
  "Tripura": "bn",
  "Uttar Pradesh": "hi",
  "Uttarakhand": "hi",
  "West Bengal": "bn",
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state: locationState, latitude, longitude } = useLocation();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app_language") || "hi";
  });
  const [location, setLocation] = useState("India");
  const [isManual, setIsManual] = useState(() => {
    return localStorage.getItem("app_language_manual") === "true";
  });

  const updateLanguage = useCallback((lang: string, manual = false) => {
    setLanguage(lang);
    if (manual) {
      setIsManual(true);
      localStorage.setItem("app_language_manual", "true");
    } else {
      setIsManual(false);
      localStorage.setItem("app_language_manual", "false");
    }
    localStorage.setItem("app_language", lang);
  }, []);

  const t = useCallback((key: string) => {
    const translated = translations[language]?.[key] || translations['en']?.[key] || key;
    return translated;
  }, [language]);

  const formatNumber = useCallback((num: number) => {
    try {
      return new Intl.NumberFormat(language + "-IN").format(num);
    } catch (e) {
      return num.toLocaleString();
    }
  }, [language]);

  useEffect(() => {
    if (window.changeLanguage) {
      window.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if (locationState) {
      setLocation(locationState);
      
      const map: Record<string, string> = {
        "West Bengal": "bn",
        "Tamil Nadu": "ta",
        "Maharashtra": "mr",
        "Gujarat": "gu",
        "Karnataka": "kn",
        "Kerala": "ml",
        "Punjab": "pa",
        "Odisha": "or",
        "Assam": "as",
        "Bihar": "hi",
        "Uttar Pradesh": "hi",
        "Rajasthan": "hi",
        "Madhya Pradesh": "hi",
        "Haryana": "hi",
        "Himachal Pradesh": "hi",
        "Delhi": "hi"
      };

      if (!isManual) {
        const lang = map[locationState] || stateLanguageMap[locationState];
        if (lang && lang !== language) {
          setLanguage(lang);
          localStorage.setItem("app_language", lang);
        }
      }
    } else if (latitude && longitude && !isManual) {
      // Fallback detection logic if state is not directly available from reverse geocoding
      let detectedState = "India";
      if (latitude >= 24 && latitude <= 27 && longitude >= 83 && longitude <= 88) detectedState = "Bihar";
      else if (latitude >= 21 && latitude <= 27 && longitude >= 86 && longitude <= 89) detectedState = "West Bengal";
      // ... (rest of the basic detection logic can be kept if needed, but reverse geocoding is better)
      
      if (detectedState !== "India") {
        const lang = stateLanguageMap[detectedState];
        if (lang && lang !== language) {
          setLanguage(lang);
          localStorage.setItem("app_language", lang);
        }
      }
    }
  }, [locationState, latitude, longitude, isManual, language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: (lang) => updateLanguage(lang, true), 
      location,
      isManual,
      setIsManual: (manual: boolean) => {
        setIsManual(manual);
        localStorage.setItem("app_language_manual", manual ? "true" : "false");
      },
      t,
      formatNumber
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

