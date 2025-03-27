import { ICart, ICartItem } from '@/utils/types/cart';
import { apiSlice } from './apiSlice';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface CreateCartRequest {
  name: string;
  status?: 'active' | 'archived';
}

export const cartApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCarts: builder.query<ApiResponse<ICart[]>, void>({
      query: () => '/talent-carts',
      providesTags: ['Cart'],
    }),

    createCart: builder.mutation<ApiResponse<ICart>, CreateCartRequest>({
      query: (cartData) => ({
        url: '/talent-carts',
        method: 'POST',
        body: cartData,
      }),
      invalidatesTags: ['Cart'],
    }),

    deleteCart: builder.mutation<ApiResponse<void>, string>({
      query: (cartId) => ({
        url: `/talent-carts/${cartId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    addTalentToCartItem: builder.mutation<
      ApiResponse<ICartItem>,
      { cartId: string; talentId: string }
    >({
      query: ({ cartId, talentId }) => ({
        url: `/talent-carts/${cartId}/items`,
        method: 'POST',
        body: { talentId },
      }),
      invalidatesTags: (result, error, { cartId }) => [
        { type: 'Cart', id: cartId },
        'Cart',
      ],
    }),

    getTalentCartItems: builder.query<
      ApiResponse<ICartItem[]>,
      { cartId: string }
    >({
      query: ({ cartId }) => ({
        url: `/talent-carts/${cartId}/items`,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),
    deleteCartItem: builder.mutation<
      ApiResponse<void>,
      { cartId: string; itemId: string }
    >({
      query: ({ cartId, itemId }) => ({
        url: `/talent-carts/${cartId}/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    checkoutCart: builder.mutation<any, { cartId: string; notes: string }>({
      query: ({ cartId, notes }) => ({
        url: '/checkouts',
        method: 'POST',
        body: { cartId, notes },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useCreateCartMutation,
  useDeleteCartMutation,
  useAddTalentToCartItemMutation,
  useGetTalentCartItemsQuery,
  useDeleteCartItemMutation,
  useCheckoutCartMutation,
} = cartApi;
