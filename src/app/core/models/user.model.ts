export interface User {
  id: number;
  name: string;
  email: string;
  mobile?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}