import Box from "@mui/material/Box";
import { ReactElement } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return <Box>Hello World</Box>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
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

export default Dashboard;
