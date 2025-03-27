import { ApiResponse, IExperience, IExperienceFormData } from '@/utils/types';
import { apiSlice } from './apiSlice';

export const experienceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addExperience: builder.mutation<
      ApiResponse<IExperience>,
      IExperienceFormData
    >({
      query: (data) => ({
        url: '/developer-profile/experience',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateExperience: builder.mutation<
      ApiResponse<IExperience>,
      { experienceId: string; data: IExperienceFormData }
    >({
      query: ({ experienceId, data }) => ({
        url: `/developer-profile/experience/${experienceId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    deleteExperience: builder.mutation<ApiResponse<void>, string>({
      query: (experienceId) => ({
        url: `/developer-profile/experience/${experienceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
