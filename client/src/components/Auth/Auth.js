import { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

const Auth = () => {
  const [toggleForm, setToggleForm] = useState(false);

  const toggleMode = () => {
    setToggleForm(!toggleForm);
  };

  return (
    <>
      {toggleForm ? (
        <SignUp toggleMode={toggleMode} />
      ) : (
        <Login toggleMode={toggleMode} />
      )}
    </>
  );
};

export default Auth;
