import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { login, register, reset } from "../../features/auth/authSlice";
import useStyles from "./styles";

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

const Auth = () => {
  const [formData, setFormaData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { user, isLoading, isError, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isAuthenticated || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isAuthenticated, message, navigate, dispatch]);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const toggleMode = () => {
    setFormaData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
    };

    if (isSignup) {
      dispatch(register(userData));
    } else {
      dispatch(login(formData));
    }
  };

  const handleChange = (e) =>
    setFormaData({ ...formData, [e.target.name]: e.target.value });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Log in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}

            {isSignup && (
              <>
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  handleChange={handleChange}
                  type="text"
                />
                <Input
                  name="address"
                  label="Address"
                  handleChange={handleChange}
                  type="text"
                />
                <Input
                  name="state"
                  label="State"
                  handleChange={handleChange}
                  type="text"
                  half
                />
                <Input
                  name="city"
                  label="City"
                  handleChange={handleChange}
                  type="text"
                  half
                />
                <Input
                  name="postalCode"
                  label="Postal Code"
                  handleChange={handleChange}
                  type="text"
                />
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={toggleMode}>
                {isSignup
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
