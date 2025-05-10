import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useLeadStore } from '../../store/leadStore';
import { Building, LogOut, User, UserPlus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const selectedLead = useLeadStore(state => state.selectedLead);
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-4">
            <Building className="h-10 w-10 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">ARKIDOTS CRM</span>
          </div>
          
          {selectedLead && (
            <div className="hidden md:flex flex-1 mx-12 items-center">
              <div className="bg-gray-50 rounded-lg p-3 flex-1 flex flex-wrap">
                <div className="px-6 py-2">
                  <div className="text-sm text-gray-500">Customer</div>
                  <div className="font-medium">{selectedLead.customerName}</div>
                </div>
                <div className="px-6 py-2">
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{selectedLead.phoneNumber}</div>
                </div>
                <div className="px-6 py-2">
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{selectedLead.email}</div>
                </div>
                <div className="px-6 py-2">
                  <div className="text-sm text-gray-500">Project</div>
                  <div className="font-medium">{selectedLead.projectTitle}</div>
                </div>
                <div className="px-6 py-2">
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="font-medium">{selectedLead.location}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-6">
            {user?.role === 'admin' && (
              <>
                <Link 
                  to="/users" 
                  className="text-gray-700 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <UserPlus className="h-6 w-6" />
                </Link>
                <Link 
                  to="/settings" 
                  className="text-gray-700 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <Settings className="h-6 w-6" />
                </Link>
              </>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary-100 text-primary-700">
                <User className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {user?.name}
              </span>
            </div>
            
            <button
              onClick={logout}
              className="text-gray-700 hover:text-error-600 p-2 rounded-full hover:bg-gray-100"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;