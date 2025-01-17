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
import { login, register, reset } from "../../redux/features/auth/authSlice";
import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  accountNumber: "",
  initialBalance: "",
  password: "",
  pin: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

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
  }, [user, isAuthenticated, isError, message, navigate, dispatch]);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleShowPin = () => setShowPin(!showPin);

  const toggleMode = () => {
    setFormData(formData);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(register(formData));
    } else {
      dispatch(login(formData));
    }
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (isLoading && user) {
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
                  value={formData.firstName}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  value={formData.lastName}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              value={isSignup ? formData.email : formData.email}
              type="email"
            />
            {isSignup && (
              <>
                <Input
                  name="accountNumber"
                  label="Account Number"
                  handleChange={handleChange}
                  value={formData.accountNumber}
                  type="text"
                />
                <Input
                  name="initialBalance"
                  label="Initial Balance"
                  handleChange={handleChange}
                  value={formData.initialBalance}
                  type="text"
                  half
                />
                <Input
                  name="pin"
                  label="Pin"
                  handleChange={handleChange}
                  value={formData.pin}
                  type={showPin ? "text" : "password"}
                  handleShowPin={handleShowPin}
                  half
                />
              </>
            )}
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              value={isSignup ? formData.password : formData.password}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <>
                <Input
                  name="address"
                  label="Address"
                  handleChange={handleChange}
                  value={formData.address}
                  type="text"
                />
                <Input
                  name="state"
                  label="State"
                  handleChange={handleChange}
                  value={formData.state}
                  type="text"
                  half
                />
                <Input
                  name="city"
                  label="City"
                  handleChange={handleChange}
                  value={formData.city}
                  type="text"
                  half
                />
                <Input
                  name="postalCode"
                  label="Postal Code"
                  handleChange={handleChange}
                  value={formData.postalCode}
                  type="text"
                />
              </>
            )}
          </Grid>
          <Button
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justifyContent="flex-end">
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