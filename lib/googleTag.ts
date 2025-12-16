/**
 * Loads Google Tag (gtag.js) script for conversion tracking
 * This should be called after form completion
 */
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function loadGoogleTag() {
  // Check if script is already loaded
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'AW-17787737097');

  // Load the script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17787737097';
  document.head.appendChild(script);
}
