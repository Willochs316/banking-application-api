import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../../reducers/authSlice";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SignUpFields from "./SignUpFields";
import {
  validateAddress,
  validateCity,
  validateEmail,
  validateFullname,
  validatePassword,
  validatePhoneNumber,
  validatePostalCode,
  validateState,
  validateUsername,
} from "./SignUpValidation";
import useStyles from "../styles";

const SignUp = ({ toggleMode }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      fullname: signUpInfo.fullname,
      username: signUpInfo.username,
      email: signUpInfo.email,
      password: signUpInfo.password,
      phoneNumber: signUpInfo.phoneNumber,
      address: signUpInfo.address,
      city: signUpInfo.city,
      state: signUpInfo.state,
      postalCode: signUpInfo.postalCode,
    };

    if (
      validateFullname(signUpInfo.fullname) &&
      validateUsername(signUpInfo.username) &&
      validateEmail(signUpInfo.email) &&
      validatePassword(signUpInfo.password) &&
      validatePhoneNumber(signUpInfo.phoneNumber) &&
      validateAddress(signUpInfo.address) &&
      validateCity(signUpInfo.city) &&
      validateState(signUpInfo.state) &&
      validatePostalCode(signUpInfo.postalCode)
    ) {
      dispatch(register(userData));
    } else {
      toast.error("Invalid data provided for fields");
    }
  };

  if (isLoading && user) {
    return <CircularProgress className="spinner" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Up</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <SignUpFields
              signUpInfo={signUpInfo}
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
