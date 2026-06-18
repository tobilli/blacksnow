import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { getProduct } from '../../services/products';
import { getErrorMessage } from '../../lib/getErrorMessage';

export const useGetProduct = (id: string) => {
  const toast = useToast();

  const result = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (result.isError) {
      toast({
        title: 'Failed to load product',
        description: getErrorMessage(result.error),
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [result.isError, result.error]);

  return result;
};
