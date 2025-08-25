import React from 'react';

const HowItWorks = () => {
  return (
    <section data-aos='fade-up' className="bg-[var(--color-cocollab)] text-white mt-4 rounded-xl py-20 px-10 font-sans sm:text-center">
      <div className="mx-auto">
        <h2 className="text-2xl md:text-5xl font-title font-light leading-tight mb-5">
          How It Works: Start Collaborating in 3 Simple Steps
        </h2>
        <p className="text-md max-w-3xl mx-auto leading-relaxed opacity-90 mb-16">
          From first click to full campaign — Cocollab makes it effortless to find the right match, launch impactful collaborations, and track real results. Whether you're a brand or a creator, our smart, streamlined process brings your vision to life.
        </p>

        <div className="flex flex-col items-center md:flex-row justify-center gap-12 mb-16">
          {/* Step 1 Card */}
          <div className="group bg-white text-black rounded-lg p-8 md:p-10 flex-1 w-full text-left shadow-lg hover:scale-105 transition-all duration-300 ease-in-out hover:bg-[#8f8eeb]">
            <span className="inline-flex items-center justify-center text-5xl font-title font-bold mb-5 group-hover:text-white">
              1
            </span>
            <h3 className="text-2xl font-semibold font-title mb-4 group-hover:text-white">
              Create Your Profile
            </h3>
            <p className="text-base opacity-80 leading-relaxed group-hover:text-white">
              Whether you're a brand or an influencer, getting started is quick and easy.
              Sign up, tell us who you are, what you offer, and what you're looking for.
              Your profile helps us match you with the right opportunities and partners.
            </p>
          </div>

          {/* Step 2 Card */}
            <div className="group bg-white text-black rounded-lg p-8 md:p-10 flex-1 w-full text-left shadow-lg hover:scale-105 transition-all duration-300 ease-in-out hover:bg-[#8f8eeb]">
            <span className="inline-flex items-center justify-center text-5xl font-title font-bold mb-5 group-hover:text-white">
              2
            </span>
            <h3 className="text-2xl font-semibold font-title mb-4 group-hover:text-white">
              Find the Right Match
            </h3>
            <p className="text-base opacity-80 leading-relaxed group-hover:text-white">
              Browse a curated list of brands or influencers tailored to your needs.
              Use filters to narrow down by industry, audience, content type, and more.
              We prioritize compatibility, values, and relevance — not just numbers.
            </p>
            </div>

          {/* Step 3 Card */}
            <div className="group bg-white text-black rounded-lg p-8 md:p-10 flex-1 w-full text-left shadow-lg hover:scale-105 transition-all duration-300 ease-in-out hover:bg-[#8f8eeb]">
            <span className="inline-flex items-center justify-center text-5xl font-title font-bold mb-5 group-hover:text-white">
              3
            </span>
            <h3 className="text-2xl font-semibold font-title mb-4 group-hover:text-white">
              Connect & Collaborate
            </h3>
            <p className="text-base opacity-80 leading-relaxed group-hover:text-white">
              Send collaboration requests or respond to offers that interest you.
              Use our integrated tools to communicate, share briefs, and manage timelines.
              No middlemen, no confusion — just smooth, direct connections.
            </p>
            </div>
        </div>

        <p className="text-xl md:text-xl opacity-90 leading-relaxed font-medium mb-10">
          Built for trust, designed for growth — Cocollab is where real collaborations begin and lasting impact is made.
        </p>

        <button className="m-auto flex items-center justify-center px-6 py-2.5 bg-white text-[var(--color-cocollab)] font-semibold rounded-xl shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:opacity-90" style={{ boxShadow: '0 10px 15px -3px #c3c0c044, 0 4px 6px -4px #ffffff33' }}>
            Get Started Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;