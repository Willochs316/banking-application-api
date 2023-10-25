import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";

const User = ({ user }) => {
  const classes = useStyles();

  // If the user is not logged in, don't render the component
  if (!user) {
    return null;
  }

  const userProfile = [
    {
      title: "Full Name",
      text: user.user.fullname,
    },
    {
      title: "Account Number",
      text: user.user.phoneNumber,
    },
    {
      title: "Account Balance",
      text: user.user.accountBalance,
    },
  ];

  return (
    <Card className={classes.card}>
      <div className={classes.overlay2}>
        <Button color="default" size="small" onClick={() => {}}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>

      {userProfile.map((field, index) => (
        <CardContent key={index}>
          <Typography variant="body1" color="textSecondary" component="p">
            <span>{field.title}:</span>
            <span className={classes.text}>{field.text}</span>
          </Typography>
        </CardContent>
      ))}
    </Card>
  );
};

export default User;
