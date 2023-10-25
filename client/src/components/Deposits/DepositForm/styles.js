import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  formControl: {
    width: "95%",
  },
  noArrows: {
    '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
      {
        "-webkit-appearance": "none",
        margin: 0,
      },
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
