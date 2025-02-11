import { UpdateBasicDetails } from '@/utils/types';
import { CreateProfileSchema } from '@/validations/createProfile';
import { apiSlice } from './apiSlice';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation<any, CreateProfileSchema>({
      query: (profileData) => ({
        url: '/developer-profile',
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<any, UpdateBasicDetails>({
      query: (profileData) => ({
        url: '/developer-profile',
        method: 'PATCH',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useCreateProfileMutation, useUpdateProfileMutation } =
  profileApi;
