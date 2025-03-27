import { ApiResponse, IReference } from '@/utils/types';
import { apiSlice } from './apiSlice';

interface ReferenceFormData {
  name: string;
  relationship: string;
  email: string;
  phoneNumber: string;
}

export const referenceApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addReference: builder.mutation<ApiResponse<IReference>, ReferenceFormData>({
      query: (data) => ({
        url: '/developer-profile/reference',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateReference: builder.mutation<
      ApiResponse<IReference>,
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
