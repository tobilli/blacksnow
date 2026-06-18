import { postRequest } from '../request-config';
import {
  LoginBody,
  LoginResponse,
  LogoutBody,
  LogoutResponse,
  RefreshBody,
  RefreshResponse,
  RegisterBody,
  RegisterResponse,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const TOKEN_KEY = 'blacksnow_access_token';
const REFRESH_KEY = 'blacksnow_refresh_token';

export const register = (body: RegisterBody) =>
  postRequest<RegisterResponse>(BASE_URL, '/api/auth/register', body);

export const login = async (body: LoginBody): Promise<LoginResponse> => {
  const res = await postRequest<LoginResponse>(BASE_URL, '/api/auth/login', body);
  localStorage.setItem(TOKEN_KEY, res.data.accessToken);
  localStorage.setItem(REFRESH_KEY, res.data.refreshToken);
  return res;
};

export const refreshToken = async (): Promise<RefreshResponse> => {
  const token = localStorage.getItem(REFRESH_KEY) ?? '';
  const body: RefreshBody = { refreshToken: token };
  const res = await postRequest<RefreshResponse>(BASE_URL, '/api/auth/refresh', body);
  localStorage.setItem(TOKEN_KEY, res.data.accessToken);
  return res;
};

export const logout = async (): Promise<LogoutResponse> => {
  const token = localStorage.getItem(REFRESH_KEY) ?? '';
  const body: LogoutBody = { refreshToken: token };
  const res = await postRequest<LogoutResponse>(BASE_URL, '/api/auth/logout', body);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  return res;
};
