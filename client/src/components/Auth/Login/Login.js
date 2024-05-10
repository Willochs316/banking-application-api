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
import LoginFields from "./LoginFields";
import useStyles from "../styles";

const Login = ({ toggleMode }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormaData] = useState({
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

    dispatch();
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
