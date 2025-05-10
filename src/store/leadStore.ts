import { create } from 'zustand';
import { addDays, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Lead, LeadStage, LeadStageStatus, DEFAULT_STAGES } from '../types';

interface LeadState {
  leads: Lead[];
  selectedLead: Lead | null;
  addLead: (lead: Omit<Lead, 'id' | 'stages' | 'createdAt'>) => void;
  selectLead: (id: string) => void;
  updateLead: (id: string, updates: Partial<Omit<Lead, 'id' | 'stages'>>) => void;
  deleteLead: (id: string) => void;
  updateLeadStage: (leadId: string, stageId: string, updates: Partial<Omit<LeadStage, 'id' | 'order'>>) => void;
  updateLeadTimelineInterval: (leadId: string, interval: number) => void;
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
    customerName: 'Thaha',
    phoneNumber: '+91 98765 43210',
    email: 'thaha@example.com',
    projectTitle: 'Modern Kitchen Renovation',
    location: 'Vakara, Kozhikode, Kerala',
    createdAt: format(addDays(today, -14), 'yyyy-MM-dd'),
    stages: createMockStages(),
    timelineInterval: 120,
  },
  {
    id: '2',
    customerName: 'Saran',
    phoneNumber: '+91 98765 43211',
    email: 'saran@example.com',
    projectTitle: 'Office Space Design',
    location: 'Payyoli, Kerala',
    createdAt: format(addDays(today, -10), 'yyyy-MM-dd'),
    stages: createMockStages(),
    timelineInterval: 120,
  },
  {
    id: '3',
    customerName: 'Sidheeq',
    phoneNumber: '+91 98765 43212',
    email: 'sidheeq@example.com',
    projectTitle: 'Residential Interior Renovation',
    location: 'Bangalore, Karnataka',
    createdAt: format(addDays(today, -7), 'yyyy-MM-dd'),
    stages: createMockStages(),
    timelineInterval: 120,
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
      timelineInterval: 120,
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
      
      if (state.selectedLead?.id === id) {
        selectedLead = filteredLeads.length > 0 ? filteredLeads[0] : null;
      }

      return { leads: filteredLeads, selectedLead };
    });
  },

  updateLeadStage: (leadId, stageId, updates) => {
    set(state => {
      const updatedLeads = state.leads.map(lead => {
        if (lead.id !== leadId) return lead;
        
        const updatedStages = lead.stages.map(stage => 
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
        
        return { ...lead, stages: updatedStages };
      });
      
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

  updateLeadTimelineInterval: (leadId: string, interval: number) => {
    set(state => {
      const updatedLeads = state.leads.map(lead =>
        lead.id === leadId ? { ...lead, timelineInterval: interval } : lead
      );

      const updatedSelectedLead = state.selectedLead?.id === leadId
        ? { ...state.selectedLead, timelineInterval: interval }
        : state.selectedLead;

      return {
        leads: updatedLeads,
        selectedLead: updatedSelectedLead,
      };
    });
  },
}));