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
  }),
});

export const { useCreateProfileMutation } = profileApi;
