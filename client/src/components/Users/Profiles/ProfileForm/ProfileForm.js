import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import Input from "./Input";
import useStyles from "./styles";

const ProfileForm = ({ user, isLoading, currentId, setCurrentId }) => {
  const [formData, setFormData] = useState({ ...user });

  const classes = useStyles();

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      toast.error("Invalid data provided for fields");
    }
  };

  const clear = () => {
    setCurrentId(null);
    setFormData({ ...user });
  };

  if (isLoading && user) {
    return <CircularProgress className="spinner" />;
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Edit Profile</Typography>

        <Input formData={formData} setFormData={setFormData} />

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
