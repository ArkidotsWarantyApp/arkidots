// User types
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Lead types
export type LeadStageStatus = 'pending' | 'done' | 'lost';

export interface LeadStage {
  id: string;
  name: string;
  status: LeadStageStatus;
  notes: string;
  expectedDate: string;
  actualDate?: string;
  order: number;
  milestone?: string;
}

export interface Lead {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  projectTitle: string;
  location: string;
  stages: LeadStage[];
  createdAt: string;
  timelineInterval: number;
}

// Predefined stages
export const DEFAULT_STAGES: Omit<LeadStage, 'id'>[] = [
  // Proposal Stage
  { name: 'Proposal Shared', status: 'pending', notes: '', expectedDate: '', order: 0, milestone: 'Milestone 1' },
  { name: 'Proposal Approved', status: 'pending', notes: '', expectedDate: '', order: 1, milestone: 'Milestone 1' },
  { name: 'Booking Confirmed', status: 'pending', notes: '', expectedDate: '', order: 2, milestone: 'Milestone 2' },
  { name: 'Payment Received', status: 'pending', notes: '', expectedDate: '', order: 3, milestone: 'Milestone 2' },
  { name: 'Booking Finalized', status: 'pending', notes: '', expectedDate: '', order: 4, milestone: 'Milestone 2' },

  // Briefing Stage
  { name: 'Briefing Call Scheduled', status: 'pending', notes: '', expectedDate: '', order: 5, milestone: 'Milestone 1' },
  { name: 'Briefing Call Done', status: 'pending', notes: '', expectedDate: '', order: 6, milestone: 'Milestone 1' },
  { name: 'Project Scope Locked', status: 'pending', notes: '', expectedDate: '', order: 7, milestone: 'Milestone 2' },
  { name: 'Template Selected', status: 'pending', notes: '', expectedDate: '', order: 8, milestone: 'Milestone 2' },

  // Design Stage
  { name: 'Handover to Design Team', status: 'pending', notes: '', expectedDate: '', order: 9, milestone: 'Milestone 1' },
  { name: 'Design Team Acknowledgment', status: 'pending', notes: 'Internal', expectedDate: '', order: 10, milestone: 'Milestone 1' },
  { name: 'Site Measurements', status: 'pending', notes: '', expectedDate: '', order: 11, milestone: 'Milestone 2' },
  { name: 'Initial Design Meeting', status: 'pending', notes: 'Optional', expectedDate: '', order: 12, milestone: 'Milestone 3' },
  { name: 'Site Validation Visit', status: 'pending', notes: '', expectedDate: '', order: 13, milestone: 'Milestone 4' },
  { name: 'Final Design Meeting', status: 'pending', notes: '', expectedDate: '', order: 14, milestone: 'Milestone 5' },
  { name: 'Additional Design Meeting', status: 'pending', notes: 'Internal', expectedDate: '', order: 15, milestone: 'Milestone 6' },
  { name: '2D Drawings Ready', status: 'pending', notes: '', expectedDate: '', order: 16, milestone: 'Milestone 7' },
  { name: 'Drawings Validated', status: 'pending', notes: 'Internal', expectedDate: '', order: 17, milestone: 'Milestone 8' },
  { name: 'Project Sign-Off', status: 'pending', notes: 'By Client', expectedDate: '', order: 18, milestone: 'Milestone 9' },
  { name: 'Partial Order Confirmed', status: 'pending', notes: 'SO Raised', expectedDate: '', order: 19, milestone: 'Milestone 10' },
  { name: 'Full Order Confirmed', status: 'pending', notes: '', expectedDate: '', order: 20, milestone: 'Milestone 11' },

  // Execution Stage
  { name: 'Site Kick-Off', status: 'pending', notes: '', expectedDate: '', order: 21, milestone: 'Milestone 1' },
  { name: 'KWS Installation - Kids Bedroom', status: 'pending', notes: '', expectedDate: '', order: 22, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Work Area', status: 'pending', notes: '', expectedDate: '', order: 23, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Parent Bedroom', status: 'pending', notes: '', expectedDate: '', order: 24, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Foyer', status: 'pending', notes: '', expectedDate: '', order: 25, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Guest Bedroom', status: 'pending', notes: '', expectedDate: '', order: 26, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Bedroom 5', status: 'pending', notes: '', expectedDate: '', order: 27, milestone: 'Milestone 2' },
  { name: 'KWS Installation - First Floor Hall', status: 'pending', notes: '', expectedDate: '', order: 28, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Kitchen', status: 'pending', notes: '', expectedDate: '', order: 29, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Master Bedroom', status: 'pending', notes: '', expectedDate: '', order: 30, milestone: 'Milestone 2' },
  { name: 'KWS Installation - Living Room', status: 'pending', notes: '', expectedDate: '', order: 31, milestone: 'Milestone 2' },
  { name: 'KWS Manufacturing', status: 'pending', notes: '', expectedDate: '', order: 32, milestone: 'Milestone 3' },
  { name: 'Final Payment', status: 'pending', notes: '', expectedDate: '', order: 33, milestone: 'Milestone 4' },
  { name: 'PIV/Site Readiness', status: 'pending', notes: '', expectedDate: '', order: 34, milestone: 'Milestone 5' },
  { name: 'Material Receipt', status: 'pending', notes: '', expectedDate: '', order: 35, milestone: 'Milestone 6' },
  { name: 'F&D - BF_Dado Dining Chair', status: 'pending', notes: '', expectedDate: '', order: 36, milestone: 'Milestone 7' },
  { name: 'F&D - BF_Tropicana Dining Chair', status: 'pending', notes: '', expectedDate: '', order: 37, milestone: 'Milestone 7' },
  { name: 'F&D - BF_Hiro Dining Table', status: 'pending', notes: '', expectedDate: '', order: 38, milestone: 'Milestone 7' },
  { name: 'F&D - BF_Amari Dining Chair', status: 'pending', notes: '', expectedDate: '', order: 39, milestone: 'Milestone 7' },
  { name: 'F&D - BF_Riverbank Dining Chair', status: 'pending', notes: '', expectedDate: '', order: 40, milestone: 'Milestone 7' },
  { name: 'F&D - Frappe Coffee Table (x2)', status: 'pending', notes: '', expectedDate: '', order: 41, milestone: 'Milestone 7' },
  { name: 'Project Move-in with Snags', status: 'pending', notes: '', expectedDate: '', order: 42, milestone: 'Milestone 8' },
  { name: 'Final Handover (Snag-Free)', status: 'pending', notes: '', expectedDate: '', order: 43, milestone: 'Milestone 9' }
];