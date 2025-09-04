"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-y-auto hide-scrollbar bg-transparent",
        className
      )}
    >
      {children}
    </div>
  );
};
