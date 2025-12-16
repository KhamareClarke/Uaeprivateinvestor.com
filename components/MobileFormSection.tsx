'use client';

import { useEffect } from 'react';
import { loadGoogleTag } from '@/lib/googleTag';

export default function MobileFormSection() {
  // Load GHL form embed script
  useEffect(() => {
    if (document.querySelector('script[src*="form_embed.js"]')) {
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Listen for form submission events from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const isFromForm = event.origin.includes('leadconnectorhq.com') || 
                        event.origin.includes('msgsndr.com') ||
                        event.data?.formId === '7RM5Dr1meRUfG03B13ci';

      if (!isFromForm) return;

      if (event.data) {
        if (typeof event.data === 'string') {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'hsFormCallback' || 
                data.event === 'form-submitted' || 
                data.action === 'submit' ||
                data.type === 'formSubmitted' ||
                data.status === 'success') {
              loadGoogleTag();
            }
          } catch (e) {
            const messageStr = event.data.toLowerCase();
            if (messageStr.includes('form-submitted') || 
                messageStr.includes('formsubmitted') ||
                (messageStr.includes('success') && messageStr.includes('form'))) {
              loadGoogleTag();
            }
          }
        } else if (typeof event.data === 'object') {
          if (event.data.type === 'formSubmitted' || 
              event.data.event === 'form-submitted' ||
              event.data.status === 'success') {
            loadGoogleTag();
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section className="lg:hidden py-12 px-4 pb-24 bg-gradient-to-br from-navy-900 via-navy-800 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-black/50" />
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      
      <div className="relative z-10 max-w-lg mx-auto">
        <div className="bg-white/25 md:bg-white/10 backdrop-blur-xl border-2 md:border border-white/40 md:border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-3 mb-6 text-center">
              <h2 className="text-2xl md:text-2xl font-black text-white leading-tight tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                Private Investment Review
              </h2>
              <p className="text-sm md:text-sm text-white font-semibold leading-relaxed" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                A confidential review designed to assess:
              </p>
              <div className="text-xs md:text-xs text-white font-bold flex items-center justify-center flex-wrap gap-x-2 gap-y-1 px-3 py-2 bg-white/15 md:bg-white/5 rounded-lg border-2 md:border border-white/30 md:border-white/10" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                <span className="text-primary-400 font-bold">•</span>
                <span className="font-bold">Capital range</span>
                <span className="text-primary-400 font-bold">•</span>
                <span className="font-bold">Residency objectives</span>
                <span className="text-primary-400 font-bold">•</span>
                <span className="font-bold">Preferred jurisdiction</span>
              </div>
              <p className="text-sm md:text-sm text-white font-bold pt-1" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                Handled directly by a senior RERA-licensed advisor.
              </p>
              <p className="text-xs md:text-xs text-white/90 italic font-semibold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                No obligation. No pressure.
              </p>
            </div>

            {/* GHL Embedded Form */}
            <div className="relative w-full" style={{ minHeight: '625px' }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/7RM5Dr1meRUfG03B13ci"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '3px',
                  minHeight: '625px'
                }}
                id="inline-mobile-7RM5Dr1meRUfG03B13ci"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Form 1"
                data-height="625"
                data-layout-iframe-id="inline-mobile-7RM5Dr1meRUfG03B13ci"
                data-form-id="7RM5Dr1meRUfG03B13ci"
                title="Form 1"
              />
            </div>

            {/* Trust Badges */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-4 text-xs text-white">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/15 md:bg-white/5 rounded-lg border-2 md:border border-white/30 md:border-white/10" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                  <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-bold">RERA Licensed</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/15 md:bg-white/5 rounded-lg border-2 md:border border-white/30 md:border-white/10" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                  <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7m-6 4h4" />
                  </svg>
                  <span className="font-bold">100% Confidential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
