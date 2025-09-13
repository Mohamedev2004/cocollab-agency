/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UserPen, Star, BadgeCheck, Bookmark } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

// Define types for the stats object
interface InfluencerStats {
  rating: string;
  followers: string;
  rate: string;
}

// Define props for the InfluencerCard component
interface InfluencerProps {
  name: string;
  description: string;
  image: string;
  stats: InfluencerStats;
}

// Define user type
interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

// Define page props type
interface PageProps {
  auth?: {
    user?: User | null;
  };
  [key: string]: any;
}

// Sample data for the influencers to be displayed.
const influencers: InfluencerProps[] = [
  {
    name: 'Natasha Romanoff',
    description:
      "I'm a Brand Designer who focuses on clarity and emotional connection. My goal is to create compelling visual stories that resonate with audiences and build strong brand identities.",
    image: '/assets/influencers/1.jpg',
    stats: {
      rating: '4.8',
      followers: '500K',
      rate: '$50/hr',
    },
  },
  {
    name: 'Tony Stark',
    description:
      "I'm a Tech Innovator who builds groundbreaking gadgets and software. My work focuses on pushing the boundaries of technology to solve complex problems and improve lives.",
    image: '/assets/influencers/2.jpg',
    stats: {
      rating: '5.0',
      followers: '1.2M',
      rate: '$500/hr',
    },
  },
  {
    name: 'Steve Rogers',
    description:
      "I'm a fitness coach dedicated to helping you achieve your full potential. Through personalized training and nutrition plans, I guide clients to become stronger, healthier versions of themselves.",
    image: '/assets/influencers/3.jpg',
    stats: {
      rating: '4.9',
      followers: '80K',
      rate: '$75/hr',
    },
  },
  {
    name: 'Wanda Maximoff',
    description:
      "I'm a lifestyle blogger inspiring people to find magic in everyday life. My content covers everything from mindful living to creative hobbies, all with a touch of whimsy.",
    image: '/assets/influencers/4.jpg',
    stats: {
      rating: '4.7',
      followers: '60K',
      rate: '$65/hr',
    },
  },
];

// Truncates a string to a specified length and adds an ellipsis.
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// The main component that renders a grid of InfluencerCards.
const App = () => {
  return (
    <div className="flex flex-col items-center bg-[var(--color-cocollab)] justify-center min-h-screen mt-4 rounded-2xl px-6 py-14 font-sans">
      <div className="container mx-auto flex flex-col items-center">
        
        {/* Heading */}
        <h1 className="text-4xl font-title font-light mb-4 text-center text-gray-200">
          Top Influencers
        </h1>

        {/* Intro text */}
        <p className="text-gray-200 text-center px-8 max-w-3xl mb-12 sm:text-lg font-light">
          Discover and connect with the most talented influencers across different
          industries. Browse their profiles, explore their stats, and find the
          perfect match for your brand.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10 px-4 sm:px-0 w-full">
          {influencers.map((influencer, index) => (
            <InfluencerCard key={index} {...influencer} />
          ))}
        </div>

        {/* See More button */}
        <Link
          href=""
          className="group mt-6 bg-white text-[var(--color-cocollab)] text-md px-6 py-2.5 
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

// InfluencerCard component displays a single influencer's details.
const InfluencerCard: React.FC<InfluencerProps> = ({
  name,
  description,
  image,
  stats,
}) => {
  const { auth } = usePage<PageProps>().props;
  const user = auth?.user;

  // Pick profile route depending on role
  const getProfileRoute = () => {
    if (!user) return route('influencer-profile'); // fallback guest
    if (user.role === 'admin') return route('admin.influencer-profile');
    if (user.role === 'influencer') return route('influencer.influencer-profile');
    if (user.role === 'brand') return route('brand.influencer-profile');
    return route('influencer-profile');
  };

  const TRUNCATE_LENGTH = 60;
  const truncatedDescription = truncateText(description, TRUNCATE_LENGTH);

  return (
    <div
      className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-sm w-full mx-auto
                 transform transition-transform duration-500 ease-in-out sm:hover:scale-103 hover:shadow-xl"
    >
      {/* Influencer image section */}
      <div  className="relative p-3">
        <img
          loading="lazy"
          src={image}
          alt={`Profile of ${name}`}
          className="w-full h-auto object-cover rounded-2xl"
        />

        {/* Favorite (Bookmark) Icon */}
        <button
          className="absolute cursor-pointer top-6 right-6 
                    bg-white backdrop-blur-md 
                    rounded-full p-2 shadow-md 
                    hover:opacity-85 transition"
        >
          <Bookmark size={24} className="text-black" />
        </button>
      </div>

      {/* Card content section */}
      <div  className="p-6">
        {/* Name and verified badge */}
        <div className="flex items-center space-x-2 mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <BadgeCheck
            size={28}
            className="text-white fill-[var(--color-cocollab)]"
          />
        </div>

        {/* Description with truncation */}
        <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">
          {truncatedDescription}
        </p>

        {/* Stats section */}
        <div className="flex justify-around items-center border-t border-b border-gray-200 py-4 mb-4">
          {/* Rating stat */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <span className="text-base font-semibold text-gray-800">
                {stats.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1">Stars</span>
          </div>

          {/* Followers stat */}
          <div className="flex flex-col items-center">
            <span className="text-base font-semibold text-gray-800">
              {stats.followers}
            </span>
            <span className="text-xs text-gray-500 mt-1">Followers</span>
          </div>

          {/* Rate stat */}
          <div className="flex flex-col items-center">
            <span className="text-base font-semibold text-gray-800">
              {stats.rate}
            </span>
            <span className="text-xs text-gray-500 mt-1">Rate</span>
          </div>
        </div>

        {/* "View Profile" button */}
        <Link href={getProfileRoute()}>
          <button
            className="flex items-center gap-4 w-full justify-center px-6 py-2.5 
                       bg-[var(--color-cocollab)] text-white font-semibold rounded-xl 
                       shadow-lg cursor-pointer transition duration-300 ease-in-out 
                       transform hover:opacity-90"
            style={{
              boxShadow:
                '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833',
            }}
          >
            <UserPen />
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default App;
