import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useStyles from "./styles";

const Input = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const fields = [
    { name: "fullname", label: "full name", type: "name" },
    { name: "username", label: "username", type: "text" },
    { name: "email", label: "email", type: "email" },
    {
      name: "phoneNumber",
      label: "phone number",
      type: "number",
      className: classes.noArrows,
    },
    {
      name: "password",
      label: "password",
      type: showPassword ? "text" : "password",
    },
    { name: "address", label: "address", type: "text" },
    { name: "city", label: "city", type: "text" },
    { name: "state", label: "state", type: "text" },
    {
      name: "postalCode",
      label: "postal code",
      type: "number",
      className: classes.noArrows,
    },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {fields.map((field) => (
        <TextField
          key={field.name}
          name={field.name}
          variant="outlined"
          label={field.label}
          className={field.className}
          fullWidth
          type={field.type || "text"}
          value={formData[field.name] || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              [field.name]: e.target.value,
            })
          }
          InputProps={
            field.name === "password"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={togglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : null
          }
        />
      ))}
    </>
  );
};

export default Input;
