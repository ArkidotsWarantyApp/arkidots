import React from 'react';
import { useLeadStore } from '../../store/leadStore';
import { format, parseISO, differenceInDays } from 'date-fns';
import { Calendar, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

const Timeline: React.FC = () => {
  const { selectedLead } = useLeadStore();
  
  if (!selectedLead) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <p className="text-gray-500">Select a lead to view timeline</p>
      </div>
    );
  }

  // Filter out stages without dates and sort them by order
  const timelineStages = [...selectedLead.stages]
    .filter(stage => stage.expectedDate)
    .sort((a, b) => a.order - b.order);

  // Helper function to get status indicator
  const getStatusIndicator = (stage: typeof timelineStages[0]) => {
    if (stage.status === 'done') {
      return (
        <div className="flex items-center text-success-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Completed</span>
        </div>
      );
    }
    
    if (stage.status === 'lost') {
      return (
        <div className="flex items-center text-error-600">
          <XCircle className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Lost</span>
        </div>
      );
    }
    
    // Check if expected date is in the past
    const expectedDate = parseISO(stage.expectedDate);
    const today = new Date();
    
    if (expectedDate < today) {
      const daysLate = differenceInDays(today, expectedDate);
      return (
        <div className="flex items-center text-error-600">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">{daysLate} days late</span>
        </div>
      );
    }
    
    // Pending and not late
    const daysUntil = differenceInDays(expectedDate, today);
    return (
      <div className="flex items-center text-primary-600">
        <Clock className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">In {daysUntil} days</span>
      </div>
    );
  };

  const getTimelineDate = (stage: typeof timelineStages[0]) => {
    if (stage.status === 'done' && stage.actualDate) {
      return format(parseISO(stage.actualDate), 'MMM d');
    }
    return format(parseISO(stage.expectedDate), 'MMM d');
  };

  const getTimelineItemClass = (stage: typeof timelineStages[0]) => {
    if (stage.status === 'done') return 'bg-success-500';
    if (stage.status === 'lost') return 'bg-error-500';
    
    const expectedDate = parseISO(stage.expectedDate);
    const today = new Date();
    
    if (expectedDate < today) return 'bg-error-500';
    return 'bg-primary-500';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Timeline</h2>
      </div>
      
      <div className="overflow-y-auto flex-1 p-6">
        <div className="flex items-center mb-4 space-x-2">
          <Calendar className="text-gray-500 h-5 w-5" />
          <h3 className="text-sm font-medium text-gray-700">Project Timeline</h3>
        </div>
        
        {timelineStages.length > 0 ? (
          <div className="relative border-l border-gray-200 ml-4 pt-2 pb-6">
            {timelineStages.map((stage, index) => (
              <div key={stage.id} className="mb-8 ml-6">
                <div className={`absolute w-4 h-4 rounded-full -left-2 mt-1.5 border-2 border-white ${getTimelineItemClass(stage)}`}></div>
                
                <time className="mb-1 text-xs font-normal leading-none text-gray-500">
                  {getTimelineDate(stage)}
                </time>
                
                <h3 className="text-sm font-semibold text-gray-900">{stage.name}</h3>
                
                <div className="mt-1">
                  {getStatusIndicator(stage)}
                </div>
                
                {stage.notes && (
                  <p className="mt-2 text-xs font-normal text-gray-700 bg-gray-50 p-2 rounded">
                    {stage.notes}
                  </p>
                )}
                
                {/* Visual connection lines between stages */}
                {index < timelineStages.length - 1 && (
                  <div className="absolute h-8 w-px bg-gray-200 -left-px ml-px mt-1" style={{ top: `${index * 8 + 4}rem` }}></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>No timeline data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;