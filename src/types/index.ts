export type UserRole = 'patient' | 'doctor' | 'admin' | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface DoctorProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  bio: string;
  licenseNumber: string;
  licenseDocument?: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  rating: number;
  reviewCount: number;
  consultationsCompleted: number;
  availability: AvailabilitySlot[];
  avatar?: string;
}

export interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  appointmentId: string;
  senderId: string;
  senderName: string;
  senderRole: 'patient' | 'doctor';
  message: string;
  timestamp: string;
}

export interface DoctorApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  licenseNumber: string;
  licenseDocument: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}
