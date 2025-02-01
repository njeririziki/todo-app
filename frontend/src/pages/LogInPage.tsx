import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const TodoPage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    // logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      <h1>Todo Page</h1>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {/* Todo list and functionality will go here */}
        </div>
      ) : (
        <div>
          <h2>Please log in to view your todos</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default TodoPage;