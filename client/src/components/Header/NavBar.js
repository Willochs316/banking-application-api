import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grid
      container
      style={{ width: "35%", marginBottom: "20px" }}
      spacing={2}
      justifyContent="flex-end"
    >
      <Grid item>
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          onClick={() => {
            navigate("/deposit");
          }}
        >
          deposits
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          onClick={() => {
            navigate("/withdraw");
          }}
        >
          withdraw
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          onClick={() => {
            navigate("/transaction");
          }}
        >
          transaction
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavBar;
