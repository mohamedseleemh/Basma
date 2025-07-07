import React from 'react';
import { Crown, Gem } from 'lucide-react';

const ProfileSection = () => {
  return (
    <div className="mb-10 stagger-item">
      <div className="relative inline-block group">
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        <img
          src="/lovable-uploads/77f71326-ee20-493c-aaac-b3f4a93e8c17.png"
          alt="بسمة نبيل"
          className="relative w-48 h-48 rounded-full mx-auto shadow-xl ring-2 ring-white/40 object-cover hover:scale-105 transition-all duration-500"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
          }}
        />
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
          <Gem className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
