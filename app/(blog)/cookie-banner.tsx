"use client";

import { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookie("local-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie("local-consent", "true", { maxAge: 60 * 60 * 24 * 365 });
    setShowBanner(false);
    window.location.reload(); 
  };

  const declineCookies = () => {
    setCookie("local-consent", "false", { maxAge: 60 * 60 * 24 * 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-[100] bg-[#fdf6e3] border-2 border-[#4E3524] p-6 shadow-[8px_8px_0px_0px_rgba(78,53,36,0.2)] rounded-sm">
      <h3 className="font-serif font-bold text-[#4E3524] uppercase tracking-wider mb-2 text-lg">
        Avis de passage
      </h3>
      <p className="text-sm text-[#4E3524]/80 mb-6 leading-relaxed">
        Ce journal utilise des cookies pour savoir si vous préférez le banjo ou la steel-guitar (et pour nos statistiques de visite).
      </p>
      <div className="flex gap-4">
        <button 
          onClick={acceptCookies}
          className="flex-1 bg-[#4E3524] text-[#fdf6e3] py-2 text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
        >
          Accepter
        </button>
        <button 
          onClick={declineCookies}
          className="flex-1 border border-[#4E3524] text-[#4E3524] py-2 text-xs uppercase tracking-widest font-bold hover:bg-[#4E3524]/5 transition-colors"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}