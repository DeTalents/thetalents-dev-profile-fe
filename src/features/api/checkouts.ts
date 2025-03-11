import { ICheckout } from '@/utils/types/checkout';
import { apiSlice } from './apiSlice';

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface CheckoutResponse {
  message: string;
  data: ICheckout[];
}

interface GetCheckoutsParams {
  status?: string;
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
  }),
});

export const { useGetCheckoutsForClientQuery } = checkoutApi;
