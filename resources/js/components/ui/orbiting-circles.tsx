"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface OrbitingCirclesProps {
  children: ReactNode[];
  radius?: number;
  speed?: number;
  reverse?: boolean;
  iconSize?: number;
}

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  children,
  radius = 120,
  speed = 20,
  reverse = false,
  iconSize = 40,
}) => {
  return (
    <motion.div
      animate={{ rotate: reverse ? 360 : -360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: speed,
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {children.map((child, i) => {
        const angle = (i / children.length) * (2 * Math.PI);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: iconSize,
              height: iconSize,
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
