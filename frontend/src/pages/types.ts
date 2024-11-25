export type Project = {
    id: number;
    title: string;
    description: string;
    students: string[];
    status: 'Not Started' | 'In Progress' | 'Completed';
    proposedBy: 'teacher' | 'student' | 'company';
    approvalStatus: 'validated' | 'rejected' | 'pending';
    progress?: number;
    deadline?: string;
  }
  
  export type Task = {
    id: number;
    title: string;
    dueDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }
  
  export type ProposedProject = {
    id: number;
    title: string;
    description: string;
    proposedBy: 'student' | 'teacher' | 'company';
    status: 'validated' | 'rejected' | 'pending';
  }
  