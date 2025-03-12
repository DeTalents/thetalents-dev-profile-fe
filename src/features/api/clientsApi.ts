import { ApiResponse } from '@/utils/types';
import { apiSlice } from './apiSlice';

interface ClientProfile {
  clientName: string;
  companyName: string;
  phone: string;
}

interface Client {
  id: string;
  email: string;
  clientProfile: ClientProfile;
}

interface ClientsResponse {
  message: string;
  data: Client[];
}

export const clientApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllClients: builder.query<ClientsResponse, void>({
      query: () => '/admin/clients',
      providesTags: ['Client'],
    }),
    inviteClient: builder.mutation<
      ApiResponse<ClientsResponse>,
      { email: string }
    >({
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
