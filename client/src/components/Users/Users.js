import React from "react";
import { Grid } from "@material-ui/core";
import User from "./User/User";
import useStyles from "./styles";

const Users = ({ user, currentId, setCurrentId }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={6}>
        <User user={user} currentId={currentId} setCurrentId={setCurrentId} />
      </Grid>
    </Grid>
  );
};

export default Users;
