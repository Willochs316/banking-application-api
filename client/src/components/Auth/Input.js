import React from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  name,
  handleChange,
  label,
  value,
  autoFocus,
  half,
  type,
  handleShowPassword,
  handleShowPin,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        value={value}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password" || name === "pin"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={
                        name === "password" ? handleShowPassword : handleShowPin
                      }
                    >
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
