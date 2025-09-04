"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "./animated-list";
import { BellRing } from "lucide-react";

interface Item {
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  time: string;
}

// Brand-relevant notifications
let notifications: Item[] = [
  {
    name: "New Influencer Match",
    description: "An influencer matches your campaign requirements",
    time: "2m ago",
    icon: BellRing,
    color: "#403778",
  },
  {
    name: "Campaign Approved",
    description: "Your latest campaign has been approved by the admin",
    time: "10m ago",
    icon: BellRing,
    color: "#403778",
  },
  {
    name: "New Message",
    description: "You received a message from an influencer",
    time: "15m ago",
    icon: BellRing,
    color: "#403778",
  },
  {
    name: "Payment Received",
    description: "Your subscription payment has been processed",
    time: "30m ago",
    icon: BellRing,
    color: "#403778",
  },
];

// Duplicate to have enough items
notifications = Array.from({ length: 5 }, () => notifications).flat();

// Single notification card
const Notification: React.FC<Item> = ({ name, description, icon: Icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] bg-transparent",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex w-10 h-10 items-center justify-center rounded-md shrink-0"
          style={{ backgroundColor: color }}
        >
          <span className="w-6 h-6 text-white"><Icon /></span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60 truncate">{description}</p>
        </div>
      </div>
    </figure>
  );
};

// Animated List Demo component
export const AnimatedListDemo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative flex h-[400px] md:h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      {/* Fade effect at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
};
