import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Grow } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
// import NavBar from "./components/Header/NavBar";
import Auth from "./components/Auth/Auth";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <>
      <Router>
        <Container maxWidth="lg">
          <Header />

          <Grow in>
            {/* {user && <NavBar />} */}
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Grow>
        </Container>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
