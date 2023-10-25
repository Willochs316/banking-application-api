import React from "react";
import Input from "../Input";

const SignUpFields = ({
  signUpInfo,
  showPassword,
  handleShowPassword,
  handleChange,
}) => {
  const additionalInputs = [
    {
      name: "fullname",
      label: "Full Name",
      type: "text",
      value: signUpInfo.fullname,
      half: true,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      value: signUpInfo.username,
      half: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      value: signUpInfo.email,
    },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      value: signUpInfo.password,
      handleShowPassword: handleShowPassword,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      value: signUpInfo.phoneNumber,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: signUpInfo.address,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      value: signUpInfo.city,
      half: true,
    },
    {
      name: "state",
      label: "State",
      type: "text",
      value: signUpInfo.state,
      half: true,
    },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      value: signUpInfo.postalCode,
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

export default SignUpFields;
