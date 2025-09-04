import React from 'react';

const About = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 rounded-xl shadow-md w-full mx-auto mt-4">
      
      {/* Flex Row: About + Text */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 mb-14">
        {/* Left: About Us Badge */}
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-purple-100 text-purple-700 shadow-sm">
            About Us
          </span>
        </div>

        {/* Right: Title & Paragraph */}
        <div className="max-w-6xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-title text-gray-900 leading-snug">
            Cocollab is more than a platform.
            We’re your influencer marketing partner.
            Built to connect, collaborate, and grow.
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-6 max-w-4xl mx-auto lg:mx-0">
            At Cocollab, we believe the future of marketing lies in genuine connections — not just impressions. That’s why we’ve built a next-generation influencer marketing agency and platform that brings together ambitious brands and authentic content creators to form collaborations that actually resonate.
            <br className="hidden sm:block" />
            <br className="hidden sm:block" />
            More than just a database of influencers, Cocollab is a strategic partner for brands looking to reach real audiences through trusted voices. Our platform simplifies every step of the process — from discovering the right creators to managing campaigns and tracking performance — all in one place. Whether you’re launching a new product, building long-term brand awareness, or growing your online presence, we help you create partnerships that deliver measurable results.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center mt-16">
        <div>
          <p className="text-3xl font-bold text-gray-900">1,200+</p>
          <p className="text-gray-500 text-sm mt-1">Brands Onboarded</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">5,800+</p>
          <p className="text-gray-500 text-sm mt-1">Influencer Collaborations</p>
        </div>
        <div>
          <p className="text-3xl text-nowrap font-bold text-gray-900">Under 48h</p>
          <p className="text-gray-500 text-sm mt-1">Avg. Match Time</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">98%</p>
          <p className="text-gray-500 text-sm mt-1">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
};

export default About;