import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
    appBar: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  "@global": {
    "::-webkit-scrollbar": {
      width: "0 !important",
      display: "none !important",
    },
  },
}));
