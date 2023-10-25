import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { deleteDeposit } from "../../../actions/deposits";

const Deposit = ({ deposit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const depositFields = [
    { label: "Source Account Number", value: deposit.sourceAccountNumber },
    { label: "Sender Name", value: deposit.senderName },
    {
      label: "Recipient Account Number",
      value: deposit.recipientAccountNumber,
    },
    { label: "Recipient Name", value: deposit.recipientName },
    { label: "Amount", value: deposit.amount },
    { label: "Currency", value: deposit.currency },
    { label: "Purpose of Transaction", value: deposit.purposeOfTransaction },
    { label: "Password", value: deposit.password },
  ];

  return (
    <Card className={classes.card}>
      {depositFields.map((field, index) => (
        <CardContent key={index}>
          <Typography variant="body2" color="textSecondary" component="p">
            {field.label}: {field.value}
          </Typography>
        </CardContent>
      ))}

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="secondary"
          onClick={() => dispatch(deleteDeposit(deposit._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Deposit;
