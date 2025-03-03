// features/api/apiSlice.ts
import { RootState } from '@/store/store';
import { experienceLevels } from '@/utils/constants';
import { getCookie } from '@/utils/cookieUtils';
import {
  DeveloperProfile,
  DeveloperProfilesResponse,
  DeveloperQueryParams,
  IClientProfile,
  ProfileResponseData,
} from '@/utils/types';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logout } from '../auth/authSlice';

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

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

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile', 'PublicProfiles', 'Cart'],
  endpoints: (builder) => ({
    getDeveloperProfile: builder.query<ProfileResponseData, void>({
      query: () => '/developer-profile',
      providesTags: ['Profile'],
    }),

    getClientProfile: builder.query<ApiResponse<IClientProfile>, void>({
      query: () => '/client-profile',
      providesTags: ['Profile'],
    }),

    getPublicProfiles: builder.query<
      DeveloperProfilesResponse,
      DeveloperQueryParams
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);

        if (params.experience?.length) {
          const selectedRanges = params.experience
            .map((exp) => experienceLevels.find((level) => level.value === exp))
            .filter(Boolean);

          if (selectedRanges.length > 0) {
            const minExp = Math.min(
              ...selectedRanges.map((range) => range?.minExp ?? Infinity)
            );

            const maxExps = selectedRanges
              .map((range) => range?.maxExp)
              .filter((max): max is number => max !== null);

            const maxExp =
              maxExps.length > 0 ? Math.max(...maxExps) : undefined;

            if (minExp !== Infinity) {
              queryParams.append('minExperience', minExp.toString());
            }

            if (maxExp !== undefined) {
              queryParams.append('maxExperience', maxExp.toString());
            }
          }
        }

        return {
          url: `/public-profiles?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['PublicProfiles'],
    }),

    getPublicProfileById: builder.query<
      {
        success: boolean;
        message: string;
        data: DeveloperProfile;
      },
      string
    >({
      query: (id) => `/public-profiles/${id}`,
      providesTags: (result, error, id) => [{ type: 'PublicProfiles', id }],
    }),
  }),
});

export const {
  useGetDeveloperProfileQuery,
  useGetPublicProfilesQuery,
  useGetPublicProfileByIdQuery,
  useGetClientProfileQuery,
} = apiSlice;
