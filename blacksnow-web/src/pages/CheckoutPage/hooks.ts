import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { createOrder } from '../../services/orders';
import { checkout } from '../../services/checkout';
import type { ErrorResponse } from '../../services/request-config';
import type { CreateOrderBody } from '../../services/orders/types';
import type { CheckoutBody } from '../../services/checkout/types';

export const useCreateOrder = () => {
  const toast = useToast();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (body: CreateOrderBody) => createOrder(body),
    onSuccess: () => {
      toast({
        title: 'Order placed!',
        description: 'Your order has been successfully submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Order failed',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};

export const useCheckout = () => {
  const toast = useToast();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (body: CheckoutBody) => checkout(body),
    onSuccess: () => {
      toast({
        title: 'Checkout complete!',
        description: 'Your order has been received.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (err: ErrorResponse) => {
      toast({
        title: 'Checkout failed',
        description: err.response?.data?.message ?? err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return { mutateAsync, isLoading: isPending, error: error as ErrorResponse | null, data };
};
