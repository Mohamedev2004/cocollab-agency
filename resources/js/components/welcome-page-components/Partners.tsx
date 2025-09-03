import React from 'react';

const Partners: React.FC = () => {
  // Sample logos - you can replace these with actual brand logos
  const logos = [
    { name: 'Netflix', url: 'assets/partners/partner1.svg' },
    { name: 'Spotify', url: 'assets/partners/partner2.svg' },
    { name: 'Adobe', url: 'assets/partners/partner3.svg' },
    { name: 'Google', url: 'assets/partners/partner1.svg' },
    { name: 'Microsoft', url: 'assets/partners/partner2.svg' },
    { name: 'Apple', url: 'assets/partners/partner3.svg' },
    { name: 'Amazon', url: 'assets/partners/partner1.svg' },
    { name: 'Meta', url: 'assets/partners/partner2.svg' },
  ];

  return (
    <section  className="w-full py-12 bg-white mt-4 rounded-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {/* <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-4">
            Trusted by <span className="text-[var(--color-cocollab)] font-semibold">Leading Brands</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful brands and influencers who trust Cocollab for their marketing campaigns
          </p>
        </div> */}

        {/* Logos Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Scrolling logos */}
          <div className="flex animate-scroll">
            {/* First set of logos */}
            <div className="flex items-center justify-center min-w-max">
              {logos.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center justify-center mx-6 sm:mx-8 lg:mx-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={logo.url}
                    alt={`${logo.name} logo`}
                    className="h-8 sm:h-10 lg:h-12 w-auto object-contain filter brightness-0"
                    onError={(e) => {
                      // Fallback to a simple text logo if image fails
                      const target = e.currentTarget;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-gray-400 font-semibold text-lg px-4 py-2 border border-gray-200 rounded-lg">${logo.name}</div>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center justify-center min-w-max">
              {logos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="flex items-center justify-center mx-6 sm:mx-8 lg:mx-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={logo.url}
                    alt={`${logo.name} logo`}
                    className="h-8 sm:h-10 lg:h-16 w-auto object-cover filter brightness-0"
                    onError={(e) => {
                      // Fallback to a simple text logo if image fails
                      const target = e.currentTarget;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-gray-400 font-semibold text-lg px-4 py-2 border border-gray-200 rounded-lg">${logo.name}</div>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Partners;