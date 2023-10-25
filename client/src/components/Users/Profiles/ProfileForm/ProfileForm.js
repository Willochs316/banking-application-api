import React, { useEffect, useState } from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { register, update } from "../../../../reducers/authSlice";
import Input from "./Input";
import useStyles from "./styles";

const ProfileForm = ({ user, currentId, setCurrentId }) => {
  const [profileData, setProfileData] = useState({
    fullname: "",
    username: "",
    email: "",
    phoneNumber: null,
    accountBalance: null,
    password: "",
    address: "",
    city: "",
    state: "",
    postalCode: null,
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const authUser = user.user && user.user._id === currentId ? user.user : null;

  console.log(authUser, "form user");

  useEffect(() => {
    if (authUser) setProfileData(authUser);
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(update(currentId, profileData));
    } else {
      dispatch(register(profileData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setProfileData({
      fullname: "",
      username: "",
      email: "",
      phoneNumber: null,
      accountBalance: null,
      password: "",
      address: "",
      city: "",
      state: "",
      postalCode: null,
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
        <Typography variant="h6">Edit Profile</Typography>

        <Input profileData={profileData} setProfileData={setProfileData} />

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

export default ProfileForm;
