import React from "react";
import Input from "../Input";

const LoginFields = ({
  loginInfo,
  showPassword,
  handleShowPassword,
  handleChange,
}) => {
  const additionalInputs = [
    {
      name: "username",
      label: "Username",
      type: "text",
      value: loginInfo.username,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      value: loginInfo.email,
    },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      value: loginInfo.password,
      handleShowPassword: handleShowPassword,
    },
  ];

  return (
    <>
      {additionalInputs.map((input) => (
        <Input
          key={input.name}
          {...input}
          handleChange={handleChange}
          handleShowPassword={handleShowPassword}
          autoFocus
        />
      ))}
    </>
  );
};

export default LoginFields;
