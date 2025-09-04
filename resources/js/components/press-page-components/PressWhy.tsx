"use client";

import { Users, PenTool, ShieldCheck, BarChart } from "lucide-react";

const PressWhy = () => {
  const services = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Access to a Qualified Media Network",
      description:
        "Leverage our connections with journalists, editors, specialized bloggers, and highly credible influencers to amplify your visibility.",
      items: [
        "Journalists & Editors",
        "Specialized Bloggers",
        "Trusted Influencers",
      ],
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Tailored Strategies",
      description:
        "We design custom strategies that adapt to your brand’s needs, from press releases to interviews and sponsored articles in influential media.",
      items: [
        "Press Releases",
        "Interviews & Features",
        "Sponsored Articles & Product Placements",
      ],
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Authenticity & Credibility",
      description:
        "Benefit from the power of media recommendations to build trust and reinforce your brand’s authority in the market.",
      items: [
        "Credible Media Endorsements",
        "Brand Reputation Strengthening",
        "Long-term Trust Building",
      ],
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Measurable Tracking",
      description:
        "Track results with precise analytics to measure the real impact of your press relations efforts.",
      items: [
        "Media Coverage Reports",
        "Traffic & Engagement Analysis",
        "Impact Assessment",
      ],
    },
  ];

  return (
    <section className="sm:py-22 py-10 bg-[var(--color-cocollab)] mt-4 rounded-2xl p-4">
      <div className="container mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-light text-gray-200 font-title tracking-tight md:text-4xl">
              Why choose our Press Relations service?
            </h2>
            <p className="text-gray-200 mx-auto max-w-2xl text-lg tracking-tight md:text-xl">
              We connect your brand with trusted voices, build credibility
              through authentic media coverage, and provide measurable impact to
              support your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-border space-y-6 rounded-lg border bg-white p-8 
                transition-transform duration-500 ease-in-out hover:scale-103 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--color-cocollab)] rounded-full p-3 text-white">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="bg-black h-1.5 w-1.5 rounded-full" />
                      <span className="text-sm font-medium text-black">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressWhy;
