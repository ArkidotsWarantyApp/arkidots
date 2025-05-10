import React, { useState } from 'react';
import { useLeadStore } from '../../store/leadStore';
import { User, Phone, Mail, MapPin, Briefcase, Edit2, Save, X } from 'lucide-react';

const LeadDetails: React.FC = () => {
  const { selectedLead, updateLead } = useLeadStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(selectedLead);

  if (!selectedLead) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <p className="text-gray-500">Select a lead to view details</p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedLead(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = () => {
    if (editedLead) {
      const { id, ...updates } = editedLead;
      updateLead(id, updates);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedLead(selectedLead);
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 sm:p-6">
        <div className="max-w-3xl mx-auto w-full">
          {/* Header with Edit Button */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedLead.name}</h1>
              <p className="mt-1 text-sm text-gray-500">Lead Details</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-success-600 hover:bg-success-50 rounded-md transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Customer Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedLead?.name || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-2 border-gray-200 px-4 py-2 text-base text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 hover:border-gray-300"
                      placeholder="Enter customer name"
                    />
                  ) : (
                    <p className="mt-1 text-base text-gray-900 truncate">{selectedLead.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedLead?.phone || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-2 border-gray-200 px-4 py-2 text-base text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 hover:border-gray-300"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="mt-1 text-base text-gray-900 truncate">{selectedLead.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedLead?.email || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-2 border-gray-200 px-4 py-2 text-base text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 hover:border-gray-300"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <p className="mt-1 text-base text-gray-900 truncate">{selectedLead.email || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedLead?.address || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-2 border-gray-200 px-4 py-2 text-base text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 hover:border-gray-300"
                      placeholder="Enter address"
                    />
                  ) : (
                    <p className="mt-1 text-base text-gray-900 break-words">{selectedLead.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Brief Scope of Work</h2>
            <div className="flex items-start space-x-3">
              <Briefcase className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-500">Project Description</p>
                {isEditing ? (
                  <textarea
                    name="scopeOfWork"
                    value={editedLead?.scopeOfWork || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-2 border-gray-200 px-4 py-2 text-base text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 hover:border-gray-300 resize-none"
                    placeholder="Enter scope of work"
                  />
                ) : (
                  <p className="mt-1 text-base text-gray-900 whitespace-pre-wrap break-words">
                    {selectedLead.scopeOfWork || 'No scope of work provided'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails; 