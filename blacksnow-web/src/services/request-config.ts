import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  ResponseType,
} from 'axios';

export interface ErrorObject {
  status: string;
  message: string;
}

export type ErrorResponse = AxiosError<ErrorObject>;

const TOKEN_KEY = 'blacksnow_access_token';

export const createAxiosInstance = (baseUrl: string): AxiosInstance => {
  return axios.create({ baseURL: baseUrl });
};

export const requestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export const getRequest = async <T>(
  baseUrl: string,
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
  responseType?: ResponseType,
): Promise<T> => {
  const instance = createAxiosInstance(baseUrl);
  requestInterceptor(instance);
  const res = await instance.get<T>(url, { params, responseType, ...config });
  return res.data;
};

export const postRequest = async <T>(
  baseUrl: string,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const instance = createAxiosInstance(baseUrl);
  requestInterceptor(instance);
  const res = await instance.post<T>(url, data, config);
  return res.data;
};

export const putRequest = async <T>(
  baseUrl: string,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const instance = createAxiosInstance(baseUrl);
  requestInterceptor(instance);
  const res = await instance.put<T>(url, data, config);
  return res.data;
};

export const patchRequest = async <T>(
  baseUrl: string,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const instance = createAxiosInstance(baseUrl);
  requestInterceptor(instance);
  const res = await instance.patch<T>(url, data, config);
  return res.data;
};

export const deleteRequest = async <T>(
  baseUrl: string,
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const instance = createAxiosInstance(baseUrl);
  requestInterceptor(instance);
  const res = await instance.delete<T>(url, config);
  return res.data;
};
