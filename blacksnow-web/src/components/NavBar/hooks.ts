import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { login, logout, register } from '../../services/auth';
import type { ErrorResponse } from '../../services/request-config';
import type { LoginBody, RegisterBody } from '../../services/auth/types';

export const useLogin = () => {
  const toast = useToast();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (body: LoginBody) => login(body),
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Login failed',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};

export const useRegister = () => {
  const toast = useToast();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (body: RegisterBody) => register(body),
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Registration failed',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};

export const useLogout = () => {
  const toast = useToast();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: logout,
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Logout failed',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};
