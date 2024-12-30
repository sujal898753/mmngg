import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export default function GameCard({ title, description, icon: Icon, onClick }: GameCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-4 text-indigo-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}