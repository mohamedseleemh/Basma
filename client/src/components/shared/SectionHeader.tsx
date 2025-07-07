import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: React.ComponentType<{ className?: string }>;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeIcon: BadgeIcon,
}) => {
  return (
    <div className="text-center mb-12">
      {badge && (
        <div className="inline-block mb-6 glass-effect px-8 py-4 magnetic rounded-2xl">
          <span className="gradient-text-advanced font-bold text-lg flex items-center gap-3">
            {BadgeIcon && <BadgeIcon className="w-5 h-5" />}
            {badge}
            {BadgeIcon && <BadgeIcon className="w-5 h-5" />}
          </span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dancing-script">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
