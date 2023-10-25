import React, { useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Users from "../components/Users/Users";
import DepositForm from "../components/Deposits/DepositForm/DepositForm";
import Deposits from "../components/Deposits/Deposits";
import Withdraws from "../components/Withdraws/Withdraws";
import WithdrawForm from "../components/Withdraws/WithdrawForm/WithdrawForm";
import Auth from "../components/Auth/Auth";
import Profiles from "../components/Users/Profiles/Profiles";
import ProfileForm from "../components/Users/Profiles/ProfileForm/ProfileForm";
import useStyles from "./styles";

const Pages = () => {
  const [currentId, setCurrentId] = useState(null);

  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <Grow in>
            <Container>
              <Grid
                className={classes.mainContainer}
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12} sm={7}>
                  <Users
                    user={user}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        }
      />

      <Route
        path="/profile"
        element={
          <Grow in>
            <Container>
              <Grid
                className={classes.mainContainer}
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12} sm={7}>
                  <Profiles
                    user={user}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ProfileForm
                    user={user}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        }
      />

      <Route
        path="/deposit"
        element={
          <Grow in>
            <Container>
              <Grid
                className={classes.mainContainer}
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12} sm={7}>
                  <Deposits />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DepositForm />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        }
      />

      <Route
        path="/withdraw"
        element={
          <Grow in>
            <Container>
              <Grid
                className={classes.mainContainer}
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12} sm={7}>
                  <Withdraws />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <WithdrawForm />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        }
      />
    </Routes>
  );
};

export default Pages;
