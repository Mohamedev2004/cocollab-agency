import React, { useState } from 'react';

interface Question {
  question: string;
  answer: React.ReactNode;
}

const questions: Question[] = [
  {
    question: 'What is Cocollab?',
    answer: (
      <p className="text-sm">
        Cocollab is an influencer marketing platform that connects brands with
        verified influencers to create authentic collaborations and impactful
        campaigns.
      </p>
    ),
  },
  {
    question: 'How does Cocollab work for brands?',
    answer: (
      <p className="text-sm">
        Brands can sign up, select a plan, and use our AI-powered matching
        system to connect with influencers that align perfectly with their goals
        and audience. You can create campaigns, track performance, and manage
        everything from one dashboard.
      </p>
    ),
  },
  {
    question: 'What are the differences between the Starter, Growth, and Pro Plans?',
    answer: (
      <div className="space-y-2 text-sm">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Starter Plan:</strong> Perfect for small brands running
            their first influencer campaigns with essential tools.
          </li>
          <li>
            <strong>Growth Plan:</strong> Designed for growing businesses that
            want advanced matching and campaign analytics.
          </li>
          <li>
            <strong>Pro Plan:</strong> Full-scale solution for agencies and
            enterprises with unlimited campaigns, custom integrations, and 24/7
            premium support.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Are the influencers verified?',
    answer: (
      <p className="text-sm">
        Yes! Every influencer on Cocollab goes through a strict vetting and
        onboarding process to ensure authentic engagement, quality content, and
        trustworthy collaborations for brands.
      </p>
    ),
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: (
      <p className="text-sm">
        Absolutely. You can cancel your subscription anytime in your account
        settings. Your plan will remain active until the end of the billing
        cycle with no extra fees.
      </p>
    ),
  },
];

const QuestionAnswer: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div data-aos='zoom-in' className="w-full mt-4 rounded-xl bg-white mx-auto p-4 md:p-8">
      <div className="text-center bg-white mt-6 mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black font-light font-title mb-4">
          Getting Started{' '}
          <span className="italic font-light">Your Essential Questions Answered</span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm md:text-base">
          Learn more about how Cocollab works for brands and influencers. If you
          have more questions, our support team is here 24/7 to help you.
        </p>
      </div>

      <div className="space-y-4 mb-6 max-w-7xl mx-auto">
        {questions.map((item, index) => (
          <div
            key={index}
            className="group rounded-lg overflow-hidden bg-[#F3F3F3] hover:bg-[#8f8eeb] transition-colors duration-300"
          >
            <button
              className="w-full flex justify-between font-title font-semibold items-center text-left px-4 py-4 text-base md:text-lg font-medium text-black group-hover:text-white"
              onClick={() => toggle(index)}
            >
              {item.question}
              <span className="text-xl group-hover:text-white">
                {openIndex === index ? '×' : '+'}
              </span>
            </button>

            <div
              className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? 'max-h-96 opacity-100 pb-4'
                  : 'max-h-0 opacity-0 pb-0'
              } text-gray-700 group-hover:text-white`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswer;
