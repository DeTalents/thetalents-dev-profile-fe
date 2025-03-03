import { apiSlice } from './apiSlice';

interface Reference {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  relationship: string;
}

interface ReferenceFormData {
  name: string;
  relationship: string;
  email: string;
  phoneNumber: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export const referenceApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addReference: builder.mutation<ApiResponse<Reference>, ReferenceFormData>({
      query: (data) => ({
        url: '/developer-profile/reference',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateReference: builder.mutation<
      ApiResponse<Reference>,
      { referenceId: string; data: ReferenceFormData }
    >({
      query: ({ referenceId, data }) => ({
        url: `/developer-profile/reference/${referenceId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    deleteReference: builder.mutation<ApiResponse<void>, string>({
      query: (referenceId) => ({
        url: `/developer-profile/reference/${referenceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useAddReferenceMutation,
  useUpdateReferenceMutation,
  useDeleteReferenceMutation,
} = referenceApi;
