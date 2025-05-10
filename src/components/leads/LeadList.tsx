import React, { useState } from 'react';
import { useLeadStore } from '../../store/leadStore';
import { Plus, Search, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import NewLeadModal from './NewLeadModal';

const LeadList: React.FC = () => {
  const { leads, selectedLead, selectLead } = useLeadStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate progress percentage for each lead
  const calculateProgress = (lead: typeof leads[0]) => {
    const totalStages = lead.stages.length;
    const completedStages = lead.stages.filter(stage => stage.status === 'done').length;
    return Math.round((completedStages / totalStages) * 100);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Leads</h2>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredLeads.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredLeads.map(lead => (
              <li
                key={lead.id}
                className={`
                  hover:bg-gray-50 cursor-pointer
                  ${selectedLead?.id === lead.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''}
                `}
                onClick={() => selectLead(lead.id)}
              >
                <div className="px-4 py-4">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{lead.customerName}</h3>
                    <span className="text-xs text-gray-500">
                      {format(parseISO(lead.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{lead.projectTitle}</p>
                  <p className="text-xs text-gray-500">{lead.location}</p>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium text-gray-900">{calculateProgress(lead)}%</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary-600 h-1.5 rounded-full"
                        style={{ width: `${calculateProgress(lead)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No leads found. Try a different search or add a new lead.
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Lead
        </button>
      </div>
      
      {/* New Lead Modal */}
      <NewLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LeadList;