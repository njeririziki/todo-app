import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

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
    <div className="w-full h-full flex items-center justify-center">
       {isAuthenticated ? (
        <div>
        <button onClick={handleLogout}>Logout</button>
        {/* Todo list and functionality will go here */}
        </div>
      ) : (
        <div>
        <h2></h2>
        <button onClick={handleLogin}>Login</button>
        </div>
      )}
      <div>
        {children}
      </div>
      {/* <div className="text-center">
      <h1>Get your Tasks Organized</h1>    
      </div> */}
    </div>
  );
};

export default LayoutPage;