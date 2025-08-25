"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Set up your influencer profile",
    description: "Complete your profile to start earning points and tracking your growth.",
    image: "/images/step1.png",
  },
  {
    id: 2,
    title: "Engage and grow your audience",
    description: "Post content, interact with followers, and unlock new opportunities to increase your influence score.",
    image: "/images/step2.png",
  },
  {
    id: 3,
    title: "Earn points & hit exclusive collabs",
    description: "Accumulate points through engagement and gain access to premium collaborations with top brands.",
    image: "/images/step3.png",
  },
  {
    id: 4,
    title: "Showcase your achievements",
    description: "Highlight your collaborations, points, and milestones to attract more brands and grow your influence.",
    image: "/images/step4.png",
  },
];

export default function InfluencerStep() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const current = steps.find((s) => s.id === activeStep)!;

  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const cocollabColor = "#403778";
  const lightCocollab = "#E0DFF5";

  return (
    <div className="w-full bg-white mt-4 rounded-2xl">
      <div className="w-full mx-auto sm:px-20 px-4 py-16 font-sans">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-title font-light text-gray-900 mb-2 tracking-tight">
            Your influencer journey starts here
          </h2>
          <p className="text-lg m-auto text-gray-600 max-w-xl">
            Earn points, unlock exclusive collabs, and level up your influence.
          </p>
        </div>

        {/* Desktop layout (responsive) */}
        <div className="hidden md:flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`relative flex flex-col p-6 rounded-xl transition-colors duration-300 cursor-pointer ${
                  activeStep === step.id ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-base transition-colors duration-300 mb-2 ${
                    activeStep === step.id
                      ? "text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  style={{
                    backgroundColor: activeStep === step.id ? cocollabColor : undefined,
                  }}
                >
                  {step.id}
                </div>
                <h3 className={`font-bold text-lg mb-1 ${activeStep === step.id ? "text-gray-900" : "text-gray-800"}`}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">{step.description}</p>
                {activeStep === step.id && (
                  <div
                    className="absolute inset-0 border-2 rounded-xl pointer-events-none"
                    style={{ borderColor: cocollabColor }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Desktop image with transition */}
          <div
            className="relative w-full h-96 overflow-hidden rounded-xl flex items-center justify-center"
            style={{ backgroundColor: lightCocollab }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src="/images/step_placeholder.svg"
                alt={current.title}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="max-h-full object-contain"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col gap-8 md:hidden">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg mb-4"
                style={{ backgroundColor: cocollabColor }}
              >
                {step.id}
              </div>
              <h3
                className="font-bold text-xl mb-2"
                style={{ color: cocollabColor }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6">{step.description}</p>
              <div
                className="w-full rounded-lg shadow-inner p-4"
                style={{ backgroundColor: lightCocollab }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="max-h-60 object-contain w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}