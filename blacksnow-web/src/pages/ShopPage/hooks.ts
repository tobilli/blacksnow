import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { getProducts } from '../../services/products';
import { getErrorMessage } from '../../lib/getErrorMessage';
import type { ProductsQuery } from '../../services/products/types';

export const useGetProducts = (query?: ProductsQuery) => {
  const toast = useToast();

  const result = useQuery({
    queryKey: ['products', query],
    queryFn: () => getProducts(query),
  });

  useEffect(() => {
    if (result.isError) {
      toast({
        title: 'Failed to load products',
        description: getErrorMessage(result.error),
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [result.isError, result.error]);

  return result;
};

export const useShopFilters = () => {
  const [query, setQuery] = useState<ProductsQuery>({ page: 1, perPage: 12 });

  const setCategory = (category: string) => setQuery(q => ({ ...q, category, page: 1 }));
  const setCollection = (collection: string) => setQuery(q => ({ ...q, collection, page: 1 }));
  const setSearch = (search: string) => setQuery(q => ({ ...q, search, page: 1 }));
  const setSort = (sort: string) => setQuery(q => ({ ...q, sort }));
  const setPage = (page: number) => setQuery(q => ({ ...q, page }));
  const resetFilters = () => setQuery({ page: 1, perPage: 12 });

  return { query, setCategory, setCollection, setSearch, setSort, setPage, resetFilters };
};
