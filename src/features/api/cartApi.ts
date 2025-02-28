import { apiSlice } from './apiSlice';

// Define interfaces for our data types
interface Cart {
  id: string;
  name: string;
  status: string;
  clientId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  id: string;
  cartId: string;
  talentId: string;
  talentSnapshot: {
    name: string;
    mainTitle: string;
    skills: string[];
    yearsOfExperience: number;
  };
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Request interfaces
interface CreateCartRequest {
  name: string;
  status?: 'active' | 'archived';
}

// Inject endpoints to the existing apiSlice
export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all carts for the current client
    getAllCarts: builder.query<ApiResponse<Cart[]>, void>({
      query: () => '/talent-carts',
      providesTags: ['Cart'],
    }),

    // Create a new cart
    createCart: builder.mutation<ApiResponse<Cart>, CreateCartRequest>({
      query: (cartData) => ({
        url: '/talent-carts',
        method: 'POST',
        body: cartData,
      }),
      invalidatesTags: ['Cart'],
    }),

    // Add talent to a specific cart
    addTalentToCartItem: builder.mutation<
      ApiResponse<CartItem>,
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
  }),
});

export const {
  useGetAllCartsQuery,
  useCreateCartMutation,
  useAddTalentToCartItemMutation,
} = cartApi;

// import { apiSlice } from './apiSlice';

// // Define interfaces for our data types
// interface Cart {
//   id: string;
//   name: string;
//   status: string;
//   itemsCount?: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface CartItem {
//   id: string;
//   cartId: string;
//   talentId: string;
//   talentSnapshot: {
//     name: string;
//     mainTitle: string;
//     skills: string[];
//     yearsOfExperience: number;
//   };
//   createdAt: string;
// }

// interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

// // Request interfaces
// interface AddTalentToCartRequest {
//   talentId: string;
//   cartId: string | null;
//   newCartName: string | null;
// }

// interface CreateCartRequest {
//   name: string;
//   status?: 'active' | 'archived';
// }

// // Response interfaces
// interface AddTalentToCartResponse {
//   success: boolean;
//   message: string;
//   cartItem: CartItem;
// }

// interface CartSelectionError {
//   success: false;
//   message: string;
//   existingCarts: Array<{ id: string; name: string }>;
// }

// // Inject endpoints to the existing apiSlice
// export const cartApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get all carts for the current client
//     getAllCarts: builder.query<ApiResponse<Cart[]>, void>({
//       query: () => '/talent-carts',
//       providesTags: ['Cart'],
//     }),

//     // Get a specific cart by ID with its items
//     getCartById: builder.query<
//       ApiResponse<Cart & { items: CartItem[] }>,
//       string
//     >({
//       query: (cartId) => `/talent-carts/${cartId}`,
//       providesTags: (result, error, id) => [{ type: 'Cart', id }],
//     }),

//     // Create a new cart
//     createCart: builder.mutation<ApiResponse<Cart>, CreateCartRequest>({
//       query: (cartData) => ({
//         url: '/talent-carts',
//         method: 'POST',
//         body: cartData,
//       }),
//       invalidatesTags: ['Cart'],
//     }),

//     // Add talent to cart
//     addTalentToCart: builder.mutation<
//       AddTalentToCartResponse,
//       AddTalentToCartRequest
//     >({
//       query: (data) => ({
//         url: '/talent-carts',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Cart'],
//     }),

//     // Update cart (name, status)
//     updateCart: builder.mutation<
//       ApiResponse<Cart>,
//       { cartId: string; data: Partial<CreateCartRequest> }
//     >({
//       query: ({ cartId, data }) => ({
//         url: `/talent-carts/${cartId}`,
//         method: 'PATCH',
//         body: data,
//       }),
//       invalidatesTags: (result, error, { cartId }) => [
//         { type: 'Cart', id: cartId },
//         'Cart',
//       ],
//     }),

//     // Delete cart
//     deleteCart: builder.mutation<ApiResponse<void>, string>({
//       query: (cartId) => ({
//         url: `/talent-carts/${cartId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Cart'],
//     }),

//     // Remove talent from cart
//     removeTalentFromCart: builder.mutation<
//       ApiResponse<void>,
//       { cartId: string; itemId: string }
//     >({
//       query: ({ cartId, itemId }) => ({
//         url: `/talent-carts/${cartId}/items/${itemId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: (result, error, { cartId }) => [
//         { type: 'Cart', id: cartId },
//         'Cart',
//       ],
//     }),

//     // Talent Cart Item management:
//     addTalentToCartItem: builder.mutation<
//       ApiResponse<CartItem>,
//       { cartId: string; talentId: string }
//     >({
//       query: ({ cartId, talentId }) => ({
//         url: `/talent-carts/${cartId}/items`,
//         method: 'POST',
//         body: { talentId },
//       }),
//       invalidatesTags: (result, error, { cartId }) => [
//         { type: 'Cart', id: cartId },
//         'Cart',
//       ],
//     }),
//   }),
// });

// export const {
//   useGetAllCartsQuery,
//   useGetCartByIdQuery,
//   useCreateCartMutation,
//   useAddTalentToCartMutation,
//   useUpdateCartMutation,
//   useDeleteCartMutation,
//   useRemoveTalentFromCartMutation,
//   useAddTalentToCartItemMutation,
// } = cartApi;
