import React, { useState } from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createDeposit } from "../../../actions/deposits";
import Input from "./Input";
import useStyles from "./styles";

const DepositForm = () => {
  const [depositData, setDepositData] = useState({
    sourceAccountNumber: null,
    senderName: "",
    recipientAccountNumber: null,
    recipientName: "",
    amount: null,
    currency: "",
    purposeOfTransaction: "",
    password: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createDeposit(depositData));
    clear();
  };

  const clear = () => {
    setDepositData({
      sourceAccountNumber: null,
      senderName: "",
      recipientAccountNumber: null,
      recipientName: "",
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
        <Typography variant="h6">Creating a Deposit</Typography>

        <Input depositData={depositData} setDepositData={setDepositData} />

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

export default DepositForm;
