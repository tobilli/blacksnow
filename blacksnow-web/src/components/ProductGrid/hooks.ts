import { useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { getProducts } from '../../services/products';
import type { ErrorResponse } from '../../services/request-config';
import type { ProductsQuery } from '../../services/products/types';

export const useGetProducts = (query?: ProductsQuery) => {
  const toast = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', query],
    queryFn: () => getProducts(query),
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Failed to load products',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { data, isLoading, error: error as ErrorResponse | null, refetch };
};
