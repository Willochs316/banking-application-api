import { Grow } from "@material-ui/core";
import Auth from "../components/Auth/Auth";

const Pages = () => {
  return (
    <Grow in>
      <Auth />

      {/* <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes> */}
    </Grow>
  );
};

export default Pages;
