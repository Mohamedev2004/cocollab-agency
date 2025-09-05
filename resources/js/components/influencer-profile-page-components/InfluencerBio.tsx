import React from 'react';
import { Mail, Briefcase, MapPin } from 'lucide-react';

const InfluencerBio = () => {
  // Dummy data for the description
  const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full mx-auto lg:mx-0">
      {/* About Badge */}
        <div className="flex items-center justify-start mb-6">
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
            About Me
          </span>
        </div>
      <p className="text-sm text-gray-600 font-light leading-relaxed">{description}</p>
      
      <div className="flex flex-col space-y-3 mt-6 text-gray-600">
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-gray-500" />
          <span className="text-sm">steve.rogers@example.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-gray-500" />
          <span className="text-sm">Fitness Coach</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-gray-500" />
          <span className="text-sm">New York, USA</span>
        </div>
      </div>
    </div>
  );
};

export default InfluencerBio;
