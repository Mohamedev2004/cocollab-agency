import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from '@/components/ui/avatar-group'; // Import AvatarGroup
import { Star } from "lucide-react";

interface BrandHeroProps {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
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

const BrandHero = ({
  heading = "Grow Your Brand",
  subheading = " with the Right Influencers",
  description = "Connect with top creators, launch effective campaigns, and track your ROI effortlessly with Cocollab. Collaborate seamlessly and amplify your brand’s reach.",
  buttons = {
    primary: {
      text: "Find Influencers",
      url: "/brands/search",
    },
  },
  image = {
    src: "/assets/brandHero.jpg",
    alt: "Cocollab Brands",
  },
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
}: BrandHeroProps) => {
  return (
    <section className="bg-white rounded-2xl py-12">
      <div className="flex flex-col items-center gap-10 lg:my-0 lg:flex-row justify-center container mx-auto">
        <div className="flex flex-col gap-7 lg:w-2/3 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-title font-semibold text-black leading-tight">
            <span className="block text-[var(--color-cocollab)] font-light">
              {heading}
            </span>
            <span className="block text-black font-light">
              {subheading}
            </span>
          </h2>
          <div className="mb-2 flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-4 text-center sm:text-left">
            <AvatarGroup variant="motion">
                {reviews.avatars.map((avatar, index) => (
                <Avatar key={index} className="size-12 border">
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
                ))}
            </AvatarGroup>
            <div>
                <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, index) => (
                    <Star
                    key={index}
                    className="size-5 fill-yellow-500 text-yellow-500"
                    />
                ))}
                <span className="ml-1 text-gray-500 font-semibold">
                    {reviews.rating?.toFixed(1)}
                </span>
                </div>
                <p className="text-muted-foreground font-medium">
                from {reviews.count}+ reviews
                </p>
            </div>
          </div>

          <p className="text-black/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <Link href={route('login')}>
            <button className="flex items-center justify-center m-auto px-6 py-2.5 bg-[var(--color-cocollab)] text-white font-semibold rounded-xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:opacity-90" style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}>
                Get Started Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </Link>
            {buttons.secondary && (
              <Button asChild variant="outline">
                <a href={buttons.secondary.url}>
                  {buttons.secondary.text}
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="relative z-10">
          <div className="absolute top-2.5 left-1/2! h-[92%]! w-[69%]! -translate-x-[52%] overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="size-full object-cover object-[50%_0%]"
            />
          </div>
          <img
            className="relative z-10"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-2.png"
            width={450}
            height={889}
            alt="iphone"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandHero;
