import React from 'react';

const Footer = ({ translations }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg neon-border relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center gap-4 md:gap-8 text-center">
          {/* Opening Hours */}
          <div className="flex-shrink-0">
            <div className="flex justify-center mb-1 md:mb-2">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-gray-100">
              {translations.hours}
            </p>
          </div>

          {/* Address */}
          <div className="flex-shrink-0">
            <div className="flex justify-center mb-1 md:mb-2">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-gray-100">
              {translations.addressText}
            </p>
          </div>

          {/* Contact */}
          <div className="flex-shrink-0">
            <div className="flex justify-center mb-1 md:mb-2">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-gray-100">
              <a 
                href="tel:+375297984502" 
                className="hover:text-orange transition-colors duration-300 text-gray-100"
              >
                {translations.phone}
              </a>
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-orange text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-50 md:bottom-6 md:right-6"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-3 md:mt-4 pt-2 md:pt-3 text-center">
          <p className="text-xs text-gray-400">
            {translations.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
