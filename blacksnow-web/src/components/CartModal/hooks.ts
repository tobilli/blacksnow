import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { addToCart, clearCart, getCart, removeFromCart } from '../../services/cart';
import type { ErrorResponse } from '../../services/request-config';
import type { AddToCartBody, RemoveFromCartBody } from '../../services/cart/types';

export const useGetCart = (userId: string) => {
  const toast = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCart(userId),
    enabled: !!userId,
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Failed to load cart',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { data, isLoading, error: error as ErrorResponse | null, refetch };
};

export const useAddToCart = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (body: AddToCartBody) => addToCart(body),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['cart', vars.userId] });
    },
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Failed to add to cart',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};

export const useRemoveFromCart = (userId: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (body: RemoveFromCartBody) => removeFromCart(userId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Failed to remove item',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};

export const useClearCart = (userId: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: () => clearCart(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Failed to clear cart',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};
