import { ICheckout } from '@/utils/types/checkout';
import { apiSlice } from './apiSlice';

interface CheckoutResponse {
  message: string;
  data: ICheckout[];
}

interface GetCheckoutsParams {
  status?: string;
}

interface SingleCheckoutResponse {
  message: string;
  data: ICheckout;
}

interface UpdateStatusResponse {
  message: string;
  data: ICheckout;
}

interface UpdateStatusRequest {
  id: string;
  status: string;
}

export const checkoutApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCheckoutsForClient: builder.query<
      CheckoutResponse,
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
    getCheckoutById: builder.query<SingleCheckoutResponse, string>({
      query: (checkoutId) => `/admin/checkouts/${checkoutId}`,
      providesTags: (result, error, id) => [{ type: 'Checkout', id }],
    }),

    getCheckoutsForAdmin: builder.query<
      CheckoutResponse,
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
      UpdateStatusResponse,
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
