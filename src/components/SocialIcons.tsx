import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaDev, FaEnvelope } from 'react-icons/fa';

interface SocialIconsProps {
  size?: number;
  className?: string;
}

export default function SocialIcons({ size = 24, className = '' }: SocialIconsProps) {
  const { social } = require('@/config/site');
  
  const iconMap: Record<string, React.ReactNode> = {
    github: <FaGithub size={size} />,
    linkedin: <FaLinkedin size={size} />,
    twitter: <FaTwitter size={size} />,
    devto: <FaDev size={size} />,
    email: <FaEnvelope size={size} />
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      {Object.entries(social).map(([platform, url]) => (
        <a
          key={platform}
          href={url as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          aria-label={platform}
        >
          {iconMap[platform] || iconMap.email}
        </a>
      ))}
    </div>
  );
}
