import React from "react";
import { UserPen, Star, BadgeCheck, Bookmark } from "lucide-react";
import { Link } from "@inertiajs/react";

interface BrandStats {
  rating: string;
  campaigns: string;
  budget: string;
}

interface BrandProps {
  name: string;
  description: string;
  logo: string;
  stats: BrandStats;
}

const brands: BrandProps[] = [
  {
    name: "Coca-Cola",
    description:
      "A global leader in beverages, Coca-Cola partners with influencers to create campaigns that inspire joy and connection worldwide.",
    logo: "/assets/brands/1.jpg",
    stats: {
      rating: "4.9",
      campaigns: "300+",
      budget: "$1M+",
    },
  },
  {
    name: "Nike",
    description:
      "Nike collaborates with top creators to push the boundaries of sports, lifestyle, and culture through impactful campaigns.",
    logo: "/assets/brands/2.jpg",
    stats: {
      rating: "5.0",
      campaigns: "500+",
      budget: "$5M+",
    },
  },
  {
    name: "Spotify",
    description:
      "Spotify empowers musicians and brands to connect with millions of listeners through creative and engaging collaborations.",
    logo: "/assets/brands/3.jpg",
    stats: {
      rating: "4.8",
      campaigns: "200+",
      budget: "$800K+",
    },
  },
  {
    name: "Adidas",
    description:
      "Adidas works with influencers to drive innovation in fashion, performance, and lifestyle campaigns worldwide.",
    logo: "/assets/brands/4.jpg",
    stats: {
      rating: "4.7",
      campaigns: "350+",
      budget: "$2M+",
    },
  },
];

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const Card: React.FC<BrandProps> = ({ name, description, logo, stats }) => {
  const TRUNCATE_LENGTH = 60;
  const truncatedDescription = truncateText(description, TRUNCATE_LENGTH);

  return (
    <div
      className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-sm w-full mx-auto
                 transform transition-transform duration-500 ease-in-out sm:hover:scale-103 hover:shadow-xl"
    >
      {/* Brand Logo */}
      <div className="relative p-3">
        <img
          src={logo}
          alt={`Logo of ${name}`}
          className="w-full h-auto object-cover rounded-2xl"
        />
        {/* Bookmark */}
        <button
          className="absolute top-6 right-6 bg-white backdrop-blur-md rounded-full p-2 shadow-md 
                     hover:opacity-85 transition cursor-pointer"
        >
          <Bookmark size={24} className="text-black" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Brand Name + Verified Badge */}
        <div className="flex items-center space-x-2 mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <BadgeCheck
            size={24}
            className="text-white fill-[var(--color-cocollab)]"
          />
        </div>

        {/* Brand Description */}
        <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
          {truncatedDescription}
        </p>

        {/* Stats */}
        <div className="flex justify-around items-center border-t border-b border-gray-200 py-4 mb-4">
          {/* Rating */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <span className="text-base font-semibold text-gray-800">
                {stats.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1">Rating</span>
          </div>

          {/* Campaigns */}
          <div className="flex flex-col items-center">
            <span className="text-base font-semibold text-gray-800">
              {stats.campaigns}
            </span>
            <span className="text-xs text-gray-500 mt-1">Campaigns</span>
          </div>

          {/* Budget */}
          <div className="flex flex-col items-center">
            <span className="text-base font-semibold text-gray-800">
              {stats.budget}
            </span>
            <span className="text-xs text-gray-500 mt-1">Budget</span>
          </div>
        </div>

        {/* CTA */}
        <button
          className="flex items-center gap-2 w-full justify-center px-6 py-2.5 
                     bg-[var(--color-cocollab)] text-white font-semibold rounded-xl 
                     shadow-lg cursor-pointer transition duration-300 ease-in-out 
                     hover:opacity-90"
        >
          <UserPen />
          View Brand
        </button>
      </div>
    </div>
  );
};

const BrandCard = () => {
  return (
    <div className="flex flex-col items-center bg-[var(--color-cocollab)] min-h-screen mt-4 rounded-2xl px-6 py-14 font-sans">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-light font-title mb-4 text-center text-gray-200">
          Featured Brands
        </h1>
        <p className="text-gray-200 text-center px-8 max-w-3xl mb-12 sm:text-lg font-light">
          Explore the most influential brands collaborating with creators to
          drive meaningful campaigns and connections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full px-4 sm:px-0">
          {brands.map((brand, idx) => (
            <Card key={idx} {...brand} />
          ))}
        </div>

        <Link
          href="#"
          className="group mt-18 bg-white text-[var(--color-cocollab)] text-md px-6 py-2.5 
                     flex items-center gap-2 rounded-xl font-semibold 
                     transition-all duration-300 hover:opacity-90 hover:shadow-lg max-w-max"
          style={{
            boxShadow: "0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833",
          }}
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default BrandCard;
