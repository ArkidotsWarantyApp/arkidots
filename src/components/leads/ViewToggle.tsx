import React from 'react';
import { FileText, CalendarDays } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'details' | 'timeline';
  onViewChange: (view: 'details' | 'timeline') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 w-full sm:w-auto">
      <button
        onClick={() => onViewChange('details')}
        className={`flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
          currentView === 'details'
            ? 'bg-primary-50 text-primary-600'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
      >
        <FileText className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Details</span>
      </button>
      
      <button
        onClick={() => onViewChange('timeline')}
        className={`flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
          currentView === 'timeline'
            ? 'bg-primary-50 text-primary-600'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
      >
        <CalendarDays className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Timeline</span>
      </button>
    </div>
  );
};

export default ViewToggle; 