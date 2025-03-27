import { ApiResponse, IClientProfile } from '@/utils/types';
import { apiSlice } from './apiSlice';

interface Client {
  id: string;
  email: string;
  clientProfile: IClientProfile;
}

export const clientApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllClients: builder.query<ApiResponse<Client[]>, void>({
      query: () => '/admin/clients',
      providesTags: ['Client'],
    }),
    inviteClient: builder.mutation<ApiResponse<Client>, { email: string }>({
      query: (email) => ({
        url: '/admin/invite-client',
        method: 'POST',
        body: email,
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});

export const { useGetAllClientsQuery, useInviteClientMutation } = clientApi;
