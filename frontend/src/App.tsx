import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoPage from './pages/TodoPage';
import LayoutPage from './pages/Layout';


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    
    <QueryClientProvider client={queryClient}>
      
        <LayoutPage  children={<TodoPage/>} />
      
    </QueryClientProvider>
  );
};

export default App;