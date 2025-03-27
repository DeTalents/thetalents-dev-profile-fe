import { CreateProfileSchema } from '@/validations/createProfile';

export type AndelaProgram = 'ANDELA_2020' | 'ATLP_STACKUP' | 'NONE';
export type NonAndelaProgram =
  | 'AMALITECH'
  | 'THE_GYM'
  | 'AWESOMITY'
  | 'SOLVIT_AFRICA'
  | 'NONE';

export interface ProgramInfoFormData {
  isAndelan: AndelaProgram;
  nonAndelaProgram?: NonAndelaProgram;
  nonAndelaProgramYear?: string;
}

export type BasicDetails = {
  firstName: string;
  secondName: string;
  mainTitle: string;
  phone: string;
  yearsOfExperience: string;
  summary: string;
  email: string;
  isVerified: boolean;
};

export type UpdateBasicDetails = Omit<BasicDetails, 'email' | 'isVerified'>;

export type DeveloperQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  experience?: string[];
};

export type IExperience = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
};

export type DeveloperProfile = {
  id: string;
  userId: string;
  firstName: string;
  secondName: string;
  mainTitle: string;
  phone: string;
  summary: string;
  skills: string[];
  isAndelan: string;
  references: IReference[];
  nonAndelaProgram: string | null;
  nonAndelaProgramYear: number | null;
  yearsOfExperience: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
  };
  experiences: IExperience[];
};

export type Pagination = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

export type DeveloperProfilesResponse = {
  success: boolean;
  message: string;
  data: DeveloperProfile[];
  pagination: Pagination;
};

export interface ProfileResponseData {
  message: string;
  data: CreateProfileSchema;
}

export type IReference = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  relationship: string;
};

export type User = {
  email: string;
};

export type IClientProfile = {
  id: string;
  clientName: string;
  companyName: string;
  phone: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
};

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export type IExperienceFormData = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  isCurrent?: boolean;
};
