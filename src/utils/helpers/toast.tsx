'use client';

import { toast } from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
    });
  },
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
    });
  },
};
