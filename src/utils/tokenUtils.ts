import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string | null): string | null => {
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.role || decoded.user?.role || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
