import React, { useState } from 'react';
import { useLeadStore } from '../../store/leadStore';
import { Calendar, AlertTriangle, CheckCircle, XCircle, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { LeadStage } from '../../types';

const Timeline: React.FC = () => {
  const { selectedLead } = useLeadStore();
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set(['Milestone 1']));
  
  if (!selectedLead) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <p className="text-gray-500">Select a lead to view timeline</p>
      </div>
    );
  }

  const toggleMilestone = (milestone: string) => {
    setExpandedMilestones(prev => {
      const next = new Set(prev);
      if (next.has(milestone)) {
        next.delete(milestone);
      } else {
        next.add(milestone);
      }
      return next;
    });
  };

  // Helper function to get status indicator
  const getStatusIndicator = (stage: LeadStage) => {
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
    if (stage.expectedDate) {
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
    }
    
    return (
      <div className="flex items-center text-gray-500">
        <Clock className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">No date set</span>
      </div>
    );
  };

  const getTimelineDate = (stage: LeadStage) => {
    if (stage.status === 'done' && stage.actualDate) {
      return format(parseISO(stage.actualDate), 'MMM d');
    }
    return stage.expectedDate ? format(parseISO(stage.expectedDate), 'MMM d') : 'No date';
  };

  const getTimelineItemClass = (stage: LeadStage) => {
    if (stage.status === 'done') return 'bg-success-500';
    if (stage.status === 'lost') return 'bg-error-500';
    
    if (stage.expectedDate) {
      const expectedDate = parseISO(stage.expectedDate);
      const today = new Date();
      
      if (expectedDate < today) return 'bg-error-500';
    }
    return 'bg-primary-500';
  };

  // Group stages by milestone
  const stagesByMilestone = selectedLead.stages.reduce((acc, stage) => {
    const milestone = stage.milestone || 'No Milestone';
    if (!acc[milestone]) {
      acc[milestone] = [];
    }
    acc[milestone].push(stage);
    return acc;
  }, {} as Record<string, LeadStage[]>);

  // Sort milestones
  const sortedMilestones = Object.keys(stagesByMilestone).sort((a, b) => {
    const aNum = parseInt(a.replace('Milestone ', ''));
    const bNum = parseInt(b.replace('Milestone ', ''));
    return aNum - bNum;
  });

  // Calculate progress for each milestone
  const calculateMilestoneProgress = (stages: LeadStage[]) => {
    const totalStages = stages.length;
    const completedStages = stages.filter(stage => stage.status === 'done').length;
    return Math.round((completedStages / totalStages) * 100);
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
        
        {selectedLead.stages.length > 0 ? (
          <div className="relative">
            {/* Vertical line connecting all milestones */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {sortedMilestones.map((milestone, milestoneIndex) => {
                const progress = calculateMilestoneProgress(stagesByMilestone[milestone]);
                return (
                  <div key={milestone} className="relative">
                    {/* Milestone connector */}
                    <div className="absolute left-8 w-4 h-4 rounded-full bg-primary-600 border-4 border-white -translate-x-1/2"></div>
                    
                    <div className="ml-16">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-gray-900">{milestone}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-gray-500">{progress}%</div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-600 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {stagesByMilestone[milestone].map((stage, index) => (
                          <div 
                            key={stage.id} 
                            className={`p-4 rounded-lg border ${
                              stage.status === 'done' 
                                ? 'border-success-200 bg-success-50' 
                                : stage.status === 'lost'
                                ? 'border-error-200 bg-error-50'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  {getStatusIndicator(stage)}
                                  <span className="text-xs text-gray-500">{getTimelineDate(stage)}</span>
                                </div>
                                <h4 className="mt-1 text-sm font-medium text-gray-900">{stage.name}</h4>
                                {stage.notes && (
                                  <p className="mt-2 text-xs text-gray-600 bg-white/50 p-2 rounded">
                                    {stage.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Connection line to next milestone */}
                    {milestoneIndex < sortedMilestones.length - 1 && (
                      <div className="absolute left-8 w-0.5 h-8 bg-gray-200 -bottom-8"></div>
                    )}
                  </div>
                );
              })}
            </div>
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