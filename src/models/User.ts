import type { Role } from './Role';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isEmailVerified: boolean;
  isVerified: boolean;
  phoneNumber: string;
  organisation: string;
  blocked: boolean;
  date: Date;
  updated: Date;
};
