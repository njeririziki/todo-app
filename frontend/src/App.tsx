import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
//import TodoPage from './pages/TodoPage';
import Routes from './pages/Routes';
//import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* <TodoPage /> */}
        <Routes />
      </div>
    </QueryClientProvider>
  );
};

export default App;