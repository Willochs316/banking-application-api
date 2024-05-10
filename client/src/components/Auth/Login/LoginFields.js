import React from "react";
import Input from "../Input";

const LoginFields = ({
  formData,
  showPassword,
  handleShowPassword,
  handleChange,
}) => {
  const additionalInputs = [
    {
      name: "username",
      label: "Username",
      type: "text",
      value: formData.username,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      value: formData.email,
    },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      value: formData.password,
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
