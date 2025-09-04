import React from "react";
import { OrbitingCirclesDemo } from "../ui/orbiting-circles-demo";
import { AnimatedListDemo } from "../ui/animated-list-demo";

const cards = [
  {
    title: "24/7 Expert Support",
    description:
      "At Cocollab, support isn’t just a feature — it’s a promise. Our dedicated team of experts is available 24 hours a day, 7 days a week...",
    content: <AnimatedListDemo className="h-[400px] md:h-[450px]" />,
  },
  {
    title: "Verified Influencers Only",
    description:
      "At Cocollab, we believe that authentic partnerships start with the right people...",
    content: <OrbitingCirclesDemo />,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 pt-14 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {card.content && <div className="mb-8">{card.content}</div>}
            <h3 className="text-3xl text-center mt-4 text-black font-semibold mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 max-w-2xl m-auto text-center text-sm mb-4 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
