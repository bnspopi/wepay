import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Universal Translation Script
window.currentLanguage = "en";

window.changeLanguage = async function(lang) {
  window.currentLanguage = lang;

  const elements = document.querySelectorAll("body *:not(script):not(style)");

  elements.forEach(async (node) => {
    const el = node as HTMLElement;
    if (el.children.length === 0 && el.innerText?.trim().length > 0) {

      const original = el.getAttribute("data-original-text") || el.innerText;
      el.setAttribute("data-original-text", original);

      if (lang === "en") {
        el.innerText = original;
      } else {
        try {
          const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(original)}`
          );
          const data = await res.json();
          el.innerText = data[0][0][0];
        } catch (e) {
          el.innerText = original;
        }
      }
    }
  });

  // Digit localization
  document.querySelectorAll("[data-number]").forEach(el => {
    const value = el.getAttribute("data-number");
    if (value) {
      (el as HTMLElement).innerText = new Intl.NumberFormat(lang + "-IN").format(Number(value));
    }
  });

  // RTL Support
  const rtlLanguages = ["ur", "ks", "sd"];
  document.body.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr";
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
