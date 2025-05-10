import React from 'react';
import Header from '../components/common/Header';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft, Save, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const user = useAuthStore(state => state.user);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard"
            className="mr-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <SettingsIcon className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Account Settings
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account settings and preferences
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Profile Information</h3>
                <p className="mt-1 text-sm text-gray-500">Update your profile information and email address.</p>
                
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={user?.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user?.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Change Password</h3>
                <p className="mt-1 text-sm text-gray-500">Ensure your account is using a secure password.</p>
                
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900">Application Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Configure application-wide settings.</p>
                
                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      defaultChecked
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                      Receive email notifications for lead status changes
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className="btn btn-primary flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;