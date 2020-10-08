export interface UserDetails {
  userName: string;
  email: string;
  passwordHash: string;
  exp?: number;
  iat?: number;
  _id?: string;
}