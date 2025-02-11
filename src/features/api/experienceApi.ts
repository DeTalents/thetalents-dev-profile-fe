import { apiSlice } from './apiSlice';

// Define the Experience type
interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

// Define the form data type
export interface ExperienceFormData {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

// Define API response types
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export const experienceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addExperience: builder.mutation<
      ApiResponse<Experience>,
      ExperienceFormData
    >({
      query: (data) => ({
        url: '/developer-profile/experience',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateExperience: builder.mutation<
      ApiResponse<Experience>,
      { experienceId: string; data: ExperienceFormData }
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
