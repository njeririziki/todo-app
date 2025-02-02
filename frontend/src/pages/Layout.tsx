import React,{ useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './LandingPage';
import TodoPage from './TodoPage';
import SearchComponent from '../components/SearchComponent';
import apiInstance from '../utils/ApiInstance';
import { useMutation } from 'react-query';

/**
 * LayoutPage component that handles user authentication and displays content accordingly.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactElement} props.children - The child elements to be rendered within the layout.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <LayoutPage>
 *   <TodoList />
 * </LayoutPage>
 *
 * This component uses the `useAuth0` hook to manage authentication state.
 * If the user is authenticated, it displays a logout button and the children elements.
 * If the user is not authenticated, it displays a login button.
 */
const createUser = async (newUser: { username: string}) => {
     
  const response = await apiInstance.post(`/todos`, newUser);
  return response.data;
};

const LayoutPage: React.FC = () => {

  const [filterTerm, setFilterTerm] = useState('')
 const { user, isAuthenticated, logout } = useAuth0();

 const mutation = useMutation(createUser, {
        onSuccess: (data: { authToken: string }) => {
          console.log({createTodo:data});
          
            //sessionStorage.setItem('ownerId', data.id);
            sessionStorage.setItem('token', data.authToken);
        },
    });
  const handleLogin = () => {
    
    if (user && user.email) {
      mutation.mutate({ username: user.email });
    }
  };

  const handleLogout = () => {
     logout();
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col ">
     <div className='p-4 self-end mr-4' >
       {isAuthenticated ? (    
         <div className='flex flex-row gap-4 items-center justify-between'>
        <SearchComponent  setSearch={setFilterTerm}/>    
        <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (     
       
        <button onClick={handleLogin}>Login</button>
    
        
      )}
      </div>
      <div className='h-full flex items-center justify-center'>
        {!isAuthenticated ? <TodoPage filterTerm={filterTerm}/> : <LandingPage />}
      </div>
      
    </div>
  );
};

export default LayoutPage;


