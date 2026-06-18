import type { AxiosError } from 'axios';

export const getErrorMessage = (err: unknown): string => {
  const axiosErr = err as AxiosError<{ message: string }>;
  return axiosErr?.response?.data?.message ?? (err as Error)?.message ?? 'Something went wrong';
};
