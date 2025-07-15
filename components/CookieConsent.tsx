"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { X } from "lucide-react";

interface CookieConsentContextType {
  hasConsent: boolean;
  consentType: string | null;
  updateConsent: (type: string) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  hasConsent: false,
  consentType: null,
  updateConsent: () => {},
});

export const useCookieConsent = () => useContext(CookieConsentContext);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consentType, setConsentType] = useState<string | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      setConsentType(consent);
    }
  }, []);

  const updateConsent = (type: string) => {
    localStorage.setItem("cookie-consent", type);
    setConsentType(type);
  };

  const hasConsent = consentType === "all" || consentType === "essential";

  return (
    <CookieConsentContext.Provider
      value={{ hasConsent, consentType, updateConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const { updateConsent } = useCookieConsent();

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    updateConsent("all");
    setShowConsent(false);
    // Enable third-party content
    window.location.reload();
  };

  const acceptEssential = () => {
    updateConsent("essential");
    setShowConsent(false);
  };

  const decline = () => {
    updateConsent("declined");
    setShowConsent(false);
    // Block all non-essential cookies
    document.cookie =
      "disable-tracking=true; path=/; max-age=31536000; SameSite=Strict";
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">
            We use cookies to enhance your experience
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            We use essential cookies for site functionality. Third-party cookies
            (Google Maps, analytics) are only loaded with your consent. You can
            manage your preferences anytime.
          </p>
          <details className="text-xs text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700">
              View cookie details
            </summary>
            <div className="mt-2 space-y-1">
              <p>
                <strong>Essential:</strong> Site functionality, form submissions
              </p>
              <p>
                <strong>Analytics:</strong> Google Maps for location display
              </p>
              <p>
                <strong>Third-party:</strong> Social media embeds (only when you
                click)
              </p>
            </div>
          </details>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Decline All
          </button>
          <button
            onClick={acceptEssential}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Accept All
          </button>
        </div>
        <button
          onClick={decline}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close cookie consent"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
