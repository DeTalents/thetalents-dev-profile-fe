import { ProgramInfoFormData, UpdateBasicDetails } from '@/utils/types';
import { CreateProfileSchema } from '@/validations/createProfile';
import { apiSlice } from './apiSlice';

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation<
      ApiResponse<CreateProfileSchema>,
      CreateProfileSchema
    >({
      query: (profileData) => ({
        url: '/developer-profile',
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<
      ApiResponse<CreateProfileSchema>,
      UpdateBasicDetails
    >({
      query: (profileData) => ({
        url: '/developer-profile',
        method: 'PATCH',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateProgramInfo: builder.mutation<
      ApiResponse<CreateProfileSchema>,
      ProgramInfoFormData
    >({
      query: (programInfo) => ({
        url: '/developer-profile',
        method: 'PATCH',
        body: programInfo,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateSkills: builder.mutation<
      ApiResponse<CreateProfileSchema>,
      { skills: string[] }
    >({
      query: (skills) => ({
        url: '/developer-profile',
        method: 'PATCH',
        body: skills,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUpdateProgramInfoMutation,
  useUpdateSkillsMutation,
} = profileApi;
