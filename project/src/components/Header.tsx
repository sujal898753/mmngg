import React from 'react';
import { Gamepad2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8" />
            <h1 className="text-2xl font-bold">GameHub</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#games" className="hover:text-indigo-200 transition-colors">Games</a></li>
              <li><a href="#about" className="hover:text-indigo-200 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-indigo-200 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}