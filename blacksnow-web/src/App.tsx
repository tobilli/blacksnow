import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
