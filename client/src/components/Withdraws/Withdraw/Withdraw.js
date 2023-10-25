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

const Withdraw = ({ withdraw }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const withdrawFields = [
    { label: "Source Account Number", value: withdraw.sourceAccountNumber },
    { label: "Amount", value: withdraw.amount },
    { label: "Currency", value: withdraw.currency },
    { label: "Purpose of Transaction", value: withdraw.purposeOfTransaction },
    { label: "Password", value: withdraw.password },
  ];

  return (
    <Card className={classes.card}>
      {withdrawFields.map((field, index) => (
        <CardContent key={index}>
          <Typography variant="body2" color="textSecondary" component="p">
            {field.label}: {field.value}
          </Typography>
        </CardContent>
      ))}

      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch()}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Withdraw;
