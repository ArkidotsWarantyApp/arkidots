import React, { useState } from 'react';
import Header from '../components/common/Header';
import LeadList from '../components/leads/LeadList';
import LeadStatus from '../components/leads/LeadStatus';
import Timeline from '../components/leads/Timeline';
import LeadDetails from '../components/leads/LeadDetails';
import ViewToggle from '../components/leads/ViewToggle';
import { useLeadStore } from '../store/leadStore';
import { Menu } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { selectedLead } = useLeadStore();
  const [view, setView] = useState<'details' | 'timeline'>('timeline');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Left sidebar with lead list */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-80 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full overflow-y-auto">
            <LeadList />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedLead ? (
            <>
              {/* View toggle */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto">
                  <ViewToggle currentView={view} onViewChange={setView} />
                </div>
              </div>

              {/* Content based on selected view */}
              <div className="flex-1 overflow-hidden">
                {view === 'details' ? (
                  <div className="h-full overflow-y-auto">
                    <LeadDetails />
                  </div>
                ) : (
                  <div className="h-full flex flex-col lg:flex-row">
                    <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 min-w-0">
                      <LeadStatus />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Timeline />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-white">
              <p className="text-gray-500">Select a lead to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;