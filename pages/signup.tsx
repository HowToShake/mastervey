import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Container, TextField } from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation((signup) => {
    return axios.get("helloWorld", signup);
  });

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (e) {
      console.log("e === ", e);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      maxWidth="md"
    >
      <form
        id="signup"
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", height: 280 }}
      >
        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password", { required: true })}
          variant="outlined"
          sx={{ mt: 2 }}
        />
        {errors.lastName && <p>Password is required.</p>}
      </form>
      <Button type="submit" form="signup" sx={{ textAlign: "center" }}>
        Submit
      </Button>
    </Container>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
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

export default Signup;
