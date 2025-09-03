import React from 'react';

const Hero: React.FC = () => {
  return (
    // Added lg:gap-8 to create space between the two columns on large screens
    // Removed overflow-hidden from here, as individual sections will handle their own rounding
    <section className="w-full mx-auto flex flex-col lg:flex-row gap-4">
      {/* Left Section: Content - now explicitly white background and fully rounded */}
      <div  className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-center lg:text-left bg-white rounded-2xl shadow-sm">
        {/* Reviews Badge */}
        <div className="flex items-center justify-center lg:justify-start mb-6">
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            +1500 reviews
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-title sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-black">
          Where Brands & <br className="hidden sm:inline" /> Influencers <span className="text-[var(--color-cocollab)] font-semibold">Connect</span> with Purpose
        </h1>

        {/* Sub-headline/Description */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
          Cocollab makes influencer marketing simple, smart, and authentic.
          Find the right partner, build powerful campaigns, and grow together.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <button className="flex items-center justify-center px-6 py-2.5 bg-[var(--color-cocollab)] text-white font-semibold rounded-xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:opacity-90" style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}>
            Get Started Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
          <button className="border border-[var(--color-cocollab)] text-[var(--color-cocollab)] cursor-pointer text-md px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-[var(--color-cocollab)] hover:text-white" style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}>
            Explore Influencers
          </button>
        </div>
      </div>

      {/* Right Section: Image/Mockup - now fully rounded and with new content */}
      <div  className="lg:w-1/2 relative flex items-center justify-center rounded-2xl shadow-sm overflow-hidden min-h-[400px] lg:min-h-[500px]">
        {/* Background Image */}
        <img
          src="/assets/heroImage.svg" // Placeholder for the new image
          alt="Cocollab Agency Mockup"
          className="absolute inset-0 w-full bg-gradient-to-b from-[#403778] to-[#7666DE] h-full object-contain rounded-2xl"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/800x600/D1D5DB/1F2937?text=Image+Not+Found";
            e.currentTarget.alt = "Image not found placeholder";
          }}
        />

        {/* Overlay for components */}
        <div className="relative z-10 w-full h-full flex flex-col p-4 sm:p-8 lg:p-12">
          {/* Digital Transformation Component - Better spacing on mobile */}
          <div className="absolute top-[20%] sm:top-1/4 left-1/4 m-2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 text-nowrap rounded-lg shadow-lg flex items-center space-x-2">
            <span className="w-3 h-3 bg-[var(--color-cocollab)] rounded-full"></span>
            <span className="sm:text-sm text-xs font-semibold text-gray-800">Digital transformation</span>
          </div>

          {/* Real-time analytics Component - Centered vertically */}
          <div className="absolute top-1/2 right-1/4 m-2 mt-14 transform translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 text-nowrap rounded-lg shadow-lg flex items-center space-x-2">
            <span className="w-3 h-3 bg-[var(--color-cocollab)] rounded-full"></span>
            <span className="sm:text-sm text-xs font-semibold text-gray-800">Real-time analytics</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;