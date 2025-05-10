import React from 'react';
import Header from '../components/common/Header';
import LeadList from '../components/leads/LeadList';
import LeadStatus from '../components/leads/LeadStatus';
import Timeline from '../components/leads/Timeline';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/4 lg:w-1/5 h-full overflow-y-auto">
          <LeadList />
        </div>
        <div className="hidden md:block md:w-2/4 lg:w-2/5 h-full overflow-y-auto border-l border-r border-gray-200">
          <LeadStatus />
        </div>
        <div className="hidden md:block md:w-1/4 lg:w-2/5 h-full overflow-y-auto">
          <Timeline />
        </div>
      </div>
      
      {/* Mobile view tabs - only visible on small screens */}
      <div className="block md:hidden border-t border-gray-200 bg-white">
        <nav className="flex">
          <a
            href="#leads"
            className="flex-1 py-3 text-center text-sm font-medium text-primary-600 border-t-2 border-primary-500"
          >
            Leads
          </a>
          <a
            href="#status"
            className="flex-1 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Status
          </a>
          <a
            href="#timeline"
            className="flex-1 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Timeline
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;