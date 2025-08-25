import React from "react";

const cards = [
    {
      title: "24/7 Expert Support",
      description:
        "At Cocollab, support isn’t just a feature — it’s a promise. Our dedicated team of experts is available 24 hours a day, 7 days a week to help you every step of the way. You’ll always have real humans ready to guide you. No automated bots, no long waits — just instant, reliable assistance whenever you need it. With Cocollab, you’re never alone in building authentic influencer partnerships, no matter the time zone or deadline.",
      image: "assets/Support.svg", // Placeholder image
    },
    {
        title: "Verified Influencers Only",
        description:
        "At Cocollab, we believe that authentic partnerships start with the right people. That’s why every influencer on our platform goes through a strict vetting process to ensure genuine engagement, quality content, and a strong alignment with brand values. Our team carefully reviews each profile, analyzes audience insights, and verifies past collaborations to guarantee credibility. Once approved, influencers are professionally onboarded to maintain consistency, transparency, and trust throughout every campaign.",
        image: "assets/Influencers.svg", // Placeholder image
    },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="mt-4">
      {/* 2 cards per line */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 pt-14 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Added image here */}
            {card.image && (
              <div className="mb-8">
                <img
                  src={card.image}
                  alt={card.title}
                  data-aos='zoom-in'
                  className="lg:w-[60%] w-[80%] h-auto m-auto object-cover" // Adjust size and styling as needed
                />
              </div>
            )}
            <h3 data-aos='fade-up' className="text-3xl text-center mt-4 text-black font-semibold mb-2">
              {card.title}
            </h3>
            <p data-aos='fade-up' className="text-gray-600 max-w-2xl m-auto text-center text-sm mb-4 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;