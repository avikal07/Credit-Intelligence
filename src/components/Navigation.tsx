import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface NavigationProps {
  currentScreen: number;
  totalScreens: number;
  onNavigate: (screen: number) => void;
  onHome: () => void;
}

const screenNames = [
  'Home',
  'Data Ingestion',
  'Scoreboard',
  'Company Details',
  'Alerts & Monitoring', 
  'Analytics Dashboard'
];

export default function Navigation({ currentScreen, totalScreens, onNavigate, onHome }: NavigationProps) {
  const canGoPrevious = currentScreen > 0;
  const canGoNext = currentScreen < totalScreens - 1;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onHome}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Home size={20} />
          <span className="font-medium">Credit Intelligence</span>
        </button>
        <div className="h-6 w-px bg-gray-300"></div>
        <span className="text-gray-600 font-medium">{screenNames[currentScreen]}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1">
          {Array.from({ length: totalScreens }, (_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentScreen 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={screenNames[i]}
            />
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate(currentScreen - 1)}
            disabled={!canGoPrevious}
            className={`p-2 rounded-lg border transition-colors ${
              canGoPrevious
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={() => onNavigate(currentScreen + 1)}
            disabled={!canGoNext}
            className={`p-2 rounded-lg border transition-colors ${
              canGoNext
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}