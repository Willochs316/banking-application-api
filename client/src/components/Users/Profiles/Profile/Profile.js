import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";

const Profile = ({ user, setCurrentId }) => {
  const classes = useStyles();

  if (!user) {
    return null;
  }

  const userFields = [
    { label: "Fullname", value: user.user.fullname },
    { label: "Username", value: user.user.username },
    {
      label: "Email",
      value: user.user.email,
    },
    { label: "Phone Number", value: user.user.phoneNumber },
    { label: "Account Balance", value: user.user.accountBalance },
    { label: "Password", value: user.user.password },
    { label: "Address", value: user.user.address },
    { label: "city", value: user.user.city },
    { label: "state", value: user.user.state },
    { label: "postalCode", value: user.user.postalCode },
  ];

  return (
    <Card className={classes.card}>
      <div className={classes.overlay2}>
        <Button
          color="default"
          size="small"
          onClick={() => {
            setCurrentId(user.user._id);
          }}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>

      {userFields.map((field, index) => (
        <CardContent key={index}>
          <Typography variant="body2" color="textSecondary" component="p">
            {field.label}: {field.value}
          </Typography>
        </CardContent>
      ))}
    </Card>
  );
};

export default Profile;
