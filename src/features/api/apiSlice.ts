// features/api/apiSlice.ts
import { RootState } from '@/store/store';
import { getCookie } from '@/utils/cookieUtils';
import { CreateProfileSchema } from '@/validations/createProfile';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logout } from '../auth/authSlice';

export const api_base_url =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: api_base_url,
  prepareHeaders: (headers, { getState }) => {
    // First try to get token from Redux state
    const token = (getState() as RootState).auth?.token;
    // If not in Redux state, try to get from cookie
    const cookieToken = getCookie('token');

    const finalToken = token || cookieToken;

    if (finalToken) {
      headers.set('Authorization', finalToken);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  return result;
};

export interface ProfileResponseData {
  message: string;
  data: CreateProfileSchema;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getDeveloperProfile: builder.query<ProfileResponseData, void>({
      query: () => '/developer-profile',
      providesTags: ['Profile'],
    }),
  }),
});

export const { useGetDeveloperProfileQuery } = apiSlice;
