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
}

export interface Lead {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  projectTitle: string;
  location: string;
  createdAt: string;
  stages: LeadStage[];
}

// Predefined stages
export const DEFAULT_STAGES: Omit<LeadStage, 'id'>[] = [
  { name: 'PS Call', status: 'pending', notes: '', expectedDate: '', order: 0 },
  { name: 'Whatsapp Group Created', status: 'pending', notes: '', expectedDate: '', order: 1 },
  { name: 'Design Call', status: 'pending', notes: '', expectedDate: '', order: 2 },
  { name: 'Direct Meeting', status: 'pending', notes: '', expectedDate: '', order: 3 },
  { name: 'Project Confirmed', status: 'pending', notes: '', expectedDate: '', order: 4 },
  { name: 'First Design Meet', status: 'pending', notes: '', expectedDate: '', order: 5 },
  { name: 'Second Meet', status: 'pending', notes: '', expectedDate: '', order: 6 },
  { name: 'Third Meet', status: 'pending', notes: '', expectedDate: '', order: 7 },
  { name: 'Sign-Off', status: 'pending', notes: '', expectedDate: '', order: 8 },
  { name: 'Site Readiness', status: 'pending', notes: '', expectedDate: '', order: 9 },
  { name: 'Delivery', status: 'pending', notes: '', expectedDate: '', order: 10 },
  { name: 'Handover', status: 'pending', notes: '', expectedDate: '', order: 11 },
  { name: 'Review', status: 'pending', notes: '', expectedDate: '', order: 12 },
  { name: 'Warranty Document Sent', status: 'pending', notes: '', expectedDate: '', order: 13 },
  { name: 'Complete', status: 'pending', notes: '', expectedDate: '', order: 14 },
];