import React from "react";

interface LandingPageProps {
  handleLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ handleLogin }) => {
  return (
    <div className=" mt-36 w-2/3  flex flex-col gap-12 items-center justify-center">
      <h1 className="font-bold">Manage your Tasks with Ease</h1>
      <h3 className="text-medium ">
        Sign in to start managing your tasks now!
      </h3>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LandingPage;
