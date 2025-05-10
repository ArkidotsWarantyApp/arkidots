import React, { useState } from 'react';
import { useLeadStore } from '../../store/leadStore';
import { CheckCircle, XCircle, Circle, Edit, Save, Trash2 } from 'lucide-react';
import { LeadStage, LeadStageStatus } from '../../types';

const LeadStatus: React.FC = () => {
  const { selectedLead, updateLeadStage } = useLeadStore();
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  
  if (!selectedLead) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <p className="text-gray-500">Select a lead to view status</p>
      </div>
    );
  }

  const handleStatusChange = (stageId: string, newStatus: LeadStageStatus) => {
    updateLeadStage(selectedLead.id, stageId, { status: newStatus });
  };

  const handleEditClick = (stage: LeadStage) => {
    setEditingStageId(stage.id);
    setEditingNotes(stage.notes);
  };

  const handleSaveNotes = (stageId: string) => {
    updateLeadStage(selectedLead.id, stageId, { notes: editingNotes });
    setEditingStageId(null);
    setEditingNotes('');
  };

  const getStatusIcon = (status: LeadStageStatus) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'lost':
        return <XCircle className="h-5 w-5 text-error-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStageClass = (status: LeadStageStatus) => {
    switch (status) {
      case 'done':
        return 'border-l-success-500 bg-success-50';
      case 'lost':
        return 'border-l-error-500 bg-error-50';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Lead Status</h2>
      </div>
      
      <div className="overflow-y-auto flex-1 p-4">
        <ul className="space-y-3">
          {selectedLead.stages.map((stage) => (
            <li
              key={stage.id}
              className={`border-l-4 p-3 rounded-md shadow-sm transition-all duration-200 ${getStageClass(stage.status)}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(stage.status)}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{stage.name}</h3>
                    {stage.expectedDate && (
                      <p className="text-xs text-gray-500">
                        Expected: {stage.expectedDate}
                        {stage.actualDate && (
                          <span> • Actual: {stage.actualDate}</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {stage.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(stage.id, 'done')}
                        className="p-1.5 text-gray-400 hover:text-success-500 hover:bg-success-50 rounded"
                        title="Mark as Done"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(stage.id, 'lost')}
                        className="p-1.5 text-gray-400 hover:text-error-500 hover:bg-error-50 rounded"
                        title="Mark as Lost"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  
                  {stage.status !== 'pending' && (
                    <button
                      onClick={() => handleStatusChange(stage.id, 'pending')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="Reset to Pending"
                    >
                      <Circle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Notes section */}
              <div className="mt-2">
                {editingStageId === stage.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-md p-2 focus:border-primary-500 focus:ring-primary-500"
                      rows={3}
                      placeholder="Add notes..."
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingStageId(null)}
                        className="text-xs px-2 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(stage.id)}
                        className="text-xs px-2 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center"
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="group relative">
                    <div className="text-sm text-gray-700 min-h-[1.5rem]">
                      {stage.notes || (
                        <span className="text-gray-400 italic text-xs">No notes</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleEditClick(stage)}
                      className="absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-opacity"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeadStatus;