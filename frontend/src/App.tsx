import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import LayoutPage from './pages/Layout';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Auth0ProviderWithHistory>
    <QueryClientProvider client={queryClient}>
      
        <LayoutPage  />
      
    </QueryClientProvider>
    </Auth0ProviderWithHistory>
  );
};

export default App;