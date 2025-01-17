import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Svgs from "../../assets/svgs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch();
    dispatch();
    navigate("/");
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Grid container className={classes.brandContainer}>
        <Grid item className={classes.banking}>
          <Svgs.Banking className={classes.bankingIcon} />
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            BankCrest
          </Typography>
        </Grid>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Avatar
                  className={classes.purple}
                  alt={user.user.username}
                  src={user.user.username}
                >
                  {user.user.fullname
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
                </Avatar>
              </Link>

              <Typography className={classes.fullName} variant="h6">
                {user.user.fullname.toLowerCase()}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              color="primary"
              to="/auth"
              variant="contained"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default Header;