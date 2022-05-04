import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Container, TextField } from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Typography from "@mui/material/Typography";

const Signup = () => {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync } = useMutation((signup) => {
    return axios.post("signup", signup);
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);

      const loginRes = await login(data.email, data.password);

      if (loginRes) {
        await router.push("/dashboard");
      }
    } catch (e) {
      console.log("e === ", e);
    }
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        maxWidth="md"
      >
        <Typography variant="h2" textAlign="center" mb={2}>
          Signup
        </Typography>

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
    </>
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
