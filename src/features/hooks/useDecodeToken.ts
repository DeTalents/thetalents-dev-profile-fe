'use client';

import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export interface IDecodedToken {
  userId: string;
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
}

export const useDecodeToken = (token: string | null): string | null => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    try {
      const decoded: IDecodedToken = jwtDecode(token);

      const role = decoded.role || null;
      setUserRole(role);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [token]);

  return userRole;
};
