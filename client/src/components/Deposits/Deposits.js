import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Deposit from "./Deposit/Deposit";
import useStyles from "./styles";

const Deposits = () => {
  const deposits = useSelector((state) => state.deposits);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {}, [dispatch]);

  return !deposits.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {deposits.map((deposit) => (
        <Grid key={deposit._id} item xs={12} sm={6}>
          <Deposit deposit={deposit} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Deposits;
