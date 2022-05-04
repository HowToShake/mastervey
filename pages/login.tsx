import { ReactElement, useEffect } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";

const Login = () => {
  const { push } = useRouter();
  const { user, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    if (user) push("/dashboard");
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const loginRes = await login(data.email, data.password);

      if (loginRes) {
        return push("/dashboard");
      }
    } catch (e) {
      console.log("e === ", e);
      setError("submit", { ...e, message: e?.message });
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
      <Typography variant="h2" textAlign="center" mb={2}>
        Login
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
        {errors?.lastName && <p>Password is required.</p>}
      </form>

      <Button type="submit" form="signup" sx={{ textAlign: "center" }}>
        Submit
      </Button>

      <Typography color="error" textAlign="center" mt={2}>
        {errors?.submit && <p>{errors?.submit?.message}</p>}
      </Typography>
    </Container>
  );
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
