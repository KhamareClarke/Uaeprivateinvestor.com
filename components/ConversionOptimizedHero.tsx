'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useFormModal } from '@/contexts/FormModalContext';

export default function ConversionOptimizedHero() {
  const { openFormModal } = useFormModal();

  const [formData, setFormData] = useState({ 
    name: '', 
    whatsapp: '', 
    email: '', 
    investmentRange: '',
    preferredProject: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name required';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.investmentRange) newErrors.investmentRange = 'Investment range required';
    if (!formData.preferredProject) newErrors.preferredProject = 'Project preference required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Load Google Tag for conversion tracking
      loadGoogleTag();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      setFormData({ name: '', whatsapp: '', email: '', investmentRange: '', preferredProject: '' });
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('quick-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-navy-950 via-navy-900 to-black">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Video element - silent autoplay loop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full"
          poster="/images/dubai-skyline.jpg"
          style={{ 
            objectFit: 'cover', 
            objectPosition: 'center',
            width: '100%',
            height: '100%',
            filter: 'none',
            WebkitFilter: 'none' as any,
            transform: 'none',
            imageRendering: 'crisp-edges' as any,
            opacity: 1
          } as React.CSSProperties}
        >
          <source src="/images/hero-background.mp4" type="video/mp4" />
          {/* Fallback image */}
        </video>
        
        {/* Fallback image for browsers that don't support video */}
        <div className="absolute inset-0 bg-navy-900 -z-10">
          <Image
            src="/images/dubai-skyline.jpg"
            alt="Abu Dhabi and Dubai skyline - Golden Visa property investment UAE"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        
        {/* Light overlay for text readability - positioned above video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10"></div>
      </div>

      {/* Header with Logo and Contact */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="bg-white/5 backdrop-blur-xl px-3 sm:px-6 py-2 sm:py-3 rounded-lg border border-[#FF6A00]/20">
              <div className="text-sm sm:text-lg lg:text-xl font-serif font-bold text-white tracking-wide">
                <span className="text-[#FF6A00]">CITY PLAZA</span> <span className="hidden xs:inline">REAL ESTATE</span><span className="xs:hidden">RE</span>
              </div>
            </div>
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/971529009133"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-3 bg-white/10 hover:bg-[#FF6A00]/20 backdrop-blur-xl px-6 py-3 rounded-lg border border-white/10 hover:border-[#FF6A00]/50 transition-all group"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-white font-semibold text-sm" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>+971 52 900 9133</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in">
              
              {/* Main Headline */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-4 sm:mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}>
                Private Access to Prime
                <br />
                <span className="text-gradient-gold inline-block" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}>UAE Real Estate</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 sm:mb-6 lg:mb-8 leading-relaxed font-light" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)' }}>
                Developer-direct residences. Golden Visa eligible. Handled discreetly.
              </p>
                
                {/* Trust Strip */}
                <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 lg:gap-x-6 gap-y-2 sm:gap-y-3 text-white text-xs sm:text-sm font-semibold pt-2" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)' }}>
                  <span className="whitespace-nowrap">15+ Years Experience</span>
                  <span className="text-white/60 hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">AED 2B+ Transactions</span>
                  <span className="text-white/60 hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">98% Satisfaction</span>
                  <span className="text-white/60 hidden lg:inline">•</span>
                  <span className="whitespace-nowrap hidden lg:inline">RERA-Licensed</span>
                  <span className="text-white/60 hidden lg:inline">•</span>
                  <span className="whitespace-nowrap hidden lg:inline">Investor Protection</span>
                </div>
              </div>


              {/* Primary CTA */}
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={openFormModal}
                  className="w-full sm:w-auto block bg-white hover:bg-white/95 text-black font-medium py-4 sm:py-4 px-6 sm:px-8 md:px-10 rounded transition-all duration-200 text-base sm:text-base tracking-wide text-center min-h-[44px] flex items-center justify-center"
                >
                  Request Private Access
                </button>
                
                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:+971501234567"
                    className="flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8534] text-white font-medium py-4 px-6 rounded transition-all duration-200 text-base sm:text-base min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+971 50 123 4567</span>
                  </a>
                  
                  <a
                    href="mailto:info@cityplazarealestate.com?subject=Investment Inquiry&body=Phone: +971 50 123 4567"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium py-4 px-6 rounded transition-all duration-200 text-base sm:text-base backdrop-blur-sm min-h-[44px]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email Us</span>
                  </a>
                </div>
                
                <p className="text-white text-xs sm:text-sm font-medium" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                  Senior advisor response • Fully confidential
                </p>
                
                <a href="#elite-form" className="inline-flex items-center justify-center gap-2 text-white hover:text-primary-300 text-sm sm:text-base font-semibold underline decoration-2 underline-offset-4 transition-all hover:decoration-primary-400 mt-3 sm:mt-4 px-4 py-2 rounded-lg hover:bg-white/10 active:bg-white/5 min-h-[44px]" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                  <span>See Selected Residences</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="animate-slide-up mt-8 lg:mt-0" id="quick-form">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-[#FF6A00]/20">
              {!showSuccess ? (
                <>
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <div className="space-y-2 sm:space-y-3 text-center">
                      <h2 className="text-2xl sm:text-3xl font-black text-navy-900 leading-tight tracking-tight">
                        Private Investment Review
                      </h2>
                      <p className="text-base sm:text-lg text-navy-700 leading-relaxed font-semibold">
                        A confidential review designed to assess:
                      </p>
                      <div className="text-sm sm:text-base text-navy-700 flex items-center justify-center flex-wrap gap-x-2 gap-y-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg border border-gray-200 mx-auto">
                        <span className="text-primary-600 font-bold">•</span>
                        <span className="font-semibold">Capital range</span>
                        <span className="text-primary-600 font-bold">•</span>
                        <span className="font-semibold">Residency objectives</span>
                        <span className="text-primary-600 font-bold">•</span>
                        <span className="font-semibold">Preferred jurisdiction</span>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <p className="text-sm sm:text-base text-navy-800 font-semibold">
                          Handled directly by a senior RERA-licensed advisor.
                        </p>
                        <p className="text-xs sm:text-sm text-navy-600 italic font-medium">
                          No obligation. No pressure.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border ${errors.name ? 'border-red-400' : 'border-gray-300 focus:border-[#FF6A00]'} rounded-lg bg-white focus:outline-none text-black font-medium text-base placeholder-gray-500 transition-all min-h-[44px]`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.name}</p>}
                      </div>

                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border ${errors.email ? 'border-red-400' : 'border-gray-300 focus:border-[#FF6A00]'} rounded-lg bg-white focus:outline-none text-black font-medium text-base placeholder-gray-500 transition-all min-h-[44px]`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.email}</p>}
                      </div>

                      <div>
                        <input
                          type="tel"
                          placeholder="WhatsApp Number (with country code)"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border ${errors.whatsapp ? 'border-red-400' : 'border-gray-300 focus:border-[#FF6A00]'} rounded-lg bg-white focus:outline-none text-black font-medium text-base placeholder-gray-500 transition-all min-h-[44px]`}
                        />
                        {errors.whatsapp && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.whatsapp}</p>}
                      </div>

                      <div>
                        <select
                          value={formData.investmentRange}
                          onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border ${errors.investmentRange ? 'border-red-400' : 'border-gray-300 focus:border-[#FF6A00]'} rounded-lg bg-white focus:outline-none text-black font-medium text-base placeholder-gray-500 transition-all min-h-[44px]`}
                        >
                          <option value="">Indicative Investment Range</option>
                          <option value="500k-1m">AED 500K - 1M</option>
                          <option value="1m-2m">AED 1M - 2M</option>
                          <option value="2m-5m">AED 2M - 5M</option>
                          <option value="5m+">AED 5M+</option>
                        </select>
                        {errors.investmentRange && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.investmentRange}</p>}
                      </div>

                      <div>
                        <select
                          value={formData.preferredProject}
                          onChange={(e) => setFormData({ ...formData, preferredProject: e.target.value })}
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border ${errors.preferredProject ? 'border-red-400' : 'border-gray-300 focus:border-[#FF6A00]'} rounded-lg bg-white focus:outline-none text-black font-medium text-base placeholder-gray-500 transition-all min-h-[44px]`}
                        >
                          <option value="">Jurisdiction Preference (Abu Dhabi • Dubai • Both)</option>
                          <option value="abu-dhabi">Abu Dhabi</option>
                          <option value="dubai">Dubai</option>
                          <option value="both">Both</option>
                        </select>
                        {errors.preferredProject && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.preferredProject}</p>}
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 pt-1">
                      <button
                        type="submit"
                        className="w-full bg-[#FF6A00] hover:bg-[#FF8534] text-white font-bold tracking-wide text-base sm:text-lg py-4 sm:py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-[#FF6A00]/30 hover:shadow-2xl hover:scale-105 min-h-[44px]"
                      >
                        <span>Request Private Review</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">
                          Private inquiry • Fully confidential
                        </p>
                      </div>
                    </div>
                  </form>

                  {/* Trust Badges */}
                  <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8 text-xs text-navy-700">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 w-full sm:w-auto justify-center">
                        <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="font-semibold text-navy-900">RERA Licensed</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 w-full sm:w-auto justify-center">
                        <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7m-6 4h4" />
                        </svg>
                        <span className="font-semibold text-navy-900">100% Confidential</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FF6A00]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl text-black font-bold tracking-wide mb-2 sm:mb-3">Request Confirmed</h3>
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed mb-4 sm:mb-6">
                    Your investment portfolio is being prepared by a senior advisor. You will receive a confidential investment breakdown within 24 hours.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Check your email for secure access details.
                  </p>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
