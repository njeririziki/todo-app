import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './LandingPage';


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
const LayoutPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
     logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col ">
     <div className='p-4 self-end' >
       {isAuthenticated ? (        
        <button onClick={handleLogout}>Logout</button>
       
      ) : (       
        <button onClick={handleLogin}>Login</button>
        
      )}
      </div>
      <div className='h-full flex items-center justify-center'>
        {isAuthenticated ? children : <LandingPage />}
      </div>
      
    </div>
  );
};

export default LayoutPage;