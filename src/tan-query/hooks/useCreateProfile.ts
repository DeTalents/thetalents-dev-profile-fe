import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateProfileSchema } from '@/validations/createProfile';
import { profileApi } from '../api/profile';

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfileSchema) => profileApi.createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
