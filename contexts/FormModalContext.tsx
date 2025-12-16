'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormModalContextType {
  openFormModal: () => void;
  closeFormModal: () => void;
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showFormSuccess, setShowFormSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const openFormModal = () => {
    setShowBookingModal(true);
    setShowFormSuccess(false);
    document.body.style.overflow = 'hidden';
  };

  const closeFormModal = () => {
    setShowBookingModal(false);
    setShowFormSuccess(false);
    document.body.style.overflow = 'unset';
  };

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

  // Listen for form submission events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const isFromForm = event.origin.includes('leadconnectorhq.com') || 
                        event.origin.includes('msgsndr.com') ||
                        event.data?.formId === '7RM5Dr1meRUfG03B13ci';

      if (!isFromForm && showBookingModal) return;

      if (event.data) {
        if (typeof event.data === 'string') {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'hsFormCallback' || 
                data.event === 'form-submitted' || 
                data.action === 'submit' ||
                data.type === 'formSubmitted' ||
                data.status === 'success') {
              handleFormSuccess();
            }
          } catch (e) {
            const messageStr = event.data.toLowerCase();
            if (messageStr.includes('form-submitted') || 
                messageStr.includes('formsubmitted') ||
                (messageStr.includes('success') && messageStr.includes('form'))) {
              handleFormSuccess();
            }
          }
        } else if (typeof event.data === 'object') {
          if (event.data.type === 'formSubmitted' || 
              event.data.event === 'form-submitted' ||
              event.data.status === 'success') {
            handleFormSuccess();
          }
        }
      }
    };

    const handleFormSuccess = () => {
      if (!showFormSuccess) {
        // Load Google Tag for conversion tracking
        loadGoogleTag();
        setShowFormSuccess(true);
        setTimeout(() => {
          setShowFormSuccess(false);
          setFormKey(prev => prev + 1);
        }, 3000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [showBookingModal, showFormSuccess]);

  return (
    <FormModalContext.Provider value={{ openFormModal, closeFormModal }}>
      {children}
      
      {/* Form Modal */}
      {showBookingModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFormModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeFormModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-sm"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-4 sm:px-8 sm:py-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Request Private Access
              </h2>
              <p className="text-white/90 text-center mt-2 text-sm sm:text-base">
                Fill out the form below to get started
              </p>
            </div>

            {/* Iframe Container */}
            <div className="relative w-full bg-white overflow-hidden" style={{ height: '600px', maxHeight: 'calc(90vh - 140px)' }}>
              {/* Overlay to hide form's close button */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-white z-10 pointer-events-none" />
              
              {/* Success Message - Compact & Elegant */}
              {showFormSuccess && (
                <motion.div
                  className="absolute inset-0 z-50 flex items-center justify-center bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-center px-6 py-8 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {/* Success Icon */}
                    <motion.div
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <motion.svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>

                    {/* Success Message */}
                    <motion.p
                      className="text-lg text-gray-700 font-medium leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      Thank you for taking the time to complete this form.
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
              
              <style dangerouslySetInnerHTML={{ __html: `
                #popup-7RM5Dr1meRUfG03B13ci {
                  pointer-events: ${showFormSuccess ? 'none' : 'auto'} !important;
                }
              ` }} />
              <iframe
                key={formKey}
                src="https://api.leadconnectorhq.com/widget/form/7RM5Dr1meRUfG03B13ci"
                style={{
                  display: showFormSuccess ? 'none' : 'block',
                  width: '100%',
                  height: '100%',
                  minHeight: '600px',
                  border: 'none',
                  borderRadius: '0 0 16px 16px',
                  pointerEvents: showFormSuccess ? 'none' : 'auto'
                }}
                id="popup-7RM5Dr1meRUfG03B13ci"
                data-layout="{'id':'POPUP'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Form 1"
                data-height="600"
                data-layout-iframe-id="popup-7RM5Dr1meRUfG03B13ci"
                data-form-id="7RM5Dr1meRUfG03B13ci"
                title="Form 1"
                scrolling="auto"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const context = useContext(FormModalContext);
  if (context === undefined) {
    throw new Error('useFormModal must be used within a FormModalProvider');
  }
  return context;
}


