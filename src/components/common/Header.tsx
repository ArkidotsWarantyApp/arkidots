import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useLeadStore } from '../../store/leadStore';
import { Building, LogOut, User, UserPlus, Settings, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const { selectedLead, updateLeadTimelineInterval } = useLeadStore();
  
  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedLead) {
      updateLeadTimelineInterval(selectedLead.id, parseInt(e.target.value));
    }
  };
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">ARKIDOTS CRM</span>
          </div>
          
          {selectedLead && (
            <div className="hidden md:flex flex-1 mx-8 items-center">
              <div className="bg-gray-50 rounded-lg p-2 flex-1 flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap flex-1">
                  <div className="px-3 py-1">
                    <div className="text-xs text-gray-500">Customer</div>
                    <div className="text-sm font-medium truncate max-w-[150px]">{selectedLead.customerName}</div>
                  </div>
                  <div className="px-3 py-1">
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-sm font-medium">{selectedLead.phoneNumber}</div>
                  </div>
                  <div className="px-3 py-1">
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-sm font-medium truncate max-w-[150px]">{selectedLead.email}</div>
                  </div>
                  <div className="px-3 py-1">
                    <div className="text-xs text-gray-500">Project</div>
                    <div className="text-sm font-medium truncate max-w-[150px]">{selectedLead.projectTitle}</div>
                  </div>
                  <div className="px-3 py-1">
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="text-sm font-medium truncate max-w-[150px]">{selectedLead.location}</div>
                  </div>
                </div>
                
                {user?.role === 'admin' && (
                  <div className="flex items-center px-3 py-1 border-l border-gray-200">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <select
                      value={selectedLead.timelineInterval || 120}
                      onChange={handleIntervalChange}
                      className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="15">15 min</option>
                      <option value="30">30 min</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                      <option value="480">8 hours</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            {user?.role === 'admin' && (
              <>
                <Link 
                  to="/users" 
                  className="text-gray-700 hover:text-primary-600 p-1.5 rounded-full hover:bg-gray-100"
                >
                  <UserPlus className="h-5 w-5" />
                </Link>
                <Link 
                  to="/settings" 
                  className="text-gray-700 hover:text-primary-600 p-1.5 rounded-full hover:bg-gray-100"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              </>
            )}
            
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full bg-primary-100 text-primary-700">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {user?.name}
              </span>
            </div>
            
            <button
              onClick={logout}
              className="text-gray-700 hover:text-error-600 p-1.5 rounded-full hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;