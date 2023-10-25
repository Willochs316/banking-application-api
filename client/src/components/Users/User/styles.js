import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "5px",
    height: "100%",
    position: "relative",
  },
  overlay2: {
    position: "absolute",
    top: "4px",
    right: "4px",
    color: "white",
  },

  text: {
    marginLeft: "12px",
  },
});
