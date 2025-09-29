export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: Priority;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  adminReply?: string;
  attachments?: string[];
  submittedBy: {
    id: string;
    name: string;
    email: string;
    department?: string;
    studentId?: string;
  };
}

export type ComplaintCategory = 
  | 'academic'
  | 'facility'
  | 'staff'
  | 'technology'
  | 'accommodation'
  | 'food'
  | 'transport'
  | 'other';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export interface ComplaintFilters {
  status?: ComplaintStatus;
  category?: ComplaintCategory;
  priority?: Priority;
  department?: string;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}

export interface CreateComplaintData {
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: Priority;
}

export const COMPLAINT_CATEGORIES: { value: ComplaintCategory; label: string }[] = [
  { value: 'academic', label: 'Academic Issues' },
  { value: 'facility', label: 'Facility Issues' },
  { value: 'staff', label: 'Staff Behavior' },
  { value: 'technology', label: 'Technology Issues' },
  { value: 'accommodation', label: 'Accommodation' },
  { value: 'food', label: 'Food Services' },
  { value: 'transport', label: 'Transportation' },
  { value: 'other', label: 'Other' }
];

export const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-info text-info-foreground' },
  { value: 'medium', label: 'Medium', color: 'bg-warning text-warning-foreground' },
  { value: 'high', label: 'High', color: 'bg-destructive text-destructive-foreground' },
  { value: 'urgent', label: 'Urgent', color: 'bg-destructive text-destructive-foreground animate-pulse' }
];

export const STATUS_OPTIONS: { value: ComplaintStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'bg-warning text-warning-foreground' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-info text-info-foreground' },
  { value: 'resolved', label: 'Resolved', color: 'bg-success text-success-foreground' },
  { value: 'rejected', label: 'Rejected', color: 'bg-muted text-muted-foreground' }
];