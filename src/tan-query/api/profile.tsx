import request from '@/utils/axios';
import { CreateProfileSchema } from '@/validations/createProfile';

export const profileApi = {
  createProfile: (data: CreateProfileSchema) =>
    request.post<{ message: string }>('/developer-profile', data),

  //TODO: update this schema to use UpdateProfileSchema
  updateProfile: (data: CreateProfileSchema) =>
    request.put<{ message: string }>('/developer-profile', data),

  getProfile: () => request.get<CreateProfileSchema>('/developer-profile'),
};
