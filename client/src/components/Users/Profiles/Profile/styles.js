import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  border: {
    border: "solid",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay2: {
    position: "absolute",
    top: "4px",
    right: "4px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  title: {
    padding: "0 16px",
  },
});
