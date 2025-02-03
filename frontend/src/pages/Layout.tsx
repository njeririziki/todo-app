import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./LandingPage";
import TodoPage from "./TodoPage";
import SearchComponent from "../components/SearchComponent";
import axios from "axios";
import { useMutation } from "react-query";

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
const createUser = async (newUser: { username: string }) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL_LOCAL}/users`, newUser);
  return response.data;
};

const LayoutPage: React.FC = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const { user, isAuthenticated, loginWithPopup, logout } = useAuth0();

  const mutation = useMutation(createUser, {
    onSuccess: (data: { token: string }) => {
      sessionStorage.setItem("token", data.token);
    },
  });

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      mutation.mutate({ username: user.email });
      sessionStorage.setItem("username", user.name || "");
      sessionStorage.setItem("Avatar", user.picture || "");
    }
  }, [user, isAuthenticated]);

  const handleLogin = () => {
    sessionStorage.clear();
    loginWithPopup();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col ">
      <div className="p-4 self-end mr-4">
        {isAuthenticated ? (
          <div className="flex flex-row gap-4 items-center justify-between">
            <SearchComponent setSearch={setFilterTerm} />
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
      <div className="h-full flex items-center justify-center">
        {isAuthenticated ? (
          <TodoPage filterTerm={filterTerm} />
        ) : (
          <LandingPage handleLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default LayoutPage;
