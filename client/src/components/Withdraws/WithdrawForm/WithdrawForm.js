import React, { useState } from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createWithdraw } from "../../../actions/withdraws";
import Input from "./Input";
import useStyles from "./styles";

const WithdrawForm = () => {
  const [withdrawData, setWithdrawData] = useState({
    sourceAccountNumber: null,
    amount: null,
    currency: "",
    purposeOfTransaction: "",
    password: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createWithdraw(withdrawData));
    clear();
  };

  const clear = () => {
    setWithdrawData({
      sourceAccountNumber: null,
      amount: null,
      currency: "",
      purposeOfTransaction: "",
      password: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Withdraw</Typography>

        <Input withdrawData={withdrawData} setWithdrawData={setWithdrawData} />

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default WithdrawForm;
