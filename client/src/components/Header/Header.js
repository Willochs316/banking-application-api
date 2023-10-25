import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../reducers/authSlice";
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Banking Application Api
        </Typography>

        <Toolbar className={classes.toolbar}>
          {user && user.user ? (
            <div className={classes.profile}>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Avatar
                  className={classes.purple}
                  alt={user.user.username}
                  src={user.user.username}
                >
                  {user.user.fullname
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
                </Avatar>
              </Link>

              <Typography className={classes.fullName} variant="h6">
                {user.user.fullname.toLowerCase()}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              color="primary"
              to="/auth"
              variant="contained"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;

// import React from "react";
// import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout, reset } from "../../reducers/authSlice";
// import useStyles from "./styles";

// const Header = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);

//   const onLogout = () => {
//     dispatch(logout());
//     dispatch(reset());
//     navigate("/");
//   };

//   return (
//     <AppBar className={classes.appBar} position="static" color="inherit">
//       <div className={classes.brandContainer}>
//         <Typography
//           component={Link}
//           to="/"
//           className={classes.heading}
//           variant="h2"
//           align="center"
//         >
//           Banking Application Api
//         </Typography>

//         <Toolbar className={classes.toolbar}>
//           {user ? (
//             <div className={classes.profile}>
//               <Link to="/profile" style={{ textDecoration: "none" }}>
//                 <Avatar
//                   className={classes.purple}
//                   alt={user.user.username}
//                   src={user.user.username}
//                 >
//                   {user.user.fullname
//                     .split(" ")
//                     .map((name) => name[0].toUpperCase())
//                     .join("")}
//                 </Avatar>
//               </Link>

//               <Typography className={classes.fullName} variant="h6">
//                 {user.user.fullname.toLowerCase()}
//               </Typography>
//               <Button
//                 variant="contained"
//                 className={classes.logout}
//                 onClick={onLogout}
//               >
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <Button
//               component={Link}
//               color="primary"
//               to="/auth"
//               variant="contained"
//             >
//               Sign in
//             </Button>
//           )}
//         </Toolbar>
//       </div>
//     </AppBar>
//   );
// };

// export default Header;
