// Project type with all fields including the new currentStage
export type Project = {
  id: number;
  title: string;
  description: string;
  students: string[];
  status: "Not Started" | "In Progress" | "Completed" | "Pending" | "Pending Approval" | "Project Updated" | "Approved" | "Pending Changes";
  proposedBy: 'teacher' | 'student' | 'company';
  approvalStatus: "pending" | "validated" | "rejected" | "changes_requested";
  progress?: number;
  deadline?: string;
  currentStage?: string;
};

// Task type for project-related tasks
export type Task = {
  id: number;
  title: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
};

// ProposedProject type for projects that are still in the proposal stage
export type ProposedProject = {
  id: number;
  title: string;
  description: string;
  proposedBy: 'student' | 'teacher' | 'company';
  status: 'validated' | 'rejected' | 'pending';
};

// User types
export type UserBase = {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  motDePasse: string;
};

export type Student = UserBase & {
  role: 'student';
  specialite: string;
  moyenne: number;
};

export type Teacher = UserBase & {
  role: 'teacher';
  specialite: string;
  grade: string;
  anciennete: number;
  promo: string;
  isResponsableSpecialite: boolean;
};

export type Admin = UserBase & {
  role: 'admin';
  domaine: string;
};

export type Company = UserBase & {
  role: 'company';
  nomEntreprise: string;
  secteur: string;
};

export type User = Student | Teacher | Admin | Company;

// Notification type for system notifications
export type Notification = {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
};

