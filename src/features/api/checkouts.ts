import { ApiResponse } from '@/utils/types';
import { ICheckout } from '@/utils/types/checkout';
import { apiSlice } from './apiSlice';

interface GetCheckoutsParams {
  status?: string;
}

interface UpdateStatusRequest {
  id: string;
  status: string;
}

export const checkoutApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCheckoutsForClient: builder.query<
      ApiResponse<ICheckout[]>,
      GetCheckoutsParams | void
    >({
      query: (params) => {
        if (params && params.status) {
          return `/checkouts?status=${params.status}`;
        }
        return '/checkouts';
      },
      providesTags: ['Checkout'],
    }),
    getCheckoutById: builder.query<ApiResponse<ICheckout>, string>({
      query: (checkoutId) => `/admin/checkouts/${checkoutId}`,
      providesTags: (result, error, id) => [{ type: 'Checkout', id }],
    }),

    getCheckoutsForAdmin: builder.query<
      ApiResponse<ICheckout[]>,
      GetCheckoutsParams | void
    >({
      query: (params) => {
        if (params && params.status) {
          return `/admin/checkouts?status=${params.status}`;
        }
        return '/admin/checkouts';
      },
      providesTags: ['Checkout'],
    }),

    updateCheckoutStatus: builder.mutation<
      ApiResponse<ICheckout>,
      UpdateStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/admin/checkouts/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Checkout', id },
        'Checkout',
      ],
    }),
  }),
});

export const {
  useGetCheckoutsForClientQuery,
  useGetCheckoutsForAdminQuery,
  useGetCheckoutByIdQuery,
  useUpdateCheckoutStatusMutation,
} = checkoutApi;
