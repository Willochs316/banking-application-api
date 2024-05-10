import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, CircularProgress } from "@material-ui/core";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Input from "./Input";
import useStyles from "./styles";

const ProfileForm = ({ user, isLoading, currentId, setCurrentId }) => {
  const [formData, setFormData] = useState({ ...user });

  const classes = useStyles();

  useEffect(() => {
    // Populate the form data with the user's current data when the component is first rendered
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

// useEffect(() => {
//   if (authUser) setFormData(authUser);
// }, [authUser]);

//  useEffect(() => {
//    if (user) {
//      setFormData(user);
//    }
//  }, [user]);

//  const handleSubmit = (e) => {
//    e.preventDefault();

//    if (currentId) {
//      dispatch(update(currentId, formData));
//    } else {
//      dispatch(register(formData));
//    }
//    clear();
//  };

//  const authUser = user && user.user._id === currentId ? user : null;

//  useEffect(() => {
//    if (user && currentId === user.user._id) {
//      setFormData({
//        fullname: user.user.fullname || "",
//        username: user.user.username || "",
//        email: user.user.email || "",
//        phoneNumber: user.user.phoneNumber || null,
//        accountBalance: user.user.accountBalance || null,
//        password: user.user.password || "",
//        address: user.user.address || "",
//        city: user.user.city || "",
//        state: user.user.state || "",
//        postalCode: user.user.postalCode || null,
//      });
//    }
//  }, [currentId, user]);

//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    if (currentId === user.user._id) {
//      try {
//        const response = await dispatch(update(currentId));
//        console.log("Update Response in handleSubmit:", response); // Log the response from the update action
//        if (response) {
//          // Update user data in local storage with the response
//          localStorage.setItem("user", JSON.stringify(response));
//        }
//      } catch (error) {
//        // Handle error conditions here
//        console.error("Failed to update user:", error);
//      }
//    } else {
//      const registeredUser = await dispatch(register(formData));
//      if (registeredUser) {
//        // Update user data in local storage
//        localStorage.setItem("user", JSON.stringify(registeredUser));
//      }
//    }
//    clear();
//  };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const userData = {
//     fullname: formData.fullname,
//     username: formData.username,
//     email: formData.email,
//     password: formData.password,
//     phoneNumber: formData.phoneNumber,
//     address: formData.address,
//     city: formData.city,
//     state: formData.state,
//     postalCode: formData.postalCode,
//   };

//   if (currentId === user.user._id) {
//     // Update user data in the database
//     const updatedUser = await dispatch(update(currentId, userData));
//     if (updatedUser) {
//       // Update user data in local storage
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     }
//   } else {
//     const registeredUser = await dispatch(register(userData));
//     if (registeredUser) {
//       // Update user data in local storage
//       localStorage.setItem("user", JSON.stringify(registeredUser));
//     }
//   }
//   clear();
// };

// const handleSubmit = (e) => {
//   e.preventDefault();

//   const userData = {
//     fullname: formData.fullname,
//     username: formData.username,
//     email: formData.email,
//     password: formData.password,
//     phoneNumber: formData.phoneNumber,
//     address: formData.address,
//     city: formData.city,
//     state: formData.state,
//     postalCode: formData.postalCode,
//   };

//   if (currentId === user.user._id) {
//     dispatch(update(currentId, userData));
//   } else {
//     dispatch(register(userData));
//   }
//   clear();
// };
