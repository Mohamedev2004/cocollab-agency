import React from 'react';

const About = () => {
  return (
    <section  className="bg-white py-16 px-6 sm:px-12 rounded-xl shadow-md w-full mx-auto mt-4">
      
      {/* Flex Row: About + Text */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-14">
        {/* Left: About Us Badge */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
          About Us
        </span>

        {/* Right: Title & Paragraph */}
        <div className="max-w-6xl mb-10">
          <h2 className="text-2xl sm:text-5xl font-title font-light text-black leading-snug">
                Cocollab is more than a platform.
                We’re your influencer marketing partner.
                Built to connect, collaborate, and grow.
          </h2>
          <p className="text-gray-500 text-md mt-4">
                At Cocollab, we believe the future of marketing lies in genuine connections — not just impressions. That’s why we’ve built a next-generation influencer marketing agency and platform that brings together ambitious brands and authentic content creators to form collaborations that actually resonate.

                More than just a database of influencers, Cocollab is a strategic partner for brands looking to reach real audiences through trusted voices. Our platform simplifies every step of the process — from discovering the right creators to managing campaigns and tracking performance — all in one place. Whether you’re launching a new product, building long-term brand awareness, or growing your online presence, we help you create partnerships that deliver measurable results.      
            </p>        
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mt-20">
        <div>
          <p className="sm:text-4xl text-xl font-bold text-gray-900">1,200+</p>
          <p className="text-gray-500 text-sm">Brands Onboarded</p>
        </div>
        <div>
          <p className="sm:text-4xl text-xl font-bold text-gray-900">5,800+</p>
          <p className="text-gray-500 text-sm">Influencer Collaborations</p>
        </div>
        <div>
          <p className="sm:text-4xl text-xl font-bold text-gray-900">Under 48h</p>
          <p className="text-gray-500 text-sm">Avg. Match Time</p>
        </div>
        <div>
          <p className="sm:text-4xl text-xl font-bold text-gray-900">98%</p>
          <p className="text-gray-500 text-sm">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
};

export default About;
