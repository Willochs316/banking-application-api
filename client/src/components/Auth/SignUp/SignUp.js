import React, { useState } from "react";
import {
  Avatar,
  Button,
  // CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SignUpFields from "./SignUpFields";
import useStyles from "../styles";

const initialState = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

const SignUp = ({ toggleMode }) => {
  const [formData, setFormaData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormaData((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <SignUpFields
              formData={formData}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={toggleMode}>
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
