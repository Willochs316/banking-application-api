import React from "react";
import { Grid } from "@material-ui/core";
import Profile from "./Profile/Profile";
import useStyles from "./styles";

const Profiles = ({ user, currentId, setCurrentId }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={6}>
        <Profile
          user={user}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      </Grid>
    </Grid>
  );
};

export default Profiles;
