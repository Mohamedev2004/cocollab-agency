import React from 'react';
import { Mail, Briefcase, MapPin, Calendar } from 'lucide-react';

const BrandBio: React.FC = () => {
  // Dummy data
  const brandData = {
    name: "Coca-Cola",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    industry: "Beverages",
    location: "Atlanta, USA",
    globalReach: "Worldwide",
    foundingYear: 1886,
    email: "contact@coca-cola.com",
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full mx-auto lg:mx-0">
      {/* About Badge */}
      <div className="flex items-center justify-start mb-6">
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
          About {brandData.name}
        </span>
      </div>

      {/* Description / Storytelling */}
      <p className="text-sm text-gray-700 font-light leading-relaxed mb-6">
        {brandData.description}
      </p>

      {/* Brand Details in 2x3 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
        {brandData.email && (
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-gray-500" />
            <span className="text-sm">{brandData.email}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-gray-500" />
          <span className="text-sm">{brandData.industry}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-gray-500" />
          <span className="text-sm">
            {brandData.location} {brandData.globalReach ? `• Serves: ${brandData.globalReach}` : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <span className="text-sm">Founded in {brandData.foundingYear}</span>
        </div>
      </div>
    </div>
  );
};

export default BrandBio;
