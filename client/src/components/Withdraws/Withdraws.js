import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Withdraw from "./Withdraw/Withdraw";
import useStyles from "./styles";

const Withdraws = ({ setCurrentId }) => {
  const withdraws = useSelector((state) => state.withdraws);
  const classes = useStyles();

  return !withdraws.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {withdraws.map((withdraw) => (
        <Grid key={withdraw._id} item xs={12} sm={6}>
          <Withdraw withdraw={withdraw} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Withdraws;
