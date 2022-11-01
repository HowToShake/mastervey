import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Navbar from "../components/Navbar";
import Typography from "@mui/material/Typography";

const Home: NextPageWithLayout = (props) => {
  return (
    <main
      style={{
        flexGrow: 1,
        backgroundImage: "linear-gradient(to right, #076585, #fff)",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" mt={6}>
        <b>Your surveys at your fingertips!</b>
      </Typography>
      <Typography variant="h5" mt={5}>
        Create, edit and manage the surveys you have created! Compared to
        popular solutions like google forms, we offer
      </Typography>
      <ul style={{ fontSize: 18 }}>
        <li>the possibility to host the system yourself,</li>
        <li>ability to collect anonymous surveys,</li>
        <li>secure link sharing,</li>
      </ul>
      <Typography variant="h5">and much more!</Typography>
      <Typography mt={5} variant="h6">
        Check it out for yourself by creating a FREE account by clicking on this
        link:
      </Typography>
      <Typography
        component="a"
        color="inherit"
        sx={{ mr: 3 }}
        href="/signup"
        type="link"
      >
        Signup
      </Typography>
    </main>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // const response = await fetch(`https://gorest.co.in/public-api/products`);
    // console.log(response)
    // const result = await response.json();
    return { props: { productData: [] } };
  } catch (e) {
    console.log("e ===", e);
  }
}

export default Home;
