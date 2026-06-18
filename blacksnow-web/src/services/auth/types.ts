export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  adminSetupSecret?: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RefreshBody {
  refreshToken: string;
}

export interface LogoutBody {
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  status: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

export interface RegisterResponse {
  status: string;
  data: AuthUser;
}

export interface RefreshResponse {
  status: string;
  data: {
    accessToken: string;
  };
}

export interface LogoutResponse {
  status: string;
  message: string;
}
