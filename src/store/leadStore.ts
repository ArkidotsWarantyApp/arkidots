import { create } from 'zustand';
import { addDays, format } from 'date-fns';
import { Lead, LeadStage, DEFAULT_STAGES } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface LeadState {
  leads: Lead[];
  selectedLead: Lead | null;
  addLead: (lead: Omit<Lead, 'id' | 'stages' | 'createdAt'>) => void;
  selectLead: (id: string) => void;
  updateLead: (id: string, updates: Partial<Omit<Lead, 'id' | 'stages'>>) => void;
  deleteLead: (id: string) => void;
  updateLeadStage: (leadId: string, stageId: string, updates: Partial<Omit<LeadStage, 'id' | 'order'>>) => void;
}

// Create mock leads for demonstration
const today = new Date();
const createMockStages = (): LeadStage[] => {
  return DEFAULT_STAGES.map((stage, index) => {
    const expectedDate = format(addDays(today, index * 2), 'yyyy-MM-dd');
    return {
      ...stage,
      id: uuidv4(),
      expectedDate,
      actualDate: index < 3 ? expectedDate : undefined, // First 3 stages complete for demo
      status: index < 3 ? 'done' : 'pending',
    };
  });
};

const mockLeads: Lead[] = [
  {
    id: '1',
    customerName: 'John Smith',
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.smith@example.com',
    projectTitle: 'Modern Kitchen Renovation',
    location: 'San Francisco, CA',
    createdAt: format(addDays(today, -14), 'yyyy-MM-dd'),
    stages: createMockStages(),
  },
  {
    id: '2',
    customerName: 'Emily Johnson',
    phoneNumber: '+1 (555) 987-6543',
    email: 'emily.johnson@example.com',
    projectTitle: 'Office Space Design',
    location: 'New York, NY',
    createdAt: format(addDays(today, -10), 'yyyy-MM-dd'),
    stages: createMockStages(),
  },
  {
    id: '3',
    customerName: 'Michael Williams',
    phoneNumber: '+1 (555) 456-7890',
    email: 'michael.williams@example.com',
    projectTitle: 'Residential Interior Renovation',
    location: 'Chicago, IL',
    createdAt: format(addDays(today, -7), 'yyyy-MM-dd'),
    stages: createMockStages(),
  },
];

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: mockLeads,
  selectedLead: mockLeads[0], // Default to the first lead

  addLead: (leadData) => {
    const newLead: Lead = {
      id: uuidv4(),
      ...leadData,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      stages: DEFAULT_STAGES.map((stage, index) => ({
        ...stage,
        id: uuidv4(),
        expectedDate: format(addDays(new Date(), index * 2), 'yyyy-MM-dd'),
      })),
    };

    set(state => ({ 
      leads: [...state.leads, newLead],
      selectedLead: newLead,
    }));
  },

  selectLead: (id) => {
    const { leads } = get();
    const lead = leads.find(l => l.id === id) || null;
    set({ selectedLead: lead });
  },

  updateLead: (id, updates) => {
    set(state => {
      const updatedLeads = state.leads.map(lead => 
        lead.id === id ? { ...lead, ...updates } : lead
      );
      
      const updatedSelectedLead = state.selectedLead?.id === id 
        ? { ...state.selectedLead, ...updates } 
        : state.selectedLead;

      return { 
        leads: updatedLeads,
        selectedLead: updatedSelectedLead, 
      };
    });
  },

  deleteLead: (id) => {
    set(state => {
      const filteredLeads = state.leads.filter(lead => lead.id !== id);
      let selectedLead = state.selectedLead;
      
      // If the deleted lead was selected, select another one or null
      if (state.selectedLead?.id === id) {
        selectedLead = filteredLeads.length > 0 ? filteredLeads[0] : null;
      }

      return { leads: filteredLeads, selectedLead };
    });
  },

  updateLeadStage: (leadId, stageId, updates) => {
    set(state => {
      // Update in the leads array
      const updatedLeads = state.leads.map(lead => {
        if (lead.id !== leadId) return lead;
        
        const updatedStages = lead.stages.map(stage => 
          stage.id === stageId 
            ? { 
                ...stage, 
                ...updates,
                // Set the actualDate to today if status is changed to 'done'
                actualDate: updates.status === 'done' 
                  ? format(new Date(), 'yyyy-MM-dd') 
                  : stage.actualDate
              } 
            : stage
        );
        
        return { ...lead, stages: updatedStages };
      });
      
      // Also update in selectedLead if it's the one being modified
      let updatedSelectedLead = state.selectedLead;
      if (state.selectedLead?.id === leadId) {
        const updatedStages = state.selectedLead.stages.map(stage => 
          stage.id === stageId 
            ? { 
                ...stage, 
                ...updates,
                actualDate: updates.status === 'done' 
                  ? format(new Date(), 'yyyy-MM-dd') 
                  : stage.actualDate
              } 
            : stage
        );
        
        updatedSelectedLead = { ...state.selectedLead, stages: updatedStages };
      }
      
      return { leads: updatedLeads, selectedLead: updatedSelectedLead };
    });
  },
}));