import { MoveRight } from 'lucide-react';
import React from 'react';
import { FaCrown } from 'react-icons/fa';

interface Feature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  accessType?: string;
  description: string;
  price: string;
  period: string;
  features: Feature[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Starter Plan',
    accessType: 'Begin Collaborating',
    description: 'Ideal for small brands taking their first step into influencer marketing with essential features to get started.',
    price: '£25.00',
    period: '/ month',
    features: [
      { text: 'Access to 50+ verified influencers' },
      { text: '1 active campaign per month' },
      { text: 'Basic AI-powered matching' },
      { text: 'Performance tracking dashboard' },
      { text: 'Email support' },
    ],
  },
  {
    id: 'standard',
    name: 'Growth Plan',
    accessType: 'Scale Your Campaigns',
    description: 'Perfect for growing businesses ready to build multiple influencer partnerships and scale their reach.',
    price: '£45.00',
    period: '/ month',
    features: [
      { text: 'Access to 200+ verified influencers' },
      { text: '3 active campaigns per month' },
      { text: 'Advanced AI matching & analytics' },
      { text: 'Engagement & conversion reports' },
      { text: 'Priority email & chat support' },
      { text: 'Dedicated account assistant' },
    ],
  },
  {
    id: 'premium',
    name: 'Pro Plan',
    accessType: 'Full Campaign Management',
    description: 'For brands and agencies running large-scale influencer activations with premium tools and dedicated support.',
    price: '£85.00',
    period: '/ month',
    features: [
      { text: 'Unlimited access to verified influencers' },
      { text: 'Unlimited campaigns' },
      { text: 'Full AI-driven matching & forecasting' },
      { text: 'Custom performance analytics' },
      { text: 'Campaign manager support' },
      { text: '24/7 premium assistance' },
      { text: 'Custom contract & payment handling' },
      { text: 'API & CRM integration' },
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="bg-[var(--color-cocollab)] text-white mt-4 rounded-xl py-16 sm:px-14 px-4">
      <div className="mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-title mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg mb-12">
          Choose a plan designed to grow with your brand. No hidden fees, just straightforward access to authentic influencer collaborations.
        </p>

        <div data-aos='slide-up' data-aos-delay='400' className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch justify-center">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className='bg-white rounded-xl p-8 text-left shadow-lg text-gray-800 border border-gray-200 flex flex-col'
            >
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-[var(--color-cocollab)] p-3 rounded-md flex items-center justify-center mr-4">
                    <FaCrown className="text-white text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                    {plan.accessType && <p className="text-gray-600 text-sm">{plan.accessType}</p>}
                  </div>
                </div>

                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-xl font-normal text-gray-600">{plan.period}</span>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex">
                <button
                  className="bg-[var(--color-cocollab)] text-white px-6 py-3 md:text-lg text-nowrap cursor-pointer font-semibold rounded-lg hover:opacity-90 transition duration-300 w-full flex items-center justify-center mb-8"
                  style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}
                >
                  <span className="flex items-center sm:text-base text-sm gap-2">
                    Subscribe for {plan.price}{plan.period}
                    <MoveRight />
                  </span>
                </button>
              </div>

              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-4">FEATURES</h4>
              <ul className="text-left space-y-4 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full mr-3 bg-[var(--color-cocollab)] text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
