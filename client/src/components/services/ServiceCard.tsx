import React from 'react';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  service: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    features: string[];
    gradient: string;
    bgGradient: string;
    shadowColor: string;
    hoverGradient: string;
  };
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  isHovered,
  onHover,
  onLeave,
}) => {
  return (
    <div className="group relative overflow-hidden" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div className="morph-card p-8 h-full hover-lift-intense magnetic transition-all duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
        ></div>

        <div className="relative z-10">
          <div
            className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-300 ${service.shadowColor} shadow-lg`}
          >
            <service.icon className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-gray-900 gradient-text-advanced rubik-font">
            {service.title}
          </h3>

          <p className="text-gray-600 mb-6 text-center leading-relaxed text-base group-hover:text-gray-800">
            {service.description}
          </p>

          <ul className="space-y-3">
            {service.features.slice(0, 4).map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center text-gray-700 group-hover:text-gray-900 text-sm"
              >
                <div
                  className={`w-6 h-6 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-md`}
                >
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div
            className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${isHovered ? 'animate-bounce' : ''}`}
          >
            {index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
