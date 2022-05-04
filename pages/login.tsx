import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";

const Login = () => {
  return <h1>Login</h1>;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
        maxWidth="100vw"
      >
        {page}
      </Box>
    </>
  );
};
export default Login;
