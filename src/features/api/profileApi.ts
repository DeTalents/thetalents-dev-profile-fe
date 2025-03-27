import {
  ApiResponse,
  IClientProfile,
  ProgramInfoFormData,
  UpdateBasicDetails,
} from '@/utils/types';
import { ClientProfileFormData } from '@/validations/clientProfileValidation';
import { CreateProfileSchema } from '@/validations/createProfile';
import { apiSlice } from './apiSlice';

type ViewRange = 'week' | 'month';

interface ProfileView {
  date: string;
  views: string;
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

    getDeveloperProfileRecommendations: builder.query<
      {
        currentPercentage: number;
        recommendations: {
          action: string;
          details: string;
          percentageGain: number;
          priority: 'High' | 'Medium' | 'Low';
        }[];
        potentialPercentage: number;
      },
      string
    >({
      query: (profileId) => ({
        url: `/developer-profile/${profileId}/recommendations`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
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

    createClientProfile: builder.mutation<
      ApiResponse<IClientProfile>,
      ClientProfileFormData
    >({
      query: (profileData) => ({
        url: '/client-profile',
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),

    getProfileViews: builder.query<
      ApiResponse<ProfileView[]>,
      { profileId: string; range: ViewRange }
    >({
      query: ({ profileId, range }) => {
        const queryParam = range === 'month' ? '?range=month' : '';
        return `/developer-profile/${profileId}/views${queryParam}`;
      },
      providesTags: (result, error, { profileId }) => [
        { type: 'Profile', id: profileId },
      ],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUpdateProgramInfoMutation,
  useUpdateSkillsMutation,
  useCreateClientProfileMutation,
  useGetDeveloperProfileRecommendationsQuery,
  useGetProfileViewsQuery,
} = profileApi;
