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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../../reducers/authSlice";
import LoginFields from "./LoginFields";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../SignUp/SignUpValidation";
import useStyles from "../styles";

const Login = ({ toggleMode }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    email: "",
    password: "",
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

    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: loginInfo.username,
      email: loginInfo.email,
      password: loginInfo.password,
    };

    if (
      validateUsername(loginInfo.username) &&
      validateEmail(loginInfo.email) &&
      validatePassword(loginInfo.password)
    ) {
      dispatch(login(userData));
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
        <Typography variant="h5">Login</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <LoginFields
              loginInfo={loginInfo}
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
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={toggleMode}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
