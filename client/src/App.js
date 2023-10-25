import { Container } from "@material-ui/core";
import Header from "./components/Header/Header";
import NavBar from "./components/Header/NavBar";
import Pages from "./pages/pages";
import { useSelector } from "react-redux";
// import useStyles from "./styles";

const App = () => {
  // const classes = useStyles();

  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg">
      <Header />
      {user && <NavBar />}
      <Pages />
    </Container>
  );
};

export default App;
