'use client';

import { Star } from "lucide-react";
import React from "react";
import { Link } from '@inertiajs/react';

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from '@/components/ui/avatar-group'; // Import AvatarGroup

interface InfluencerHeroProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
}

const InfluencerHero = ({
  heading = "We bring you closer to the brands, you create the content.",
  description = "Collaborate with ease. We connect you with brands, so you can unleash your creativity!",
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}: InfluencerHeroProps) => {
  return (
    // Outer flex container for centering the entire component
    <div className="flex bg-white p-6 rounded-2xl items-center justify-center">
      <section>
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div  className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
            <h1 className="text-4xl font-title sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-black">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
              <AvatarGroup variant="motion">
                {reviews.avatars.map((avatar, index) => (
                  <Avatar key={index} className="size-12 border">
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                  </Avatar>
                ))}
              </AvatarGroup>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="size-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                  <span className="mr-1 text-gray-500 font-semibold">
                    {reviews.rating?.toFixed(1)}
                  </span>
                </div>
                <p className="text-muted-foreground text-left font-medium">
                  from {reviews.count}+ reviews
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Link href={route('login')}>
                <button className="flex items-center justify-center m-auto px-6 py-2.5 bg-[var(--color-cocollab)] text-white font-semibold rounded-xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:opacity-90" style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}>
                  Get Started Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          <div className="flex" >
            <img
              loading="lazy"
              src="/assets/InfluencerHero.jpg"
              alt="placeholder hero"
              className="max-h-[600px] w-full rounded-lg object-cover lg:max-h-[800px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfluencerHero;