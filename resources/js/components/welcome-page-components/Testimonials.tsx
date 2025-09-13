import React from 'react';

// Define the structure for a testimonial
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  avatar?: string; // Optional avatar image URL
}

const Testimonials: React.FC = () => {
  // Sample testimonials data
  // You can replace these with actual testimonials from your users
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Cocollab transformed our influencer outreach! The platform is intuitive, and we saw a significant increase in engagement and ROI almost immediately.",
      author: "Sarah J.",
      title: "Marketing Director at Innovate Corp",
      avatar: "assets/avatars/avatar1.jpg", // Replace with actual avatar paths
    },
    {
      id: 2,
      quote: "Finding the right influencers used to be a headache. With Cocollab, it's effortless. The matching system is incredibly accurate, saving us so much time.",
      author: "Michael P.",
      title: "Brand Manager at Creative Sparks",
      avatar: "assets/avatars/avatar2.jpg",
    },
    {
      id: 3,
      quote: "As an influencer, Cocollab has opened up so many opportunities for collaborations with amazing brands. The process is smooth and transparent.",
      author: "Emily R.",
      title: "Fashion Influencer",
      avatar: "assets/avatars/avatar3.jpg",
    },
    {
      id: 4,
      quote: "The analytics and reporting features are top-notch. We can clearly see the impact of our campaigns, which helps us refine our strategy constantly.",
      author: "David L.",
      title: "CEO of Growth Ventures",
      avatar: "assets/avatars/avatar4.jpg",
    },
    {
      id: 5,
      quote: "Customer support is incredibly responsive and helpful. Any questions we had were answered quickly, making our experience even better.",
      author: "Jessica T.",
      title: "Social Media Strategist",
      avatar: "assets/avatars/avatar1.jpg",
    },
    {
      id: 6,
      quote: "A truly revolutionary platform for brand-influencer partnerships. Highly recommended for anyone serious about digital marketing.",
      author: "Chris W.",
      title: "Founder of Digital Edge",
      avatar: "assets/avatars/avatar2.jpg",
    },
  ];

  return (
    <section  className="w-full py-12 md:py-16 bg-white text-black rounded-xl shadow-lg mt-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-title text-black mb-4">
            Hear From Our <span className="text-[var(--color-cocollab)]">Satisfied Users</span>
          </h2>
          <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto">
            See what brands and influencers are saying about their experience with Cocollab.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative overflow-hidden py-4">
          {/* Gradient overlays for smooth fade effect at edges */}
          <div className="absolute left-0 top-0 sm:w-20 hidden h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 sm:w-20 hidden h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Testimonials */}
          <div className="flex animate-testimonial-scroll">
            {/* Duplicate the testimonials array to create a seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`} // Unique key for duplicates
                className="flex-shrink-0 w-[calc(100%-40px)] sm:w-[calc(50%-40px)] lg:w-[calc(33.333%-40px)] p-6 bg-[var(--color-cocollab)] backdrop-blur-sm rounded-lg shadow-xl mx-5 border border-purple-600 flex flex-col justify-between"
              >
                <p className="text-base sm:text-lg mb-4 italic mb-12 leading-relaxed text-purple-100">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center mt-auto pt-4 border-t border-purple-600/50">
                  {testimonial.avatar && (
                    <img
                      loading="lazy"
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-purple-400"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null; // Prevent infinite loop on error
                        target.src = "https://via.placeholder.com/48?text=User"; // Fallback placeholder
                      }}
                    />
                  )}
                  <div>
                    <p className="font-semibold text-white text-md sm:text-lg">{testimonial.author}</p>
                    <p className="text-sm text-purple-300">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind CSS @keyframes for the animation */}
      <style>{`
        @keyframes testimonial-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Scrolls half the total width of duplicated content */
          }
        }
        
        .animate-testimonial-scroll {
          animation: testimonial-scroll 30s linear infinite; /* Adjust duration for speed */
        }
      `}</style>
    </section>
  );
};

export default Testimonials;