/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: any },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<any, void>({
      query: () => '/auth/profile',
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
