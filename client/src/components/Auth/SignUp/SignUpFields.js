import React from "react";
import Input from "../Input";

const SignUpFields = ({
  formData,
  showPassword,
  handleShowPassword,
  handleChange,
}) => {
  const additionalInputs = [
    {
      name: "fullname",
      label: "Full Name",
      type: "text",
      value: formData.fullname,
      half: true,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      value: formData.username,
      half: true,
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
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      value: formData.phoneNumber,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: formData.address,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      value: formData.city,
      half: true,
    },
    {
      name: "state",
      label: "State",
      type: "text",
      value: formData.state,
      half: true,
    },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      value: formData.postalCode,
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
          required
        />
      ))}
    </>
  );
};

export default SignUpFields;
