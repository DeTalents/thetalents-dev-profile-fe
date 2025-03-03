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

// Inject endpoints to the existing apiSlice
export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all carts for the current client
    getAllCarts: builder.query<ApiResponse<ICart[]>, void>({
      query: () => '/talent-carts',
      providesTags: ['Cart'],
    }),

    // Create a new cart
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

    getTalentCartItems: builder.mutation<
      ApiResponse<ICartItem[]>,
      { cartId: string }
    >({
      query: ({ cartId }) => ({
        url: `/talent-carts/${cartId}/items`,
        method: 'GET',
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
  useGetTalentCartItemsMutation,
} = cartApi;
