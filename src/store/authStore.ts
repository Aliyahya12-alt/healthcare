import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, DoctorProfile, Appointment, Review, DoctorApplication } from '@/types';

interface AuthState {
  user: User | null;
  doctorProfile: DoctorProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateDoctorProfile: (profile: Partial<DoctorProfile>) => void;
  googleLogin: () => Promise<boolean>;
}

// Mock data for demonstration
const mockDoctors: DoctorProfile[] = [
  {
    id: '1',
    userId: 'doc1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@careconnect.com',
    specialization: 'General Medicine',
    experience: 12,
    bio: 'Experienced general practitioner passionate about providing accessible healthcare to all communities.',
    licenseNumber: 'MD-78432',
    verificationStatus: 'approved',
    rating: 4.8,
    reviewCount: 127,
    consultationsCompleted: 342,
    availability: [
      { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { id: '2', day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { id: '3', day: 'Friday', startTime: '09:00', endTime: '13:00', isAvailable: true },
    ],
  },
  {
    id: '2',
    userId: 'doc2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@careconnect.com',
    specialization: 'Pediatrics',
    experience: 8,
    bio: 'Pediatrician dedicated to children\'s health and wellness. Specializing in preventive care.',
    licenseNumber: 'PD-45219',
    verificationStatus: 'approved',
    rating: 4.9,
    reviewCount: 89,
    consultationsCompleted: 256,
    availability: [
      { id: '4', day: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { id: '5', day: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
    ],
  },
  {
    id: '3',
    userId: 'doc3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@careconnect.com',
    specialization: 'Mental Health',
    experience: 15,
    bio: 'Licensed therapist providing compassionate mental health support and counseling services.',
    licenseNumber: 'MH-92341',
    verificationStatus: 'approved',
    rating: 4.7,
    reviewCount: 156,
    consultationsCompleted: 478,
    availability: [
      { id: '6', day: 'Monday', startTime: '13:00', endTime: '19:00', isAvailable: true },
      { id: '7', day: 'Wednesday', startTime: '13:00', endTime: '19:00', isAvailable: true },
      { id: '8', day: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true },
    ],
  },
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'pat1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'John Smith',
    date: '2024-03-10',
    time: '10:00',
    status: 'confirmed',
    notes: 'General checkup',
    createdAt: '2024-03-05T10:30:00Z',
  },
  {
    id: '2',
    patientId: 'pat1',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    patientName: 'John Smith',
    date: '2024-03-15',
    time: '14:00',
    status: 'pending',
    notes: 'Follow-up consultation',
    createdAt: '2024-03-05T11:00:00Z',
  },
];

const mockReviews: Review[] = [
  {
    id: '1',
    appointmentId: '1',
    patientId: 'pat1',
    patientName: 'John Smith',
    doctorId: '1',
    rating: 5,
    comment: 'Dr. Johnson was very thorough and caring. Highly recommend!',
    createdAt: '2024-03-01T10:00:00Z',
  },
];

const mockApplications: DoctorApplication[] = [
  {
    id: '1',
    userId: 'doc4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@email.com',
    specialization: 'Cardiology',
    experience: 10,
    licenseNumber: 'CD-78234',
    licenseDocument: 'license-doc-1.pdf',
    submittedAt: '2024-03-04T09:00:00Z',
    status: 'pending',
  },
  {
    id: '2',
    userId: 'doc5',
    name: 'Dr. Lisa Park',
    email: 'lisa.park@email.com',
    specialization: 'Dermatology',
    experience: 6,
    licenseNumber: 'DM-45231',
    licenseDocument: 'license-doc-2.pdf',
    submittedAt: '2024-03-03T14:30:00Z',
    status: 'pending',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      doctorProfile: null,
      isAuthenticated: false,

      login: async (email: string, password: string, role: UserRole) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock authentication logic
        if (email && password) {
          const user: User = {
            id: role === 'doctor' ? 'doc1' : role === 'admin' ? 'admin1' : 'pat1',
            email,
            name: role === 'doctor' ? 'Dr. Sarah Johnson' : role === 'admin' ? 'Admin User' : 'John Smith',
            role,
          };
          
          const doctorProfile = role === 'doctor' ? mockDoctors[0] : null;
          
          set({ user, doctorProfile, isAuthenticated: true });
          return true;
        }
        return false;
      },

      signup: async (email: string, password: string, name: string, role: UserRole) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (email && password && name) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            role,
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, doctorProfile: null, isAuthenticated: false });
      },

      updateDoctorProfile: (profile: Partial<DoctorProfile>) => {
        const currentProfile = get().doctorProfile;
        if (currentProfile) {
          set({ doctorProfile: { ...currentProfile, ...profile } });
        }
      },

      googleLogin: async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: 'user@gmail.com',
          name: 'Google User',
          role: 'patient',
        };
        
        set({ user, isAuthenticated: true });
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Export mock data for use in components
export { mockDoctors, mockAppointments, mockReviews, mockApplications };
