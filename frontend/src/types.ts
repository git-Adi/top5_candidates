export interface Candidate {
  id: string;
  name: string;
  email: string;
  status: 'New' | 'In Review' | 'Interviewed' | 'Offered' | 'Hired' | 'Rejected';
  gender: string;
  ethnicity: string;
  resumeUrl?: string;
  appliedDate: string;
  // Add more fields as needed
}
