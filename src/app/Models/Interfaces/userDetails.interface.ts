export interface UserDetails {
  name: string;
  email: string;
  password: string;
  exp?: number;
  iat?: number;
  userId?: string;
}
